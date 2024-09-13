import React, { useContext, useState } from 'react';
import styles from './pagamento.module.css';
import pix from '../../assets/pix.svg';
import boleto from '../../assets/boleto.svg';
import cartao from '../../assets/cartao.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Context } from '../../context/UserContext';

function Pagamento() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(Context);
  const [showModal, setShowModal] = useState(false);
  const [metodoPagamento, setMetodoPagamento] = useState(''); 

  const handlePayment = async () => {
    try {
      const response = await axios.get('http://localhost:3000/order/list');
      const pedidos = response.data.body;

      const pedidoPendente = pedidos.find(
        (pedido) => pedido.id_pessoa === user.id_pessoa && pedido.status === 'pendente'
      );

      if (pedidoPendente) {
        const idPedido = pedidoPendente.id;
        const valorTotal = state?.total.toFixed(2);

        // Atualizar o status do pedido para 'em andamento'
        await axios.put(`http://localhost:3000/order/update/${idPedido}`, {
          status: 'em andamento',
        });

        // Criar um novo registro na tabela de pagamentos
        await axios.post('http://localhost:3000/payment/create', {
          metodo: metodoPagamento,
          status: 'finalizado',
          valor: valorTotal,
          id_pedido: idPedido,
        });

        // Atualizar a quantidade dos produtos adquiridos
        for (const pedido of state.pedidos) {
          console.log('pedido: ',pedido);
          const { id_produto_empresa, quantidade } = pedido;

          if (quantidade !== undefined) {
            // Pegar o produto atual para obter a quantidade atual
            const produtoResponse = await axios.get(`http://localhost:3000/produty_company/list/${id_produto_empresa}`);
            const produtoAtual = produtoResponse.data.body;
            console.log('produtoAtual: ', produtoAtual);

            // Subtrair a quantidade adquirida da quantidade disponível
            const novaQuantidade = produtoAtual.quantidade - quantidade;
            console.log('novaQuantidade: ', novaQuantidade);
            console.log(`rota: http://localhost:3000/produty_company/update/${id_produto_empresa}`)
            // Atualizar a quantidade no banco de dados
            await axios.put(`http://localhost:3000/produty_company/update/${id_produto_empresa}`, {
              quantidade: novaQuantidade
            });
          } else {
            console.error('Quantidade adquirida não está definida para o produto:', pedido);
          }
        }

        setShowModal(true);
      } else {
        console.error('Não há pedidos pendentes para este usuário.');
      }
    } catch (error) {
      console.error('Erro ao atualizar o pedido e os produtos:', error);
    }
  };

  const handleMetodoChange = (metodo) => {
    setMetodoPagamento(metodo);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate('/');
  };

  return (
    <div className={styles.principal}>
      <div className={styles.corpo}>
        <p className={styles.title}>Escolha como pagar</p>

        <div className={styles.item_um}>
          <input
            type="radio"
            name="pagamento"
            id="cartao"
            onChange={() => handleMetodoChange('cartao')}
          />
          <img src={cartao} alt="Cartão de Crédito" />
          <p className={styles.nome}>Cartão de Crédito</p>
        </div>

        <div className={styles.item}>
          <div className={styles.conteudo}>
            <input
              type="radio"
              name="pagamento"
              id="pix"
              onChange={() => handleMetodoChange('pix')}
            />
            <img src={pix} alt="Pix" />
            <div className={styles.conj_desc}>
              <p className={styles.nome}>Pix</p>
              <p className={styles.desc}>Aprovação imediata</p>
            </div>
          </div>
        </div>

        <div className={styles.item}>
          <div className={styles.conteudo}>
            <input
              type="radio"
              name="pagamento"
              id="boleto"
              onChange={() => handleMetodoChange('boleto')}
            />
            <img src={boleto} alt="Boleto" />
            <div className={styles.conj_desc}>
              <p className={styles.nome}>Boleto</p>
              <p className={styles.desc}>Aprovação em 1 a 2 dias úteis</p>
            </div>
          </div>
        </div>

        <button className={styles.btn_continuar} onClick={handlePayment}>
          Continuar
        </button>
      </div>

      <div className={styles.resumo}>
        <center>
          <h3 className={styles.titulo_aba}>Resumo da Compra</h3>
        </center>
        <div className={styles.dados}>
          <div className={styles.nomes}>
            <p>Produto({state?.pedidos.length})</p>
            <p>Total</p>
          </div>
          <div className={styles.desc}>
            <p className={styles.valor}>R${state?.total.toFixed(2)}</p>
            <p className={styles.valor}>R${state?.total.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>Compra registrada com sucesso!</h3>
            <button onClick={handleCloseModal}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Pagamento;
