import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Modal from '../layout/Modal'; // Ajuste o caminho do import conforme necessário

describe('Componente Modal', () => {
  test('não deve renderizar quando isVisible for falso', () => {
    render(<Modal isVisible={false} />);

    // Verifica se o modal não está sendo renderizado
    const modal = screen.queryByRole('dialog');
    expect(modal).not.toBeInTheDocument();
  });

  test('deve renderizar corretamente quando isVisible for verdadeiro', () => {
    const mensagem = 'Produto adicionado ao carrinho';
    const nomeProduto = 'Produto Exemplo';
    const imagemProduto = 'https://example.com/image.jpg';
    const quantidade = 2;

    render(
      <Modal
        isVisible={true}
        message={mensagem}
        productName={nomeProduto}
        productImage={imagemProduto}
        quantity={quantidade}
      />
    );

    
    expect(screen.getByText(mensagem)).toBeInTheDocument();
    expect(screen.getByText(nomeProduto)).toBeInTheDocument();
    expect(screen.getByText(/2 unidades/i)).toBeInTheDocument();

    
    const imagem = screen.getByAltText(nomeProduto);
    expect(imagem).toBeInTheDocument();
    expect(imagem.src).toBe(imagemProduto);
  });

  test('deve chamar onClose ao clicar no botão de fechar', () => {
    const handleClose = jest.fn();
    render(<Modal isVisible={true} onClose={handleClose} />);

    
    const botaoFechar = screen.getByText(/fechar/i);
    fireEvent.click(botaoFechar);

    
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  test('não deve renderizar imagem e nome do produto se não forem fornecidos', () => {
    render(<Modal isVisible={true} message="Produto adicionado ao carrinho" />);


    expect(screen.getByText(/produto adicionado ao carrinho/i)).toBeInTheDocument();
    expect(screen.queryByAltText(/produto/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/produto exemplo/i)).not.toBeInTheDocument();
  });

  test('deve exibir "1 unidade" quando a quantidade for 1', () => {
    render(<Modal isVisible={true} quantity={1} />);

    
    expect(screen.getByText(/1 unidade/i)).toBeInTheDocument();
  });
});
