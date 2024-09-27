import { render, screen, fireEvent } from "@testing-library/react"; 
import Rodape from "../layout/Rodape";

describe("Rodape", () => {
    it("Renderizando elementos corretamente", () => {
        render(<Rodape/>);

        expect(screen.getByText("Trabalhe conosco")).toBeInTheDocument(); 
        expect(screen.getByText("Contatos")).toBeInTheDocument(); 
        expect(screen.getByText("Termos e condições")).toBeInTheDocument(); 
    });

    it("Renderizando informações de direitos autorais corretamente", () => {
        render(<Rodape />);

        const copyright = screen.getByText(/Copyright © 2022-2024 vereda.com.br LTDA/i);
        expect(copyright).toBeInTheDocument();
    });

    it("Funcionamento dos Links", () => {
        render(<Rodape/>);

        const termosLink = screen.getByText("Termos e condições");
        expect(termosLink.closest('a')).toHaveAttribute('href', '/termos');

    });   

    it("deve navegar para o link correto ao clicar", () => {
        render(<Rodape/>);
        const termosLink = screen.getByText("Termos e condições");
        fireEvent.click(termosLink);
    });
})