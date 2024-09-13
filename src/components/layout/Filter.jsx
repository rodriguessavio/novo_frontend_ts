// components/pages/Filters.js
import React from 'react';
import styles from '../pages/pesquisa.module.css';

function Filter({ filters, onFilterChange }) {
  return (
    <div className={styles.filters}>
      {/* <h2>Filtros</h2> */}
      <label>
        Categoria:
        <select name="category" onChange={onFilterChange} value={filters.category}>
          <option value="">Todas</option>
          <option value="1">Categoria 1</option>
          <option value="2">Categoria 2</option>
          {/* Adicione mais opções conforme necessário */}
        </select>
      </label>
      Preço
      <br />
      <div className={styles.lb}>
        <div className={styles.input_min}>
          <input
            type="number"
            name="minPrice"
            value={filters.minPrice}
            onChange={onFilterChange}
            className={styles.prec}
            placeholder='Mínimo'
          />
        </div>
        
        -
        <div>
          <input
            type="number"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={onFilterChange}
            className={styles.prec}
            placeholder='Máximo'
          />
        </div>
      </div>
      
    </div>
  );
}

export default Filter;
