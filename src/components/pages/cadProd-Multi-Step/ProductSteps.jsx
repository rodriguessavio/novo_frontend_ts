import React, { useState, useContext } from 'react';
import Search from './CadastroProduto';
import ProductCard from './Segundo';
import DadosProduto from './DadosProduto';
import { Context } from '../../../context/UserContext';

const ProductSteps = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const { user } = useContext(Context);

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setCurrentStep(2);
  };

  
  const handleConfirmProduct = () => {
    setCurrentStep(3);
  };

  
  const handleBack = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
    } else if (currentStep === 3) {
      setCurrentStep(2);
    }
  };

  return (
    <div>
      {currentStep === 1 && (
        <Search onSelectProduct={handleSelectProduct} />
      )}
      {currentStep === 2 && selectedProduct && (
        <ProductCard
          product={selectedProduct}
          onBack={handleBack}
          onConfirm={handleConfirmProduct}
        />
      )}
      {currentStep === 3 && selectedProduct && (
        <DadosProduto
          product={selectedProduct}
          onBack={handleBack}
        />
      )}
    </div>
  );
};

export default ProductSteps;
