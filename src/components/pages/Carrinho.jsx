import React, { useState, useEffect, useContext } from 'react';
import styles from './carrinho.module.css';
import { Context } from '../../context/UserContext';
import axios from 'axios';
import ItemCarrinho from './ItemCarrinho';
import { useNavigate } from 'react-router-dom';
import notify from '../../utils/notificacao';

function Carrinho() {
    const UrlImagem = import.meta.env.VITE_URL_API;
    const { user } = useContext(Context);
    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [quantidade, setQuantidade] = useState({});
    const [total, setTotal] = useState(0);
    const [estoque, setEstoque] = useState({}); // Armazena as quantidades máximas disponíveis
    const navigate = useNavigate();

    const handleContinuarCompra = () => {
        navigate('/endereco', { state: { total, pedidos } });
    };

    useEffect(() => {
        const fetchPedidos = async () => {
            if (user) {
                try {
                    const response = await axios.get(`http://localhost:3000/order/list`);
                    const todosResultados = response.data.body;
                    const pedidosUsuario = todosResultados.filter(pedido => {
                        if (user.id_pessoa) {
                            return pedido.id_pessoa === user.id_pessoa && pedido.status === 'pendente';
                        }
                        if (user.id_empresa) {
                            return pedido.id_empresa === user.id_empresa && pedido.status === 'pendente';
                        }
                        return false;
                    });
                    
                    if (pedidosUsuario.length > 0) {
                        const idPedido = pedidosUsuario[0].id;
                        let itensPedidoUsuario = [];
                        try {
                            const itensPedidoReq = await axios.get(`http://localhost:3000/order_item/list`);
                            const todosItens = itensPedidoReq.data.body;
                            itensPedidoUsuario = todosItens.filter(itemPedido => itemPedido.id_pedido === idPedido);
                        } catch (err) {
                            console.error('Erro ao buscar itens do pedido:', err);
                        }

                        const pedidosComDetalhes = await Promise.all(itensPedidoUsuario.map(async (item) => {
                            const produto = await axios.get(`http://localhost:3000/produty_company/list/${item.id_produto_empresa}`);
                            const nomeProduto = produto.data.body.nome;
                            const quantidadeEstoque = produto.data.body.quantidade; // Quantidade disponível em estoque
                            let caminhoImage = produto.data.body.imagem[0].split('\\').pop().split('/').pop();
                            const caminhoCompleto = `${UrlImagem}images/produto_empresa/${caminhoImage}`;

                            // Armazena a quantidade máxima no estado de estoque
                            setEstoque(prevEstoque => ({
                                ...prevEstoque,
                                [item.id]: quantidadeEstoque
                            }));

                            return { ...item, nomeProduto, imagemProduto: caminhoCompleto };
                        }));

                        setPedidos(pedidosComDetalhes);

                        const initialQuantities = {};
                        pedidosComDetalhes.forEach(item => {
                            initialQuantities[item.id] = item.quantidade;
                        });
                        setQuantidade(initialQuantities);

                        const totalResponse = await axios.get(`http://localhost:3000/order/list/${idPedido}`);
                        const valorTotal = parseFloat(totalResponse.data.body.valor_total) || 0;
                        setTotal(valorTotal);
                    }
                } catch (error) {
                    console.error("Erro ao buscar os pedidos:", error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchPedidos();
    }, [user]);

    const atualizarQuantidadeNoBanco = async (id, novaQuantidade) => {
        try {
            await axios.put(`http://localhost:3000/order_item/update/${id}`, { quantidade: novaQuantidade });
            await atualizarTotalNoBanco();
        } catch (error) {
            console.error('Erro ao atualizar a quantidade:', error);
        }
    };

    const atualizarTotalNoBanco = async () => {
        if (user) {
            try {
                const response = await axios.get(`http://localhost:3000/order/list`);
                const todosResultados = response.data.body;
                const pedidosUsuario = todosResultados.filter(pedido => {
                    if (user.id_pessoa) {
                        return pedido.id_pessoa === user.id_pessoa && pedido.status === 'pendente';
                    }
                    if (user.id_empresa) {
                        return pedido.id_empresa === user.id_empresa && pedido.status === 'pendente';
                    }
                    return false;
                });
                
                if (pedidosUsuario.length > 0) {
                    const idPedido = pedidosUsuario[0].id;
                    let itensPedidoUsuario = [];
                    try {
                        const itensPedidoReq = await axios.get(`http://localhost:3000/order_item/list`);
                        const todosItens = itensPedidoReq.data.body;
                        itensPedidoUsuario = todosItens.filter(itemPedido => itemPedido.id_pedido === idPedido);
                    } catch (err) {
                        console.error('Erro ao buscar itens do pedido:', err);
                    }

                    const valorTotal = itensPedidoUsuario.reduce((acc, item) => acc + (item.sub_total || 0), 0);
                    await axios.put(`http://localhost:3000/order/update/${idPedido}`, { valor_total: valorTotal });
                    setTotal(valorTotal);
                } else {
                    setTotal(0);
                }
            } catch (error) {
                console.error('Erro ao atualizar o total:', error);
            }
        }
    };

    const incrementar = (id) => {
        setQuantidade(prevQuantidades => {
            const novaQuantidade = (prevQuantidades[id] || 1) + 1;

            // Verifica se a nova quantidade ultrapassa o estoque disponível
            if (novaQuantidade > estoque[id]) {
                notify('Quantidade máxima atingida para este produto!', 'error');
                return prevQuantidades; // Não atualiza a quantidade
            }

            atualizarQuantidadeNoBanco(id, novaQuantidade);
            return {
                ...prevQuantidades,
                [id]: novaQuantidade
            };
        });
    };

    const decrementar = (id) => {
        setQuantidade(prevQuantidades => {
            const novaQuantidade = Math.max((prevQuantidades[id] || 1) - 1, 1);
            atualizarQuantidadeNoBanco(id, novaQuantidade);
            return {
                ...prevQuantidades,
                [id]: novaQuantidade
            };
        });
    };

    const removerItem = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/order_item/delete/${id}`);
            setPedidos(prevPedidos => {
                const novosPedidos = prevPedidos.filter(item => item.id !== id);
                atualizarTotalNoBanco();
                return novosPedidos;
            });
        } catch (error) {
            console.error('Erro ao remover o item:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.content}>
            <div className={styles.itens}>
                <div className={styles.itens_content}>
                    <div className={styles.title_conj}>
                        Produtos
                        <hr />
                    </div>
                    {pedidos.map((item) => (
                        <ItemCarrinho
                            key={item.id}
                            item={item}
                            incrementar={incrementar}
                            decrementar={decrementar}
                            quantidade={quantidade}
                            removerItem={() => removerItem(item.id)}
                        />
                    ))}
                </div>
            </div>

            <div className={styles.resumo}>
                <div className={styles.title}>Resumo da Compra</div>
                
                <div className={styles.corpo}>
                    <div className={styles.dados}>
                        <div className={styles.nomes}>
                            <p>Produto{pedidos.length > 0 ? '('+pedidos.length+')' : ''}</p>
                            <p>Total</p>
                        </div>
                        <div className={styles.desc}>
                            <p>R${total.toFixed(2)}</p>
                            <p>R${total.toFixed(2)}</p>
                        </div>
                    </div>
                    <div>
                        <center>
                            <button onClick={handleContinuarCompra} className={styles.btn_continuar}>Continuar a Compra</button>
                        </center>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Carrinho;
