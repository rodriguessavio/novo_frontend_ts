import React from 'react';
import styles from './endereco.module.css';

const EnderecoItem = ({ address, onSelect }) => {
  return (
    <div className={styles.conteudo_total}>
      <input
        type="radio"
        name="endereco"
        id={`endereco-${address.id}`}
        onChange={onSelect}
      />
      <div key={address.id} className={styles.corpo_conteudo}>
        <p className={styles.conteudo_endereco}>{address.rua}, {address.bairro}, {address.numero_casa}</p>
        <p className={styles.conteudo_endereco}>{address.complemento}</p>
        <p className={styles.desc}>{address.cidade}, {address.estado} - CEP {address.cep}</p>
      </div>
    </div>
  );
};

export default EnderecoItem;
