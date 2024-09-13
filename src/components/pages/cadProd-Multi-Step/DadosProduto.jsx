import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Context } from '../../../context/UserContext';
import ModalConfirmacao from './ModalConfirmacao';
import styles from './DadosProduto.module.css';

const DadosProduto = ({ product, onBack }) => {
    const [formData, setFormData] = useState({
        nome: '',
        descricao: '',
        preco: '',
        quantidade: '',
        imagem: null,
        categoria: '',
    });

    const { user } = useContext(Context);
    const [categorias, setCategorias] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false); 

    useEffect(() => {
        if (product) {
            setFormData({
                nome: product.nome || '',
                descricao: product.descricao || '',
                preco: product.preco || '',
                quantidade: product.quantidade || '',
                imagem: null,
                categoria: product.categoria || '',
            });
        }
    }, [product]);

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const response = await axios.get('http://localhost:3000/category/list');
                setCategorias(response.data.body);
            } catch (error) {
                console.error('Erro ao buscar categorias:', error);
            }
        };

        fetchCategorias();
    }, []);

    const formatPrice = (value) => {
        const cleanValue = value.replace(/\D/g, '');
        const formattedValue = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(cleanValue / 100);
        return formattedValue;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'preco') {
            setFormData({ ...formData, [name]: formatPrice(value) });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleImageChange = (e) => {
        setFormData({ ...formData, imagem: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        
        const precoLimpo = formData.preco.replace(/[^\d,]/g, '').replace(',', '.');
    
        
        const precoFormatado = parseFloat(precoLimpo);
    
        if (isNaN(precoFormatado)) {
            console.error('Erro ao formatar o preço: valor inválido.');
            return;
        }
    
        const productData = {
            nome: formData.nome,
            descricao: formData.descricao,
            preco: precoFormatado.toFixed(2),
            quantidade: formData.quantidade,
            id_categoria: formData.categoria,
            id_usuario: user.id,
            id_produto: product ? product.id : null,
        };
    
        try {
            const formDataObj = new FormData();
            Object.keys(productData).forEach((key) => {
                formDataObj.append(key, productData[key]);
            });
    
            if (formData.imagem) {
                formDataObj.append('imagem', formData.imagem);
            }
    
            const response = await axios.post('http://localhost:3000/produty_company/create', formDataObj, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            console.log('Produto criado com sucesso:', response.data);
            setSuccessMessage('Produto criado com sucesso!');
            setIsModalOpen(true);
    
            setFormData({
                nome: '',
                descricao: '',
                preco: '',
                quantidade: '',
                imagem: null,
                categoria: '',
            });
    
        } catch (error) {
            console.error('Erro ao criar o produto:', error.response ? error.response.data : error);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false); 
    };

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
                        Preencha os detalhes do produto
                    </h6>
                    <p className={styles.description}>
                        Insira as informações sobre o produto que você deseja vender.
                    </p>
                </div>

                {isModalOpen && <ModalConfirmacao onClose={handleCloseModal} />}

                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label htmlFor="nome">Nome do Produto</label>
                        <input
                            type="text"
                            id="nome"
                            name="nome"
                            value={formData.nome}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="descricao">Descrição</label>
                        <textarea
                            id="descricao"
                            name="descricao"
                            value={formData.descricao}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="preco">Preço</label>
                        <input
                            type="text"
                            id="preco"
                            name="preco"
                            value={formData.preco}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="quantidade">Quantidade</label>
                        <input
                            type="number"
                            id="quantidade"
                            name="quantidade"
                            value={formData.quantidade}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="imagem">Imagem do Produto</label>
                        <input
                            type="file"
                            id="imagem"
                            name="imagem"
                            onChange={handleImageChange}
                            accept="image/*"
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="categoria">Categoria</label>
                        <select
                            id="categoria"
                            name="categoria"
                            value={formData.categoria}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Selecione uma categoria</option>
                            {categorias.map((categoria) => (
                                <option key={categoria.id} value={categoria.id}>
                                    {categoria.nome}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.buttons}>
                        <button className={styles.button} type="button" onClick={onBack}>
                            Voltar
                        </button>
                        <button className={styles.button} type="submit">
                            Confirmar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DadosProduto;
