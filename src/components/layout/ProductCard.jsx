import React from 'react';
import styles from './productcard.module.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  const UrlImagem = import.meta.env.VITE_URL_API;

  // Função para renderizar estrelas de avaliação
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

  // Gerando o caminho da imagem
  const imageName = product.imagem[0]?.split('\\').pop().split('/').pop();
  const imageUrl = `${UrlImagem}images/produto_empresa/${imageName}`;
  console.log(imageUrl); // Log do caminho da imagem para depuração

  return (
    <div className={styles.productCard}>
      <img
        src={imageUrl}
        alt={product.nome}
        className={styles.productImage}
      />
      <div className={styles.productDetails}>
        <Link to={`/produto/${product.id}`}>
          <h3 className={styles.productName}>{product.nome}</h3>
        </Link>
        <p className={styles.productDescription}>{product.descricao}</p>
        <div className={styles.pr_str}>
          <p className={styles.productPrice}>R$ {product.preco}</p>
          <div className={styles.productRating}>
            {renderStars(product.rating)}
          </div>
        </div>
        <p className={styles.min}><span className={styles.gratis}>Frete grátis</span> por ser sua primeira compra</p>
      </div>
    </div>
  );
}

export default ProductCard;
