import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Context } from '../../context/UserContext';
import styles from './detalhesPedido.module.css';

function DetalhesPedido() {
  const { user } = useContext(Context);
  const { id_pedido } = useParams();
  const [produtos, setProdutos] = useState([]);
  const [itensPedido, setItensPedido] = useState([]);
  const UrlImagem = import.meta.env.VITE_URL_API;

  useEffect(() => {
    const fetchProdutosPedido = async () => {
      try {
        // Buscar itens do pedido
        const responseItensPedido = await axios.get('http://localhost:3000/order_item/list');
        const itens = responseItensPedido.data.body;
        console.log(itens);
        console.log(id_pedido);

        // Filtrar itens do pedido específico
        const itensDoPedido = itens.filter(item => item.id_pedido == id_pedido);
        console.log(itensDoPedido)

        console.log(itensDoPedido)
        // Extrair IDs dos produtos
        const idsProdutos = [...new Set(itensDoPedido.map(item => item.id_produto_empresa))];

        // Buscar produtos da empresa
        const responseProdutos = await axios.get('http://localhost:3000/produty_company/list', {
          params: { id_usuario: user.id_usuario }
        });
        const produtosUsuario = responseProdutos.data.body;

        // Filtrar produtos que estão no pedido
        const produtosNoPedido = produtosUsuario.filter(produto =>
          idsProdutos.includes(produto.id)
        );

        // Atualizar estado com produtos e itens
        setProdutos(produtosNoPedido);
        setItensPedido(itensDoPedido.map(item => ({
          ...item,
          produto: produtosNoPedido.find(p => p.id === item.id_produto_empresa) || {},
          data: item.createdAt // Adiciona a data ao item
        })));
      } catch (error) {
        console.error('Erro ao buscar itens do pedido:', error);
      }
    };

    fetchProdutosPedido();
  }, [id_pedido, user]);

  const formatarURLImagem = (caminho) => {
    // Remover a parte do caminho que não é necessária
    const partes = caminho.split('\\').pop().split('/');
    return `${UrlImagem}images/produto_empresa/${partes[partes.length - 1]}`;
  };

  return (
    <div className={styles.container}>
      <p className={styles.titulo}>Meus produtos no Pedido {id_pedido}</p>
      {itensPedido.length > 0 ? (
        itensPedido.map(item => (
          <div key={item.id_produto_empresa} className={styles.produto}>
            <div className={styles.imagem_produto}>
              <img
                src={formatarURLImagem(item.produto.imagem[0])}
                alt={item.produto.nome || 'Imagem do produto'}
                className={styles.img_doproduto}
              />
            </div>
            <div className={styles.desc_produto}>
              <p className={styles.nome_produto}>{item.produto.nome || 'Nome não disponível'}</p>
              <p className={styles.desc}>{item.produto.descricao || 'Descrição não disponível'}</p>
              <p className={styles.preco}>R${item.produto.preco || 'Preço não disponível'}</p>
              <p className={styles.quantidade}>{item.quantidade} unidades vendidas</p>
            </div>
            <p className={styles.data_venda}>{new Date(item.data).toLocaleDateString() || 'Data não disponível'}</p>
          </div>
        ))
      ) : (
        <p className={styles.noProdutos}>Nenhum produto encontrado neste pedido.</p>
      )}
    </div>
  );
}

export default DetalhesPedido;
