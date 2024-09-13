// components/pages/NoResults.js
import React from 'react';
import styles from './noresults.module.css'; // Importar o arquivo CSS para estilização

function Noresults() {
  return (
    <div className={styles.noResults}>
      <h3 className={styles.title_noresults}>Não há anúncios que correspondam à sua busca</h3>
      <ul>
        <li className={styles.li_no}>Revise a ortografia da palavra.</li>
        <li className={styles.li_no}>Utilize palavras mais genéricas ou menos palavras.</li>
        <li className={styles.li_no}>Navegue pelas categorias para encontrar um produto semelhante.</li>
      </ul>
    </div>
  );
}

export default Noresults;
