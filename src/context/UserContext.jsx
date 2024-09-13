// context/UserContext.js
import React, { createContext, useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import axios from 'axios';

const Context = createContext();

function UserProvider({ children }) {
  const { authenticated, register, user, logout, login, verifyEmail } = useAuth();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchUserName = async () => {
      if (authenticated && user && user.id) {
        try {
          const response = await axios.get(`http://localhost:3000/user/list/${user.id}`, {
            headers: {
              Authorization: `Bearer ${user.token}`, 
            },
          });

          if (response.data && response.data.body.nome) {
            setUserName(response.data.body.nome);
          } else {
            console.error('Nome de usuário não encontrado na resposta.');
          }
        } catch (error) {
          console.error("Erro ao buscar o nome do usuário:", error);
        }
      } else {
        setUserName(''); 
      }
    };

    fetchUserName();
  }, [authenticated, user]);

  return (
    <Context.Provider
      value={{ 
        authenticated, 
        register, 
        user, 
        userName, 
        logout, 
        login, 
        verifyEmail 
      }}
    >
      {children}
    </Context.Provider>
  );
}

export { Context, UserProvider };
