// src/pages/InformacoesProfile.jsx
import styles from './informacoesprofile.module.css';
import React, { useContext, useEffect, useState } from 'react';
import { Context as UserContext } from '../../../context/UserContext';
import axios from 'axios';
import InputMask from 'react-input-mask';
import perfil from '../../../assets/userprofile.svg';

function InformacoesProfile() {
  const { user } = useContext(UserContext);
  const [userData, setUserData] = useState(null);
  const [editableData, setEditableData] = useState({
    nome: '',
    email: '',
    telefone: '',
    documentType: 'cpf',
    documentNumber: ''
  });
  const [profileImage, setProfileImage] = useState(''); 

  const fetchUserData = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:3000/user/list/${userId}`);
      
      const data = response.data.body;
      setUserData(data);

      // Determina o tipo de documento e o número com base em `pessoa` ou `empresa`
      const documentType = data.pessoa ? 'cpf' : (data.empresa ? 'cnpj' : 'cpf');
      const documentNumber = data.pessoa ? data.pessoa.cpf : (data.empresa ? data.empresa.cnpj : '');

      setEditableData({
        nome: data.nome,
        email: data.email,
        telefone: data.telefone || '',
        documentType,
        documentNumber
      });

      // Atualiza a imagem do perfil
      if (data.img_perfil) {
        const correctedImageUrl = data.img_perfil.split('\\').pop();
        setProfileImage(`${import.meta.env.VITE_URL_API}images/usuario/${correctedImageUrl}`);
      } else {
        setProfileImage(''); // Se não houver imagem, não exibe nada
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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditableData({
      ...editableData,
      [name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:3000/user/update/${user.id}`, editableData);
      alert('Dados atualizados com sucesso!');
      fetchUserData(user.id);
    } catch (error) {
      console.error('Erro ao atualizar os dados do usuário:', error);
      alert('Erro ao atualizar os dados. Por favor, tente novamente.');
    }
  };

  const getDocumentMask = (type) => {
    switch (type) {
      case 'cpf':
        return '999.999.999-99';
      case 'cnpj':
        return '99.999.999/9999-99';
      default:
        return '';
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.profileHeader}>
        {profileImage ? (
          <img src={profileImage} alt="Imagem de perfil" className={styles.profileImage} />
        ) : (
          <img src={perfil} alt="Imagem de perfil padrão" className={styles.profileImage} />
        )}
        <h2>Atualizar Informações</h2>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="nome" className={styles.lb}>Nome:</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={editableData.nome}
            onChange={handleChange}
            className={styles.in}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.lb}>Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={editableData.email}
            onChange={handleChange}
            className={styles.in}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="telefone" className={styles.lb}>Telefone:</label>
          <InputMask
            mask="(99) 99999-9999"
            id="telefone"
            name="telefone"
            value={editableData.telefone}
            onChange={handleChange}
            className={styles.in}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="documentType" className={styles.lb}>Tipo de Documento:</label>
          <select
            id="documentType"
            name="documentType"
            value={editableData.documentType}
            onChange={handleChange}
            className={styles.in}
            required
          >
            <option value="cpf">CPF</option>
            <option value="cnpj">CNPJ</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="documentNumber" className={styles.lb}>Número do Documento:</label>
          <InputMask
            mask={getDocumentMask(editableData.documentType)}
            id="documentNumber"
            name="documentNumber"
            value={editableData.documentNumber}
            onChange={handleChange}
            className={styles.in}
            required
          />
        </div>

        <button type="submit" className={styles.submitButton}>Atualizar</button>
      </form>
    </div>
  );
}

export default InformacoesProfile;
