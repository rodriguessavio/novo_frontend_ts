import React from 'react';
import './categoria.css';
import estrutura from '../../assets/categ/est.svg';
import revestimento from '../../assets/categ/rev.svg';
import Materiaisdeacabamento from '../../assets/categ/aca.svg';
import Materiaisdeisolamento from '../../assets/categ/iso.svg';
import Materiaisdecobertura from '../../assets/categ/cob.svg';
import Materiaiseletricos from '../../assets/categ/ele.svg';
import Materiaisencanamento from '../../assets/categ/eca.svg';
import Materiaispassaigismo from '../../assets/categ/pas.svg';
import cimento from '../../assets/categ/cimento.svg';
import brita from '../../assets/categ/brita.svg';
import MateriaisdeSustentabilidade from '../../assets/categ/sus.svg';



function Categoria() {
  return (
    <div className='conteudo'>
            
        <div className="categorias">
            <div className="title">Categorias</div>    
            <div className='cont'> 
                <div className="col-01">
                    <div className="cat">
                        <div className='esp-img'>
                                <img src={estrutura} alt=""/>  
                        </div>
                        <div className='esp-txt'>
                            <a href="http://localhost:5173/categorias/3"><p>Tijolos</p></a>
                        </div>
                    </div>

                    <div className="cat">
                        <div className='esp-img'>
                            <img src={revestimento} alt="" />
                        </div>
                        <div className='esp-txt'>
                            <a href="http://localhost:5173/categorias/11"><p>Tintas e Acessórios</p></a>
                        </div>
                    </div>

                    <div className="cat">
                        <div className='esp-img'>
                            <img src={Materiaisdeacabamento} alt="" />
                        </div>
                        <div className='esp-txt'>
                            <a href="http://localhost:5173/categorias/9"><p>Pisos e Revestimento</p></a>
                        </div>

                    </div>
                </div>
                
                <div className="col-02">

                    <div className="cat">
                        <div className='esp-img'>
                            <img src={Materiaisdecobertura} alt="" />   
                        </div>
                        <div className='esp-txt'>
                            <a href="http://localhost:5173/categorias/4"><p>Telhas</p></a>
                        </div>
                    </div>

                    <div className="cat">
                        <div className='esp-img'>
                            <img src={Materiaiseletricos} alt="" />
                        </div>
                        <div className='esp-txt'>
                            <a href="http://localhost:5173/categorias/7"><p>Material Elétrico</p></a>
                        </div>
                    </div>

                    <div className="cat">
                        <div className='esp-img'>
                            <img src={cimento} alt="" className='img-cimento'/>   
                        </div>
                        <div className='esp-txt'>
                            <a href="http://localhost:5173/categorias/1"><p>Cimento</p></a>
                        </div>
                    </div>
                </div>
                
                <div className="col-03">
                    <div className="cat">
                        <div className='esp-img'>
                            <img src={brita} alt="" className='img-cimento'/>
                        </div>
                        <div className='esp-txt'>
                            <a href="http://localhost:5173/categorias/2"><p>Areia e Brita</p></a>
                        </div>
                    </div>

                    <div className="cat">
                        <div className='esp-img'>
                            <img src={Materiaispassaigismo} alt="" />
                        </div>
                        <div className='esp-txt'>
                            <a href="http://localhost:5173/categorias/12"><p>Ferramentas</p></a>
                        </div>
                    </div>

                </div>

            </div> 
        </div>
    </div>
  )
}

export default Categoria