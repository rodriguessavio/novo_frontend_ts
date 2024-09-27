import './navbar.css';
import { AiOutlineSearch } from "react-icons/ai";
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Context } from '../../context/UserContext';
import Dropbutton from './Dropbutton';
import ModalCep from './ModalCep';
import Profile from './Profile';
import logo from '../../assets/vereda.svg';
import cart from '../../assets/carticon.svg';
import notify from '../../utils/notificacao';

function NavBar() {
  const { authenticated } = useContext(Context);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      document.getElementById('search-input').focus();
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/produty_company/list');

      if (!response.ok) {
        throw new Error('Erro na requisição');
      }

      const data = await response.json();
      const allProducts = data.body; 
      const filteredProducts = allProducts.filter(product =>
        product.nome.toLowerCase().includes(searchQuery.toLowerCase())
      );

      navigate('/pesquisa', { state: { results: filteredProducts, searchQuery } });
    } catch (error) {
      console.error("Erro ao buscar dados: ", error);
    }
  };
  
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleCarrinhoClick = () => {
    
    if (!authenticated) {
      notify('Para acessar o carrinho você precisa está logado!', "success");
      navigate('/login');
    } else {
      
      navigate('/carrinho');
    }
  };

  const handleVenderClick = () => {
    if (!authenticated) {
      navigate('/login');
      notify('Para vender você precisa está logado!', "success");
    } else {
      navigate('/cadastro');
    }
  }

  return (
    <div className='principal'>
      <Link to="/">
        <div className='logo'>
          <img src={logo} className='logo_vereda' alt="" />
          <div className='cep'>
            <ModalCep />
          </div>
        </div>
      </Link>

      <div className='p_pesq'>
        <div className='pesquisa'>
          <input
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            placeholder='Pesquisar produtos, marcas e muito mais....'
            id='search-input'
            onKeyDown={handleKeyDown}
            className='input_pesquisa'
          />
          <button className='bnt_pes' onClick={handleSearch}>
            <AiOutlineSearch />
          </button>
        </div>

        <div className='titles'>
          <Dropbutton />
          {/* <Link to="/cadastro">Vender</Link> */}
          <button onClick={handleVenderClick} className='nav-link'>Vender</button>
          <Link to="/">Cupons</Link>
          <Link to="/">Favoritos</Link>
        </div>
      </div>

      <div className='adicionais'>
        <div className='titles-2'>
          {authenticated ? (
            <Profile />             
          ) : (
            <>
              <Link to="/register">Crie a sua conta</Link>
              <Link to="/login">Entre</Link>
            </>
          )}
          <Link to='/compras'>Compras</Link>
          <button onClick={handleCarrinhoClick} className='cart-button'>
            <img src={cart} alt="" className='icon-cart'/>
          </button>
        </div>
        
      </div>
      
    </div>
  );
}

export default NavBar;
