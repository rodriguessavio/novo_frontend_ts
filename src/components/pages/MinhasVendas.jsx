import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Context } from '../../context/UserContext';
import { Link } from 'react-router-dom';
import ponto_verde from '../../assets/ponto_verde.svg';
import ponto_amarelo from '../../assets/ponto_amarelo.svg';
import styles from './minhasVendas.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'; 
import VendasPorMes from './VendasPorMes'



function MinhasVendas() {
  const { user } = useContext(Context);
  const [produtos, setProdutos] = useState([]);
  const [itensPedido, setItensPedido] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [anunciosCount, setAnunciosCount] = useState(0);
  const [pedidosAndamentoCount, setPedidosAndamentoCount] = useState(0);
  const [valorVendasFinalizadas, setValorVendasFinalizadas] = useState(0);

  
  useEffect(() => {
    console.log('usuario', user);
    const fetchProdutos = async () => {
      try {
        
        const responseProdutos = await axios.get('http://localhost:3000/produty_company/list');
        const produtosData = responseProdutos.data.body;
        
  
        const produtosUsuario = produtosData.filter(produto => produto.id_usuario === user.id);
        console.log(produtosUsuario)
        setProdutos(produtosUsuario);
        setAnunciosCount(produtosUsuario.length); 
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    fetchProdutos();
  }, [user]);

  
  useEffect(() => {
    const fetchItensPedidos = async () => {
      try {
        const responseItensPedido = await axios.get('http://localhost:3000/order_item/list');
        const itens = responseItensPedido.data.body;

        const meusItens = itens.filter(item =>
          produtos.some(produto => produto.id === item.id_produto_empresa)
        );
        setItensPedido(meusItens);

        const pedidosIds = [...new Set(meusItens.map(item => item.id_pedido))];
        const pedidosPromises = pedidosIds.map(id_pedido =>
          axios.get(`http://localhost:3000/order/list/${id_pedido}`)
        );
        const pedidosResponse = await Promise.all(pedidosPromises);
        const pedidosFiltrados = pedidosResponse.map(res => res.data.body).filter(
          pedido => pedido.status === 'em andamento' || pedido.status === 'finalizado'
        );

       
        setPedidos(pedidosFiltrados);
        setPedidosAndamentoCount(pedidosFiltrados.filter(pedido => pedido.status === 'em andamento').length);

       
        const valorTotalFinalizadas = pedidosFiltrados
          .filter(pedido => pedido.status === 'finalizado')
          .reduce((total, pedido) => {
            const valorPedido = meusItens
              .filter(item => item.id_pedido === pedido.id)
              .reduce((sum, item) => sum + item.preco * item.quantidade, 0);
            return total + valorPedido;
          }, 0);

        setValorVendasFinalizadas(valorTotalFinalizadas);
      } catch (error) {
        console.error('Erro ao buscar itens de pedidos ou pedidos:', error);
      }
    };

    if (produtos.length > 0) {
      fetchItensPedidos();
    }
  }, [produtos]);

  
  const formatarData = (data) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(data).toLocaleDateString('pt-BR', options);
  };

  return (
    <div className={styles.principal}>
      <div className={styles.dados}>
        <p className={styles.titulo}>Dados Minhas Vendas</p>
        <div className={styles.bl_dados}>
          <div className={styles.bl_comgrafico}>
              <div className={styles.bl_dados_conteudo}>
                <p className={styles.sub_titulo}>Vendas concluídas</p>
                <p className={styles.valor}>R${valorVendasFinalizadas.toFixed(2)}</p>
              </div>
              <div className={styles.bl_dados_conteudo}>
                <p className={styles.sub_titulo}>Anúncios Realizados</p>
                <p className={styles.valor}>{anunciosCount}</p>
              </div>
              <div className={styles.bl_dados_conteudo}>
                <p className={styles.sub_titulo}>Vendas em Andamento</p>
                <p className={styles.valor}>{pedidosAndamentoCount}</p>
              </div>
          </div>
          <div className={styles.grafico}>
            {user.id && (
              <VendasPorMes userId={user.id} apiUrl="http://localhost:3000" />
            )}
          </div>
        </div>
    </div>
      <div className={styles.status}>
        <p className={styles.titulo}>Descrição Status</p>
        <div className={styles.bl_status}>
          <div className={styles.finalizadas}>
            <img src={ponto_verde} alt="Status Finalizado" />
            <span className={styles.sub_titulo_status}>Finalizadas</span>
          </div>
          <div className={styles.em_andamento}>
            <img src={ponto_amarelo} alt="Status Em Andamento" />
            <span className={styles.sub_titulo_status}>Em andamento</span>
          </div>
        </div>
      </div>
      <div className={styles.pedidos}>
        <p className={styles.titulo}>Minhas Vendas</p>
        <div className={styles.corpo_pedidos}>
          {pedidos.length > 0 ? (
            pedidos.map(pedido => (
              <div key={pedido.id} className={styles.pedido}>
                <img src={pedido.status === 'finalizado' ? ponto_verde : ponto_amarelo} alt={pedido.status} />
                <Link to={`/pedido/${pedido.id}`} className={styles.sub_titulo_pedido}>
                  Pedido {formatarData(pedido.createdAt)} - {pedido.status === 'finalizado' ? 'Finalizado' : 'Em Andamento'}
                </Link>
                <FontAwesomeIcon icon={faChevronRight} className={styles.seta}/>
              </div>
            ))
          ) : (
            <p>Não há pedidos em andamento ou finalizados.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MinhasVendas;
