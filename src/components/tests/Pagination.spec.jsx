import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../layout/Pagination';

describe('Pagination Component', () => {
  const mockOnPageChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks(); 
  });

  it('Renderiza corretamente com o número atual e total de páginas', () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={mockOnPageChange} />);

    
    expect(screen.getByText('Página 1 de 5')).toBeInTheDocument();
  });

  it('Desabilita o botão "Anterior" na primeira página', () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={mockOnPageChange} />);

    
    const prevButton = screen.getByText('Anterior');
    expect(prevButton).toBeDisabled();
  });

  it('Desabilita o botão "Próxima" na última página', () => {
    render(<Pagination currentPage={5} totalPages={5} onPageChange={mockOnPageChange} />);

    
    const nextButton = screen.getByText('Próxima');
    expect(nextButton).toBeDisabled();
  });

  it('Chama a função onPageChange ao clicar no botão "Próxima"', () => {
    render(<Pagination currentPage={2} totalPages={5} onPageChange={mockOnPageChange} />);

    
    fireEvent.click(screen.getByText('Próxima'));

    
    expect(mockOnPageChange).toHaveBeenCalledWith(3);
  });

  it('Chama a função onPageChange ao clicar no botão "Anterior"', () => {
    render(<Pagination currentPage={2} totalPages={5} onPageChange={mockOnPageChange} />);

    
    fireEvent.click(screen.getByText('Anterior'));

    
    expect(mockOnPageChange).toHaveBeenCalledWith(1);
  });

  it('Não chama onPageChange quando o botão "Próxima" está desabilitado', () => {
    render(<Pagination currentPage={5} totalPages={5} onPageChange={mockOnPageChange} />);

    
    const nextButton = screen.getByText('Próxima');
    fireEvent.click(nextButton);

    
    expect(mockOnPageChange).not.toHaveBeenCalled();
  });

  it('Não chama onPageChange quando o botão "Anterior" está desabilitado', () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={mockOnPageChange} />);

    
    const prevButton = screen.getByText('Anterior');
    fireEvent.click(prevButton);

    
    expect(mockOnPageChange).not.toHaveBeenCalled();
  });
});
