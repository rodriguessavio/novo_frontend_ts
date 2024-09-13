import React from 'react';
import styles from './modal.module.css'; // Adapte o caminho do CSS conforme necessário

function Modal({ isVisible, onClose, message, productName, productImage, quantity }) {
  if (!isVisible) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <div className={styles.content}>
          <div className={styles.imgContainer}>
            {productImage && <img src={productImage} alt={productName} className={styles.productImage} />}
          </div>
          <div className={styles.info}>
            <p className={styles.title}>{message}</p>
            {productName && <p className={styles.productName}>{productName}</p>}
            {quantity && <p className={styles.quantity}>{quantity} unidade{quantity > 1 ? 's' : ''}</p>}
          </div>
        </div>
        <button className={styles.closeButton} onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
}

export default Modal;
