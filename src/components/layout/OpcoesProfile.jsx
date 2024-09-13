import React, { useContext, useEffect, useState } from 'react';
import styles from './opcoesprofile.module.css';
import perfil from '../../assets/userprofile.svg';
import icon from '../../assets/iconinf.svg';
import { Context } from '../../context/UserContext'; 
import axios from 'axios'; 

function OpcoesProfile() {
  const { authenticated, user } = useContext(Context);  
  const [userName, setUserName] = useState(''); 
  const [email, setEmail] = useState('');
  
  const fetchUserName = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:3000/user/list/${userId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      
      if (response.data && response.data.body.nome) {
        console.log(response.data.body.nome);
        setUserName(response.data.body.nome);
        setEmail(response.data.body.email);
      } else {
        console.error('Nome de usuário não encontrado na resposta.');
      }
    } catch (error) {
      console.error("Erro ao buscar o nome do usuário:", error);
    }
  };

  useEffect(() => {
    if (authenticated && user && user.id) {
      fetchUserName(user.id);
    }
  }, [authenticated, user]);

  console.log(user);

  return (
    <div className={styles.content}>
      <div className={styles.inf_basica}>
        <img src={perfil} alt="Perfil" className={styles.img_profile} />
        <div className={styles.infP}>
          {console.log(user.email)}
          <p className={styles.nome_usuario}>{userName}</p>
          <p className={styles.email_usuario}>{email}</p>
        </div>
      </div>

      <div className={styles.mais_info}>
        <div className={styles.b1}>
          <a href="#" className={styles.link_icon}>
            <img src={icon} alt="Ícone" />
            <div>
              <p className={styles.title}>Suas informações</p>
              <p className={styles.subtitle}>São as informações que você preenche para usar sua conta</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

export default OpcoesProfile;
