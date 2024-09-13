import React, { useEffect, useState } from 'react';
import style from './relacionados.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Relacionados() {
  const [produto, setProduto] = useState([]);
  const UrlImagem = import.meta.env.VITE_URL_API;

  useEffect(() => {
    axios.get('http://localhost:3000/produty_company/list')
      .then(function (response) {
        const produtosComNomesDeImagem = response.data.body.map(produto => ({
          ...produto,
          imageName: extrairNomeDaImagem(produto.imagem) 
        }));
        
        setProduto(produtosComNomesDeImagem);
        console.log(produtosComNomesDeImagem);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  const extrairNomeDaImagem = (caminhoCompleto) => {
    const regex = /([^\\\/]+)\.(png|jpg|jpeg|gif)$/i;
    const match = regex.exec(caminhoCompleto);
    return match ? match[0] : 'imagem_nao_encontrada.png'; 
  };

  return (
    <div className={style.principal}>
      <h2 className={style.title} align="start">Produtos Recomendados</h2>
      <div className={style.listagem}>
        {produto.slice(3, 6).map((item, index) => (
          <Link to={`/produto/${item.id}`}>
            <div key={index} className={style.produto}>
              <img
                src={`${UrlImagem}images/produto_empresa/${item.imageName}`}
                alt={item.nome}
                className={style.imgProduto}
              />
              <p className={style.nomeProduto}>{item.nome}</p>
              <p className={style.valorProduto}>R$ {item.preco}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Relacionados;
