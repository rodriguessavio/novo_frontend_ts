import React, { useState } from 'react';
import styles from './ProductSearch.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Search = ({ onSelectProduct }) => {
  const history = useNavigate();

  const handleProductClick = (product) => {
    onSelectProduct(product);
    history('/steps');
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const UrlImagem = import.meta.env.VITE_URL_API;

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/produty/find', {
        nome: searchTerm
      });
      setProducts(response.data?.body);
      console.log(response.data);
    } catch (error) {
      console.error('Produto não encontrado', error);
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={() => window.history.back()}>
          <span className={styles.backArrow}>&lt;</span> Anterior
        </button>
      </div>
      <h1 className={styles.title}>Para anunciar mais rápido, vamos procurar seu produto no nosso catálogo</h1>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.searchOptions}>
            <h3>É possível procurar seu produto de 2 formas:</h3>
            <ul>
              <li>Insira a marca, modelo e todas as principais características que você souber para refinar a busca.</li>
              <li>Insira o código universal do produto. <a href="#" className={styles.link}>Como posso encontrá-lo?</a></li>
            </ul>
          </div>
          <form onSubmit={handleSubmit} className={styles.searchForm}>
            <div className={styles.searchInput}>
              <input name='nome' type="text" placeholder="Ex.: Bloco de concreto 40cm" value={searchTerm} onChange={handleInputChange} />
            </div>
            <button type="submit" className={styles.searchButton}>Buscar</button>
          </form>
        </div>
      </div>

      <div className={styles.products}>
        {products && products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className={styles.product}>
              <div className={styles.link} onClick={() => handleProductClick(product)}>
                <div className={styles.image}>
                  {product.imagem.slice(0, 6).map((img, index) => (
                    <img
                      key={index}
                      src={`${UrlImagem}images/produto/${img.split('\\').pop().split('/').pop()}`}
                      alt={`${product.nome} ${index + 1}`}
                      onClick={() =>
                        (document.getElementById('mainImage').src = `${UrlImagem}/images/produto/${img.split('\\').pop().split('/').pop()}`)
                      }
                    />
                  ))}
                </div>
                <div className={styles.details}>
                  <h3 className={styles.titleProduct}>{product.nome}</h3>
                  <p className={styles.descriptionProduct}>{product.especificacoes}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Nenhum produto encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default Search;
