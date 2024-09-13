import React from 'react';
import style from './rodape.module.css';
import { Link } from "react-router-dom";

function Rodape() {
  return (
    <div className={style.conteudo}>
        <div className={style.principal}>
        <div className={style.links}>
                <a href="">Trabalhe conosco</a>
                <a href='/termos'>Termos e condições</a>
                
                <a href="">Contatos</a>
            </div>
            <div className={style.infos}>
                <p>Copyright © 2022-2024 vereda.com.br LTDA.</p>
                {/* <p>CNPJ n.º 03.007.331/0001-41 / Av. das Nações Unidas, nº 3.003, Bonfim, Osasco/SP - CEP 06233-903 - empresa do grupo Mercado Livre.</p> */}
            </div>
        </div> 
    </div>
  )
}

export default Rodape