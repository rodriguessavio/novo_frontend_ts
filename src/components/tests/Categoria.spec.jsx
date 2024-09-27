import { render, screen, fireEvent } from "@testing-library/react"; 
import Categoria from "../layout/Categoria";

describe("Categoria", () => {

    it("Verifica se o componente Categoria é renderizado sem erro", () => {
        const { container } = render(<Categoria />);
        expect(container).toBeInTheDocument();
    });


    it("Deve renderizar corretamente sem uma categoria específica", () => {
        const { rerender } = render(<Categoria />);
        rerender(<Categoria categorias={[]} />);
        expect(screen.getByText("Categorias")).toBeInTheDocument();
    });

    

    it("Renderizando elementos corretamente", () => {
        render(<Categoria/>);
        expect(screen.getByText("Categorias")).toBeInTheDocument(); 
        expect(screen.getByText("Tijolos")).toBeInTheDocument(); 
        expect(screen.getByText("Telhas")).toBeInTheDocument(); 
        expect(screen.getByText("Tintas e Acessórios")).toBeInTheDocument(); 
        expect(screen.getByText("Material Elétrico")).toBeInTheDocument(); 
        expect(screen.getByText("Ferramentas")).toBeInTheDocument(); 
        expect(screen.getByText("Pisos e Revestimento")).toBeInTheDocument(); 
        expect(screen.getByText("Cimento")).toBeInTheDocument(); 
        expect(screen.getByText("Areia e Brita")).toBeInTheDocument(); 
    });

    it("Funcionamento dos Links", () => {
        render(<Categoria/>);

        const tijolosLink = screen.getByText("Tijolos");
        expect(tijolosLink.closest('a')).toHaveAttribute('href', 'http://localhost:5173/categorias/3');

        const telhasLink = screen.getByText("Telhas");
        expect(telhasLink.closest('a')).toHaveAttribute('href', 'http://localhost:5173/categorias/4');

        const areiabritaLink = screen.getByText("Areia e Brita");
        expect(areiabritaLink.closest('a')).toHaveAttribute('href', 'http://localhost:5173/categorias/2');

        const tintaLink = screen.getByText("Tintas e Acessórios");
        expect(tintaLink.closest('a')).toHaveAttribute('href', 'http://localhost:5173/categorias/11');

        const eletricoLink = screen.getByText("Material Elétrico");
        expect(eletricoLink.closest('a')).toHaveAttribute('href', 'http://localhost:5173/categorias/7');

        const ferramentasLink = screen.getByText("Ferramentas");
        expect(ferramentasLink.closest('a')).toHaveAttribute('href', 'http://localhost:5173/categorias/12');

        const pisosLink = screen.getByText("Pisos e Revestimento");
        expect(pisosLink.closest('a')).toHaveAttribute('href', 'http://localhost:5173/categorias/9');

        const cimentoLink = screen.getByText("Cimento");
        expect(cimentoLink.closest('a')).toHaveAttribute('href', 'http://localhost:5173/categorias/1');
    }); 
    
    it("deve navegar para o link correto ao clicar", () => {
        render(<Categoria/>);
        const tijolosLink = screen.getByText("Tijolos");
        fireEvent.click(tijolosLink);
        
        const telhasLink = screen.getByText("Telhas");
        fireEvent.click(telhasLink);

        const areiabritaLink = screen.getByText("Areia e Brita");
        fireEvent.click(areiabritaLink);

        const tintaLink = screen.getByText("Tintas e Acessórios");
        fireEvent.click(tintaLink);

        const eletricoLink = screen.getByText("Material Elétrico");
        fireEvent.click(eletricoLink);

        const ferramentasLink = screen.getByText("Ferramentas");
        fireEvent.click(ferramentasLink);

        const pisosLink = screen.getByText("Pisos e Revestimento");
        fireEvent.click(pisosLink);

        const cimentoLink = screen.getByText("Cimento");
        fireEvent.click(cimentoLink);
    });

    it("Estilos aplicados corretamente", () => {
        render(<Categoria/>);
    
        const tijolosLink = screen.getByText("Tijolos");
        expect(tijolosLink).toHaveClass("esp-txt");
        
        const telhasLink = screen.getByText("Telhas");
        expect(telhasLink).toHaveClass("esp-txt");

        const areiabritaLink = screen.getByText("Areia e Brita");
        expect(areiabritaLink).toHaveClass("esp-txt");

        const tintaLink = screen.getByText("Tintas e Acessórios");
        expect(tintaLink).toHaveClass("esp-txt");

        const eletricoLink = screen.getByText("Material Elétrico");
        expect(eletricoLink).toHaveClass("esp-txt");

        const ferramentasLink = screen.getByText("Ferramentas");
        expect(ferramentasLink).toHaveClass("esp-txt");

        const pisosLink = screen.getByText("Pisos e Revestimento");
        expect(pisosLink).toHaveClass("esp-txt");

        const cimentoLink = screen.getByText("Cimento");
        expect(cimentoLink).toHaveClass("esp-txt");
    });

    it("Deve aplicar estilo de hover corretamente", () => {
        render(<Categoria/>);
    
        const tijolosLink = screen.getByText("Tijolos");
    
        
        fireEvent.mouseOver(tijolosLink);
    
        
        expect(tijolosLink).toHaveClass("esp-txt");
    });
    


})