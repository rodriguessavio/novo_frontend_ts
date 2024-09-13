// components/Profile.jsx
import React, { useContext, useState, useEffect } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import styles from './profile.module.css';
import perfil from '../../assets/userprofile.svg';
import { Context } from '../../context/UserContext';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Profile() {
  const { authenticated, user, logout, userName } = useContext(Context);
  const [profileImage, setProfileImage] = useState(perfil); 

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/user/list/${user.id}`);
        let imageUrl = response.data.body.img_perfil;

        if (imageUrl) {
          // Remove o segmento "public\images\usuario\" do caminho da imagem
          const correctedImageUrl = imageUrl.split('\\').pop();
          setProfileImage(`${import.meta.env.VITE_URL_API}/images/usuario/${correctedImageUrl}`);
        }
      } catch (error) {
        console.error('Erro ao buscar a imagem de perfil do usuário:', error);
        // Fallback para a imagem padrão já está configurado no useState
      }
    };

    if (authenticated && user && user.id) {
      fetchProfileImage();
    }
  }, [authenticated, user]);

  return (
    <div className={styles.container_princ}>
      <DropdownButton
        id={styles.dropdown_custom_button}
        title={
          <span className={styles.custom_dropdown_title}>
            <img src={profileImage} alt="Imagem do título" className={styles.custom_dropdown_image} />
            <p className={styles.nome}>{userName}</p>
          </span>
        }
        className={styles.custom_dropdown_button}
      >
        <Dropdown.Item as={Link} to={`/profile`} className={styles.custom_dropdown_item}>
          Minha conta
        </Dropdown.Item>
        <Dropdown.Item as={Link} to={`/minhasvendas`} className={styles.custom_dropdown_item}>
          Minhas Vendas
        </Dropdown.Item>
        <Dropdown.Item href="" className={styles.custom_dropdown_item} onClick={logout}>
          Sair
        </Dropdown.Item>
      </DropdownButton>
    </div>
  );
}

export default Profile;
