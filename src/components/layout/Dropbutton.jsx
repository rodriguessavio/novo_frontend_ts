import React, { useEffect, useState } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Importe o useNavigate aqui
import axios from 'axios';
import styles from './dropbutton.module.css';

function Dropbutton() {
  const [categorias, setCategorias] = useState([]);
  const navigate = useNavigate(); // Inicialize o hook useNavigate

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await axios.get('http://localhost:3000/category/list');
        setCategorias(response.data.body);
        console.log('opa',  response.data.body);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategorias();
  }, []);

  const handleSelect = (categoryId) => {
    navigate(`/categorias/${categoryId}`); // Navega para a página de produtos da categoria selecionada
  };

  return (
    <div>
      <DropdownButton
        id={styles.dropdown_custom_button}
        title="Categorias"
        className={styles.custom_dropdown_button}
      >
        {categorias.map((categoria) => (
          <Dropdown.Item
            key={categoria.id}
            onClick={() => handleSelect(categoria.id)}
            className={styles.custom_dropdown_item}
          >
            {categoria.nome}
          </Dropdown.Item>
        ))}
      </DropdownButton>
    </div>
  );
}

export default Dropbutton;
