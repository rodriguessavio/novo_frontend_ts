import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import styles from './productdetail.module.css';
import Relacionados from '../layout/Relacionados';
import { Context } from '../../context/UserContext';
import Modal from '../layout/Modal'; 
import notify from '../../utils/notificacao';

function Productdetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantidade, setQuantidade] = useState(1);
  const [pedido, setPedido] = useState(null);
  const [showModal, setShowModal] = useState(false); 
  const [sellerName, setSellerName] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [productName, setProductName] = useState(''); 
  const [productImage, setProductImage] = useState(''); 
  const UrlImagem = import.meta.env.VITE_URL_API;

  const { user } = useContext(Context);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FontAwesomeIcon
        key={index}
        icon={faStar}
        color={index < rating ? '#FFD700' : '#ccc'}
        className={styles.star}
      />
    ));
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3000/produty_company/list/${id}`);
        if (!response.ok) {
          throw new Error('Erro ao buscar o produto');
        }
        const data = await response.json();
        setProduct(data.body);
        const sellerResponse = await fetch(`http://localhost:3000/user/list/${data.body.id_usuario}`);
        if (!sellerResponse.ok) {
          throw new Error('Erro ao buscar o nome do vendedor');
        }
        const sellerData = await sellerResponse.json();
        setSellerName(sellerData.body.nome);
        console.log(sellerName);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [id]);

  const fetchPedidoPendente = async (idUsuario) => {
    try {
      const response = await fetch(`http://localhost:3000/order/list`);
      if (!response.ok) {
        throw new Error('Erro ao buscar pedidos');
      }
      const data = await response.json();
      console.log('data: ', data);
      const pedidosPendentes = data.body.filter(
        (pedido) => pedido.status === 'pendente' && pedido.id_pessoa === idUsuario
      );
      return pedidosPendentes.length > 0 ? pedidosPendentes[0] : null;
    } catch (error) {
      console.error('Erro ao buscar pedido pendente:', error);
      return null;
    }
  };

  const criarPedido = async (idUsuario, total) => {
    try {
      const response = await fetch(`http://localhost:3000/order/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id_pessoa: idUsuario,
          status: "pendente",
          total: total,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Erro ao criar o pedido');
      }
  
      const data = await response.json();
      console.log('Dados retornados ao criar pedido:', data);
  
      // Ajuste aqui conforme os dados retornados pela API
      if (!data || !data.id) {
        throw new Error('ID do pedido não retornado');
      }
  
      // O id retornado deve ser utilizado para o pedido
      const pedidoCriado = {
        id: data.id,
        status: 'pendente',
        total: total, // Você pode ajustar ou usar conforme necessário
      };
      
      setPedido(pedidoCriado);
      return pedidoCriado;
    } catch (error) {
      console.error('Erro ao criar pedido:', error);
      throw error;
    }
  };
  
  
  

  const adicionarItemPedido = async (idPedido, itemPedido) => {
    try {
      if (!idPedido || !itemPedido.id_produto || !itemPedido.quantidade || !itemPedido.preco) {
        throw new Error('Dados incompletos para adicionar item ao pedido.');
      }

      const response = await fetch(`http://localhost:3000/order_item/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id_pedido: idPedido,
          quantidade: itemPedido.quantidade,
          preco: itemPedido.preco,
          id_produto_empresa: itemPedido.id_produto,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Erro ao adicionar item ao pedido:', errorText);
        throw new Error('Erro ao adicionar item ao pedido');
      }

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error('Erro na função adicionarItemPedido:', error);
      throw error;
    }
  };

  const atualizarTotalPedido = async (idPedido, novoTotal) => {
    console.log('novototal: ', novoTotal);
    try {
      const response = await fetch(`http://localhost:3000/order/update/${idPedido}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          valor_total: novoTotal,
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao atualizar o total do pedido');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro na função atualizarTotalPedido:', error);
      throw error;
    }
  };

  const handleAddToPedido = async () => {
    if (!product) return;
  
    if (product.id_usuario === user.id) {
      notify('Não pode-se adicionar seu produto ao carrinho', 'error');
      return;
    }
  
    if (quantidade > product.quantidade) {
      notify('Quantidade selecionada maior do que a disponível no estoque', 'error');
      return;
    }
  
    const itemPedido = {
      id_produto: product.id,
      quantidade,
      preco: product.preco,
    };
  
    const idUsuario = user.id_pessoa;
  
    try {
      let pedidoExistente = await fetchPedidoPendente(idUsuario);
      
      console.log('Pedido existente:', pedidoExistente); // Verifique o pedido existente
  
      // Se não existir pedido pendente, cria um novo pedido
      if (!pedidoExistente) {
        console.log('Criando novo pedido');
        pedidoExistente = await criarPedido(idUsuario, itemPedido.preco * itemPedido.quantidade);
        console.log('Pedido criado:', pedidoExistente); // Verifique o pedido criado
      }
  
      if (pedidoExistente && pedidoExistente.id) {
        console.log('Adicionando item ao pedido:', pedidoExistente.id, itemPedido);
        await adicionarItemPedido(pedidoExistente.id, itemPedido);
  
        const totalAtual = parseFloat(pedidoExistente.valor_total || 0); 
        const novoTotal = totalAtual + parseFloat(itemPedido.preco * itemPedido.quantidade);
        await atualizarTotalPedido(pedidoExistente.id, novoTotal);
  
        setProductName(product.nome);
        setProductImage(`${UrlImagem}images/produto_empresa/${product.imagem[0].split('\\').pop().split('/').pop()}`);
        setModalMessage('Adicionado ao carrinho!');
        setShowModal(true);
      } else {
        throw new Error('ID do pedido não disponível');
      }
    } catch (error) {
      console.error('Erro ao adicionar item ao carrinho:', error);
      setModalMessage('Erro ao adicionar produto ao carrinho');
      setShowModal(true);
    }
  };
  
  
  

  const handleCloseModal = () => {
    setShowModal(false);
  };

  if (!product) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <Modal
        isVisible={showModal}
        onClose={handleCloseModal}
        message={modalMessage}
        productName={productName}
        productImage={productImage}
        quantity={quantidade}
      />
      <div className={styles.container}>
        <div className={styles.gallery}>
          {product.imagem.slice(0, 6).map((img, index) => (
            <img
              key={index}
              src={`${UrlImagem}images/produto_empresa/${img.split('\\').pop().split('/').pop()}`}
              alt={`${product.nome} ${index + 1}`}
              className={styles.thumbnail}
              onClick={() =>
                (document.getElementById('mainImage').src = `${UrlImagem}images/produto_empresa/${img.split('\\').pop().split('/').pop()}`)
              }
            />
          ))}
        </div>
        <div className={styles.imageContainer}>
          <img
            id="mainImage"
            src={`${UrlImagem}images/produto_empresa/${product.imagem[0].split('\\').pop().split('/').pop()}`}
            alt={product.nome}
            className={styles.image}
          />
        </div>

        <div className={styles.compra}>
          <h1 className={styles.title}>{product.nome}</h1>
          <div>
            {product.rating}{renderStars(product.rating)}
          </div>
          {product.quantidade > 0 ? (
            <p>
              <b>Estoque disponível</b>
            </p>
          ) : (
            <p>
              <b>Estoque indisponível</b>
            </p>
          )}
          <span>Quantidade:</span>
          <select
            name="quantity"
            id="quantity"
            value={quantidade}
            onChange={(e) => setQuantidade(parseInt(e.target.value, 10))}
          >
            {[...Array(6).keys()].map(num => (
              <option key={num} value={num + 1}>
                {num + 1} unidade{num > 0 && 's'}
              </option>
            ))}
          </select>
          <p className={styles.subtitulo}>{product.quantidade} disponíveis</p>
          <div className={styles.buttonContainer}>
            <button className={`${styles.button} ${styles.buy}`} onClick={handleAddToPedido}>Comprar</button>
            <button 
              className={`${styles.button} ${styles.addToCart}`}
              onClick={handleAddToPedido}
            >
              Adicionar ao Carrinho
            </button>
          </div>
          <p>Vendido por {sellerName}</p>
          <p className={styles.subtitulo}>
            <FontAwesomeIcon icon={faShieldAlt} />
            <b>Compra Garantida</b>, receba o produto que está esperando ou devolvemos o dinheiro.
          </p>
        </div>
      </div>
      <Relacionados />
    </div>
  );
}

export default Productdetail;
