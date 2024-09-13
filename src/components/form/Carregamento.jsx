// components/Loader.js
import React from 'react';
import styles from './carregamento.module.css'; 

const Carregamento = () => {
  return (
    <div className={styles.loader}>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default Carregamento;
