import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './categorias.module.css';
import ProductCard from '../layout/ProductCard';

function Categorias() {
  const { categoryId } = useParams(); 
  const [produtos, setProdutos] = useState([]); 
  const [categoriaNome, setCategoriaNome] = useState('');

  useEffect(() => {
    
    const fetchCategoriaNome = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/category/list/${categoryId}`); 
        
        const categorias = response.data.body.nome; 
        

        
        if (categorias) {
          setCategoriaNome(categorias);
        }
      } catch (error) {
        console.error('Erro ao buscar categorias:', error);
      }
    };

    

    const fetchProdutos = async () => {
      try {
        const response = await axios.get('http://localhost:3000/produty_company/list'); 
        const todosProdutos = response.data.body; 
        console.log('todos: ',todosProdutos);
        
        const produtosFiltrados = todosProdutos.filter(produto => produto.id_categoria === parseInt(categoryId, 10)); 
        console.log('filtrados: ',produtosFiltrados);
        console.log(produtosFiltrados);
        setProdutos(produtosFiltrados); 
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };
    fetchCategoriaNome();
    fetchProdutos();
  }, [categoryId]); // Executa o efeito sempre que o categoryId muda

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{categoriaNome}</h1>
        <div className={styles.produto}>
          {/* <p>vasco</p> */}
          {produtos.length > 0 ? (
            <ul>
              {produtos.map((produto) => (
                
                <ProductCard 
                  key={produto.id} 
                  product={produto} 
                />
              ))}
            </ul>
          ) : (
            <p>Carregando ou nenhum produto encontrado...</p>
          )}
        </div>
    </div>
  );
}

export default Categorias;