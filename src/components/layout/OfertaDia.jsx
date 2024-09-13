import React, { useEffect, useState } from 'react';
import style from './ofertadia.module.css';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from 'axios';
import { Link } from 'react-router-dom';

function OfertaDia() {
  const [ofertas, setOfertas] = useState([]);
  const UrlImagem = import.meta.env.VITE_URL_API;

  useEffect(() => {
    axios.get('http://localhost:3000/produty_company/list')
      .then(function (response) {
        const ofertasComNomesDeImagem = response.data.body.map(oferta => ({
          ...oferta,
          imageName: extrairNomeDaImagem(oferta.imagem)
        }));
        
        const ofertasLimitadas = ofertasComNomesDeImagem.slice(0, 4);
        setOfertas(ofertasLimitadas); 
        
      })
      .catch(function (error) {
        console.error(error);
      })
      .finally(function () {
        console.log('Requisição de ofertas concluída.');
      });
  }, []);

  const extrairNomeDaImagem = (caminhoCompleto) => {
    const regex = /([^\\\/]+)\.(png|jpg|jpeg|gif)$/i;
    const match = regex.exec(caminhoCompleto);
    return match ? match[0] : 'imagem_nao_encontrada.png';
  };

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1
    }
  };

  return (
    <div className={style.principal}>
      <h2 className={style.title}>Ofertas do Dia</h2>
      <Carousel
        responsive={responsive}
        containerClass="carousel-container"
      >
        {ofertas.map((oferta, index) => (
          <div key={index}>
            <Link to={`/produto/${oferta.id}`}>
              <div className={style.produto}>
                <img
                  src={`${UrlImagem}images/produto_empresa/${oferta.imageName}`}
                  alt={oferta.nome}
                  className={style.imgProduto}
                />
                <p className={style.nomeProduto}>{oferta.nome}</p>
                <p className={style.valorProduto}>R$ {oferta.preco}</p>
              </div>
            </Link>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default OfertaDia;
