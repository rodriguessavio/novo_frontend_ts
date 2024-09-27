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
                            <a href="http://localhost:5173/categorias/3" className='esp-txt'>Tijolos</a>
                        </div>
                    </div>

                    <div className="cat">
                        <div className='esp-img'>
                            <img src={revestimento} alt="" />
                        </div>
                        <div className='esp-txt'>
                            <a href="http://localhost:5173/categorias/11" className='esp-txt'>Tintas e Acessórios</a>
                        </div>
                    </div>

                    <div className="cat">
                        <div className='esp-img'>
                            <img src={Materiaisdeacabamento} alt="" />
                        </div>
                        <div className='esp-txt'>
                            <a href="http://localhost:5173/categorias/9" className='esp-txt'>Pisos e Revestimento</a>
                        </div>

                    </div>
                </div>
                
                <div className="col-02">

                    <div className="cat">
                        <div className='esp-img'>
                            <img src={Materiaisdecobertura} alt="" />   
                        </div>
                        <div className='esp-txt'>
                            <a href="http://localhost:5173/categorias/4" className='esp-txt'>Telhas</a>
                        </div>
                    </div>

                    <div className="cat">
                        <div className='esp-img'>
                            <img src={Materiaiseletricos} alt="" />
                        </div>
                        <div className='esp-txt'>
                            <a href="http://localhost:5173/categorias/7" className='esp-txt'>Material Elétrico</a>
                        </div>
                    </div>

                    <div className="cat">
                        <div className='esp-img'>
                            <img src={cimento} alt="" className='img-cimento'/>   
                        </div>
                        <div className='esp-txt'>
                            <a href="http://localhost:5173/categorias/1" className='esp-txt'>Cimento</a>
                        </div>
                    </div>
                </div>
                
                <div className="col-03">
                    <div className="cat">
                        <div className='esp-img'>
                            <img src={brita} alt="" className='img-cimento'/>
                        </div>
                        <div className='esp-txt'>
                            <a href="http://localhost:5173/categorias/2" className='esp-txt'>Areia e Brita</a>
                        </div>
                    </div>

                    <div className="cat">
                        <div className='esp-img'>
                            <img src={Materiaispassaigismo} alt="" />
                        </div>
                        <div className='esp-txt'>
                            <a href="http://localhost:5173/categorias/12" className='esp-txt'>Ferramentas</a>
                        </div>
                    </div>

                </div>

            </div> 
        </div>
    </div>
  )
}

export default Categoria