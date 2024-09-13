import { useState } from 'react';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import NavBar from './components/layout/NavBar';
import Rodape from './components/layout/Rodape';
import Container from './components/layout/Container';
import { UserProvider } from './context/UserContext';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


// Importações dos componentes de página
import Login from './components/pages/Auth/Login';
import Register from './components/pages/Auth/Register';
import Pesquisa from './components/pages/Pesquisa';
import Termos from './components/pages/Termos';
import ValidacaoCode from './components/pages/Auth/ValidacaoCode';
import Productdetail from './components/pages/Productdetail';
import Categorias from './components/pages/Categorias';
import Carrinho from './components/pages/Carrinho';
import Profile from './components/pages/Auth/Profile';
import OpcoesProfile from './components/layout/OpcoesProfile';
import InformacoesProfile from './components/pages/Auth/InformacoesProfile';
import Home from './components/pages/Home';
import ProductSteps from './components/pages/cadProd-Multi-Step/ProductSteps';
import Endereco from './components/pages/Endereco';
import DetalhesPedido from './components/pages/DetalhesPedido';
import Message from './components/layout/Message';
import Pagamento from './components/pages/Pagamento';
import MinhasVendas from './components/pages/MinhasVendas';
import MinhasCompras from './components/pages/MinhasCompras';

function AppContent() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/validacaocode';
  const pes = location.pathname === '/pesquisa';

  return (
    <UserProvider>
      <ToastContainer />
      <div className="main-content">
        {!isAuthPage && <NavBar />}
        <Message />
        <Container>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/pesquisa" element={<Pesquisa />} />
            <Route path="/termos" element={<Termos />} />
            <Route path="/validacaocode" element={<ValidacaoCode />} />
            <Route path="/produto/:id" element={<Productdetail />} />
            <Route path="/categorias/:categoryId" element={<Categorias />} />
            <Route path="/carrinho" element={<Carrinho />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/opcoesprofile/:userId" element={<OpcoesProfile />} />
            <Route path="/profile/informacoesprofile" element={<InformacoesProfile />} />
            <Route path="/pedido/:id_pedido" element={<DetalhesPedido />} />
            <Route path="/minhasvendas" element={<MinhasVendas />} />
            <Route path="/pagamento" element={<Pagamento />} />
            <Route path="/cadastro" element={<ProductSteps />} />
            <Route path="/endereco" element={<Endereco />} />
            <Route path="/steps" element={<ProductSteps />} />
            <Route path="/compras" element={<MinhasCompras />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </Container>
      </div>
      {!isAuthPage && !pes && <Rodape />}
    </UserProvider>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
