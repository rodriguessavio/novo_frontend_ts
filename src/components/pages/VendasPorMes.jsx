// src/components/VendasPorMes.jsx
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Função para gerar todos os meses do ano
const obterMesesAno = () => [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

function VendasPorMes({ userId, apiUrl }) {
  const [dataChart, setDataChart] = useState({
    labels: obterMesesAno(),
    datasets: [{
      label: 'Vendas Concluídas (R$)',
      data: Array(12).fill(0), // Inicialmente preencher com 0 para todos os meses
      backgroundColor: '#FC4F00',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    }],
  });

  useEffect(() => {
    const fetchVendas = async () => {
      try {
        // Buscar produtos do usuário
        const responseProdutos = await axios.get(`${apiUrl}/produty_company/list`);
        const produtos = responseProdutos.data.body;
        const produtosUsuario = produtos.filter(produto => produto.id_usuario === userId);

        // Buscar itens de pedidos
        const responseItensPedido = await axios.get(`${apiUrl}/order_item/list`);
        const itens = responseItensPedido.data.body;

        // Filtrar itens de pedidos do usuário logado
        const meusItens = itens.filter(item =>
          produtosUsuario.some(produto => produto.id === item.id_produto_empresa)
        );

        // Buscar pedidos
        const pedidosIds = [...new Set(meusItens.map(item => item.id_pedido))];
        const pedidosPromises = pedidosIds.map(id_pedido =>
          axios.get(`${apiUrl}/order/list/${id_pedido}`)
        );
        const pedidosResponse = await Promise.all(pedidosPromises);
        const pedidos = pedidosResponse.map(res => res.data.body).filter(
          pedido => pedido.status === 'finalizado'
        );

        // Agrupar vendas por mês
        const vendasPorMes = pedidos.reduce((acc, pedido) => {
          const dataPedido = new Date(pedido.createdAt);
          const mesIndex = dataPedido.getMonth(); // Obter o índice do mês (0 a 11)
          const valorPedido = meusItens
            .filter(item => item.id_pedido === pedido.id)
            .reduce((sum, item) => sum + item.preco * item.quantidade, 0);

          acc[mesIndex] = (acc[mesIndex] || 0) + valorPedido;
          return acc;
        }, Array(12).fill(0)); // Inicializar com 12 meses, todos com valor 0

        // Atualizar dados do gráfico com as vendas por mês
        setDataChart(prevData => ({
          ...prevData,
          datasets: [{
            ...prevData.datasets[0],
            data: vendasPorMes, // Atualizar os dados com os valores agrupados
          }],
        }));
      } catch (error) {
        console.error('Erro ao buscar vendas:', error);
      }
    };

    if (userId && apiUrl) {
      fetchVendas();
    }
  }, [userId, apiUrl]);

  return (
    <div>
      <center>
        <h2>Vendas Concluídas por Mês</h2>
      </center>
      <Bar 
        data={dataChart} 
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Vendas Concluídas por Mês',
            },
          },
          scales: {
            x: {
              stacked: true,
              title: {
                display: true,
                text: 'Mês',
              },
            },
            y: {
              stacked: true,
              title: {
                display: true,
                text: 'Valor (R$)',
              },
              beginAtZero: true,
            },
          },
        }} 
      />
    </div>
  );
}

export default VendasPorMes;
