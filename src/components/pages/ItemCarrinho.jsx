import React from 'react';
import styles from './carrinho.module.css';

function ItemCarrinho({ item, incrementar, decrementar, quantidade, removerItem }) {
    return (
        <div className={styles.inf}>
            <div className={styles.blImgProduto}>
                <img src={item.imagemProduto} alt={item.nomeProduto} className={styles.imgProduto} />
            </div>
            <div className={styles.nacoes}>
                <div className={styles.title}>{item.nomeProduto}</div>
                <div className={styles.acoes}>
                    <button onClick={removerItem} className={styles.btn_acoes}>Excluir</button>
                </div>
            </div>
            <div className={styles.quantidadeContainer}>
                <button onClick={() => decrementar(item.id)} className={styles.btn_quantidade}>-</button>
                <input type="text" value={quantidade[item.id] || item.quantidade} readOnly className={styles.input_quantidade} />
                <button onClick={() => incrementar(item.id)} className={styles.btn_quantidade}>+</button>
            </div>
            <div className={styles.valor}>
                <p>R${(item.preco * (quantidade[item.id] || item.quantidade)).toFixed(2)}</p>
            </div>
        </div>
    );
}

export default ItemCarrinho;    