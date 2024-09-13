import React from 'react';
import styles from './styles.module.css';

const ProductCard = ({ product, onBack, onConfirm }) => {
    if (!product) return null;
    const UrlImagem = import.meta.env.VITE_URL_API;


    return (
        <div className={styles.containermain}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <button className={styles.backButton} onClick={onBack}>
                        <span className={styles.backArrow}>&lt;</span> Anterior
                    </button>
                </div>
                <div className={styles.header}>
                    <h6 className={styles.title}>
                        Para anunciar mais rápido, vamos procurar seu produto no nosso catálogo
                    </h6>
                    <p className={styles.descriptionup}>
                        O produto está no nosso catálogo. É o que você vende?
                    </p>
                    <p className={styles.description}>
                        Certifique-se de que as características correspondam às do seu produto, pois essas informações aparecerão aos compradores.
                    </p>
                </div>
                <div className={styles.content}>
                    <div className={styles.product}>
                        <div className={styles.productImage}>
                            {product.imagem.slice(0, 6).map((img, index) => (
                                <img
                                    key={index}
                                    src={`${UrlImagem}images/produto/${img.split('\\').pop().split('/').pop()}`}
                                    alt={`${product.nome} ${index + 1}`}
                                    onClick={() =>
                                        (document.getElementById('mainImage').src = `${UrlImagem}/images/produto/${img.split('\\').pop().split('/').pop()}`)
                                    }
                                />
                            ))}
                        </div>
                        <div className={styles.productDetails}>
                            <h3 className={styles.productName}>{product.nome}</h3>
                            <p className={styles.productDescription}>{product.especificacoes}</p>
                            <ul className={styles.productFeatures}>
                                <li>
                                    <span className={styles.productFeatureTitle}>Marca: </span>
                                    <span className={styles.productFeatureValue}>{product.marca}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={styles.buttons}>
                    <button className={styles.button} onClick={onBack}>Não é o que eu vendo</button>
                    <button className={styles.button} onClick={onConfirm}>Confirmar</button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
