// hooks/useAuth.js
import api from '../utils/api';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import notify from "../utils/notificacao";

export default function useAuth() { 
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null); // Armazena o objeto do usuário
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user'); // Armazena o objeto do usuário

    if (token && storedUser) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      setAuthenticated(true);
      setUser(JSON.parse(storedUser)); 
    }
  }, [])

  async function register(userData) {   
    try {
      const data = await api.post('/user/register', userData).then((response) => response.data);
      const dados = data.createdUser;
      console.log('registro dados:', dados);
      
      setUser(dados); 
      localStorage.setItem('user', JSON.stringify(dados));
      
      redirectToEmailVerification();
    } catch (error) {
      console.log(error);
      console.log(userData);
      notify(error.response.data.message, "error");
      
    }
  }

  function redirectToEmailVerification() {
    navigate('/validacaocode'); 
  }

  async function verifyEmail(data) {
    try {
        const response = await api.post('/user/verify_email', data);
        console.log(response);
        setAuthenticated(true);
        notify("Email verificado com sucesso", "success");
        await authUser(response.data);
    } catch (error) {
        notify(error.response.data.message, "error");
    }
  }

  function logout() {
    setAuthenticated(false);
    setUser(null); // Limpa o objeto do usuário
    localStorage.removeItem('token');
    localStorage.removeItem('user'); 
    api.defaults.headers.Authorization = undefined;
    navigate('/');
    notify("Logout realizado com sucesso", "success");
  }

  async function login(userData) {
    if (!userData.email && !userData.senha) {
      notify("Email e Senha são obrigatórios", "error");
      return;
    }

    if (!userData.email && userData.senha) {
      notify("Email é obrigatório", "error");
      return;
    }

    if (userData.email && !userData.senha) {
      notify("Senha é obrigatória", "error");
      return;
    }

    console.log('userData', userData);

    try {
      const response = await api.post('/user/login', userData);
      console.log('response login', response);
      if (response && response.data) {
        const data = response.data;
        console.log(data);
        await authUser(data);
        notify("Usuário logado com sucesso", "success");
      } else {
        throw new Error('Resposta inesperada do servidor');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message === 'Credenciais Inválidas') {
        notify(error.response.data.message, "error");
      } else {
        console.error("Erro no login:", error);
        notify("Ocorreu um erro ao tentar fazer login. Por favor, tente novamente.", "error");
      }
    }
  }

  async function authUser(data) {
    setAuthenticated(true);
    console.log('valor', data.usuario)
    setUser(data.usuario); 
    localStorage.setItem('token', JSON.stringify(data.token));
    localStorage.setItem('user', JSON.stringify(data.usuario)); 
    navigate('/');
  }

  return { authenticated, user, register, logout, login, verifyEmail }; 
}
