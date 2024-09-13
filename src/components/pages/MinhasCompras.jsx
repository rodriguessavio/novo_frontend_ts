import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../context/UserContext';
import styles from './MinhasCompras.module.css';

const MinhasCompras = () => {
  const { user } = useContext(Context);
  const [pedidos, setPedidos] = useState([]);
  const [itemsPedidos, setItemsPedidos] = useState({});
  const [produtos, setProdutos] = useState({});
  const [empresas, setEmpresas] = useState({});
  const [loading, setLoading] = useState(true);
  const UrlImagem = import.meta.env.VITE_URL_API;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompras = async () => {
      try {

        const responsePedidos = await axios.get('http://localhost:3000/order/list');
        const pedidosData = responsePedidos.data.body.filter(pedido => pedido.id_pessoa === user.id);
        setPedidos(pedidosData);

        const pedidosMap = {};
        const idsProdutos = new Set();

        for (const pedido of pedidosData) {
          const responseItems = await axios.get(`http://localhost:3000/order_item/list?orderId=${pedido.id}`);
          const itensFiltrados = responseItems.data.body.filter(item => item.id_pedido === pedido.id);
          pedidosMap[pedido.id] = itensFiltrados;
          itensFiltrados.forEach((item) => idsProdutos.add(item.id_produto_empresa));
        }

        setItemsPedidos(pedidosMap);

        const uniqueIdsProdutos = [...idsProdutos];
        const responsesProdutos = await Promise.all(
          uniqueIdsProdutos.map((id) =>
            axios.get(`http://localhost:3000/produty_company/list/${id}`)
          )
        );

        const produtosData = {};
        const idsUsuarios = new Set();
        responsesProdutos.forEach((response) => {
          const produto = response.data.body;
          produtosData[produto.id] = produto;
          idsUsuarios.add(produto.id_usuario);
        });
        setProdutos(produtosData);

        const responseEmpresas = await Promise.all(
          [...idsUsuarios].map((id) => axios.get(`http://localhost:3000/user/list/${id}`))
        );

        const empresasData = responseEmpresas.reduce((acc, response) => {
          acc[response.data.body.id] = response.data.body.nome;
          return acc;
        }, {});

        setEmpresas(empresasData);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        setLoading(false);
      }
    };

    if (user) {
      fetchCompras();
    }
  }, [user]);

  const handleVerCompra = (produtoEmpresaId) => {
    navigate(`/produto/${produtoEmpresaId}`);
  };

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (pedidos.length === 0) {
    return <p>Você ainda não fez nenhuma compra.</p>;
  }

  return (
    <div className={styles.comprasContainer}>
      <h1>Minhas Compras</h1>
      {pedidos.map((pedido) => (
        <div key={pedido.id} className={styles.pedido}>
          <div className={styles.pedidoHeader}>
            <div className={`${styles.status} ${pedido.status === 'pendente' ? styles.pendente : pedido.status === 'em andamento' ? styles.emAndamento : styles.confirmado}`}>
              <span className={styles.statusCircle}></span>
              <p>{pedido.status}</p>
            </div>
            <p className={styles.dataCompra}>Data: {formatDate(pedido.createdAt)}</p>
            <p>Valor Total: R$ {parseFloat(pedido.valor_total).toFixed(2)}</p>
          </div>

          <h5>Itens do Pedido</h5>
          <ul>
            {itemsPedidos[pedido.id] && itemsPedidos[pedido.id].map((item) => (
              <li key={item.id} className={styles.itemContainer}>
                <div className={styles.itemDetails}>
                  <p>Produto: {produtos[item.id_produto_empresa]?.nome || 'Nome não disponível'}</p>
                  <p>Empresa: {empresas[produtos[item.id_produto_empresa]?.id_usuario] || 'Empresa não disponível'}</p>
                  <img
                    src={`${UrlImagem}images/produto_empresa/${produtos[item.id_produto_empresa]?.imagem[0]?.split('\\').pop() || 'default.png'}`}
                    alt={produtos[item.id_produto_empresa]?.nome || 'Imagem não disponível'}
                    className={styles.productImage}
                  />
                  <p>Quantidade: {item.quantidade}</p>
                  <p>Preço: R$ {parseFloat(item.preco).toFixed(2)}</p>
                </div>
                <button
                  className={styles.verCompraButton}
                  onClick={() => handleVerCompra(item.id_produto_empresa)}>
                  Ver item
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default MinhasCompras;
