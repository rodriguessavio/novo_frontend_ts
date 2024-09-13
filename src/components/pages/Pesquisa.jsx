// components/pages/Pesquisa.js
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../layout/ProductCard';
import Filter from '../layout/Filter';
import Pagination from '../layout/Pagination';
import styles from './pesquisa.module.css';
import Noresults from '../error/Noresults';

function Pesquisa() {
    const location = useLocation();
    const [results, setResults] = useState(location.state?.results || []);
    const [filteredResults, setFilteredResults] = useState(results);
    const [filters, setFilters] = useState({
      category: '',
      minPrice: '',
      maxPrice: '',
    });
    const [currentPage, setCurrentPage] = useState(1);
    const resultsPerPage = 10;

    useEffect(() => {
        // Atualiza os resultados e a página atual quando a localização muda
        setResults(location.state?.results || []);
        setCurrentPage(1); // Reinicia para a primeira página quando os resultados mudam
    }, [location.state]);

    useEffect(() => {
      const applyFilters = () => {
        let filtered = [...results];
        
        if (filters.category) {
          filtered = filtered.filter(product => product.category_id === Number(filters.category));
        }
        if (filters.minPrice) {
          filtered = filtered.filter(product => parseFloat(product.price) >= parseFloat(filters.minPrice));
        }
        if (filters.maxPrice) {
          filtered = filtered.filter(product => parseFloat(product.price) <= parseFloat(filters.maxPrice));
        }
  
        setFilteredResults(filtered);
      };
  
      applyFilters();
    }, [filters, results]);
  
    const handleFilterChange = (e) => {
      const { name, value } = e.target;
      setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
    };

    const indexOfLastResult = currentPage * resultsPerPage;
    const indexOfFirstResult = indexOfLastResult - resultsPerPage;
    const currentResults = filteredResults.slice(indexOfFirstResult, indexOfLastResult);

    const totalPages = Math.ceil(filteredResults.length / resultsPerPage);

    const hasResults = currentResults.length > 0;

    return (
      <div className={styles.container}>
        {hasResults && (
          <div className={styles.filters}>
            <p className={styles.nameresults}>{location.state?.searchQuery || 'pesquisa'}</p>
            <p className={styles.results}>{filteredResults.length} resultados</p>
            {/* <Filter filters={filters} onFilterChange={handleFilterChange} /> */}
          </div>
        )}
        <div className={styles.resultsContainer}>
          <div className={styles.products}>
            {hasResults ? (
              currentResults.map(product => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
                <div>
                  <Noresults />
                </div>
            )}
          </div>
          {hasResults && (
            <Pagination 
              currentPage={currentPage} 
              totalPages={totalPages} 
              onPageChange={(page) => setCurrentPage(page)} 
            />
          )}
        </div>
      </div>
    );
}

export default Pesquisa;
