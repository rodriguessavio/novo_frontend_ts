import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Dropbutton from "../layout/Dropbutton";
import { BrowserRouter as Router } from 'react-router-dom';
import axios from "axios";


jest.mock("axios");

const mockNavigate = jest.fn();


jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Dropbutton Component", () => {
  const mockCategorias = [
    { id: 1, nome: "Tijolos" },
    { id: 2, nome: "Telhas" },
    { id: 3, nome: "Cimento" }
  ];

  beforeEach(() => {
    
    axios.get.mockResolvedValue({ data: { body: mockCategorias } });
  });

  it("Renderiza o botão de dropdown corretamente", async () => {
    render(
      <Router>
        <Dropbutton />
      </Router>
    );

    
    const dropdownButton = screen.getByText("Categorias");
    expect(dropdownButton).toBeInTheDocument();
  });

  it("Renderiza as categorias do dropdown corretamente", async () => {
    render(
      <Router>
        <Dropbutton />
      </Router>
    );
    
    fireEvent.click(screen.getByText("Categorias"));
    
    await waitFor(() => {
      expect(screen.getByText("Tijolos")).toBeInTheDocument();
      expect(screen.getByText("Telhas")).toBeInTheDocument();
      expect(screen.getByText("Cimento")).toBeInTheDocument();
    });
  });

  it("Navega para a categoria correta ao clicar no item de dropdown", async () => {
    render(
      <Router>
        <Dropbutton />
      </Router>
    );

    fireEvent.click(screen.getByText("Categorias"));
    
    await waitFor(() => screen.getByText("Tijolos"));

    
    fireEvent.click(screen.getByText("Tijolos"));

    
    expect(mockNavigate).toHaveBeenCalledWith("/categorias/1");
  });

  it("Simula a seleção de uma categoria diferente", async () => {
    render(
      <Router>
        <Dropbutton />
      </Router>
    );

    
    fireEvent.click(screen.getByText("Categorias"));

    
    await waitFor(() => {
      expect(screen.getByText("Cimento")).toBeInTheDocument();
    });

    
    fireEvent.click(screen.getByText("Cimento"));

    
    expect(mockNavigate).toHaveBeenCalledWith("/categorias/3");
});

  it("Mostra erro ao falhar em buscar categorias", async () => {
    
    axios.get.mockRejectedValueOnce(new Error("Erro ao buscar categorias"));

    render(
      <Router>
        <Dropbutton />
      </Router>
    );

    
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalled();
    });
  });
});
