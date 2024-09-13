import React from 'react';
import styles from './ModalConfirmacao.module.css';

const ModalConfirmacao = ({ onClose }) => {
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2>Produto criado com sucesso!</h2>
                <p>O seu produto foi cadastrado e já está disponível no sistema.</p>
                <button className={styles.closeButton} onClick={onClose}>
                    Fechar
                </button>
            </div>
        </div>
    );
};

export default ModalConfirmacao;
