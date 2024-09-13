import styles from './profile.module.css';
import React, { useContext, useEffect, useState } from 'react';
import { Context as UserContext } from '../../../context/UserContext';
import axios from 'axios';
import perfil from '../../../assets/userprofile.svg';
import iconInf from '../../../assets/iconinf.svg';
import iconEnd from '../../../assets/icon_endereco.svg';
import iconCon from '../../../assets/iconcontato.svg';
import { Link } from 'react-router-dom';

function Profile() {
  const { user } = useContext(UserContext);
  const [userData, setUserData] = useState(null);
  const [profileImage, setProfileImage] = useState(perfil); 

  const fetchUserData = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:3000/user/list/${userId}`);
      const data = response.data.body;
      console.log(data);
      setUserData(data);

      // Atualiza a imagem do perfil
      if (data.img_perfil) {
        const correctedImageUrl = data.img_perfil.split('\\').pop();
        setProfileImage(`${import.meta.env.VITE_URL_API}images/usuario/${correctedImageUrl}`);
      } else {
        // Se não houver imagem de perfil, usa a imagem padrão
        setProfileImage(perfil);
      }
    } catch (error) {
      console.error('Erro ao buscar os dados do usuário:', error);
    }
  };

  useEffect(() => {
    if (user && user.id) {
      fetchUserData(user.id);
    }
  }, [user]);

  return (
    <div className={styles.container}>
      <div className={styles.menu_princ}>
        <div className={styles.img_perfil}>
          <img src={profileImage} alt="Imagem de perfil" className={styles.img_perfil_true}/>
        </div>
        <div className={styles.inf_perfil}>
          <p className={styles.nome_user}>{userData ? userData.nome : 'Carregando...'}</p>
          <p className={styles.email_user}>{userData ? userData.email : 'Carregando...'}</p>
        </div>
      </div>

      <div className={styles.content}>
        <Link to="/profile/informacoesprofile" className={styles.opt}>
          <div className={styles.img_icon}>
            <img src={iconInf} alt="Ícone de informações" />
          </div>
          <div>
            <p className={styles.title_princ}>Suas informações</p>
            <p className={styles.subtitle}>São as informações que você preenche para usar sua conta</p>
          </div>
        </Link>

        <Link to="/profile/address" className={styles.opt}>
          <div className={styles.img_icon}>
            <img src={iconEnd} alt="Ícone de endereço" className={styles.icon_endereco}/>
          </div>
          <div>
            <p className={styles.title_princ}>Endereços</p>
            <p className={styles.subtitle}>Informações referentes a endereço</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Profile;
