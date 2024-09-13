import React from 'react';
import styles from './pagination.module.css'; // Adicione um arquivo CSS para a paginação

function Pagination({ currentPage, totalPages, onPageChange }) {
    const handleClick = (page) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    return (
        <div className={styles.pagination}>
            <button onClick={() => handleClick(currentPage - 1)} disabled={currentPage === 1}>
                Anterior
            </button>
            <span>Página {currentPage} de {totalPages}</span>
            <button onClick={() => handleClick(currentPage + 1)} disabled={currentPage === totalPages}>
                Próxima
            </button>
        </div>
    );
}

export default Pagination;
