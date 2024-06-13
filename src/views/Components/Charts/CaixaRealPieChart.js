import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import 'chartjs-plugin-datalabels'; // Importe o plugin
import { API_BASE_URL, API_BASE_URL_AMPLIFY } from '../../../apiConfig';

const CaixaRealPieChart = () => {
  const [chart, setChart] = useState(null);
  const [insumosCost, setInsumosCost] = useState(0);
  const [estruturaCost, setEstruturaCost] = useState(0);
  const [capitalGiro, setCapitalGiro] = useState(0); // Alterei o nome da variável para capitalGiro

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [insumosResponse, estruturaResponse, capitalGiroResponse] = await Promise.all([
        fetch(`${API_BASE_URL}/api/investimentos/insumos`),
        fetch(`${API_BASE_URL}/api/investimentos/estrutura`),
        fetch(`${API_BASE_URL}/api/investimentos/capital-de-giro`)
      ]);

      const [insumosData, estruturaData, capitalGiroData] = await Promise.all([
        insumosResponse.json(),
        estruturaResponse.json(),
        capitalGiroResponse.json() // Alterei o nome da variável para capitalGiroData
      ]);

      // Calcula a soma total dos custos para cada categoria
      const insumosTotalCost = insumosData.reduce((total, item) => total + parseFloat(item.investimento), 0);
      const estruturaTotalCost = estruturaData.reduce((total, item) => total + parseFloat(item.investimento), 0);
      const capitalGiroTotal = capitalGiroData.reduce((total, item) => total + parseFloat(item.investimento_total), 0); // Alterei o nome da variável para capitalGiroTotal

      // Define os custos totais nos estados correspondentes
      setInsumosCost(insumosTotalCost);
      setEstruturaCost(estruturaTotalCost);
      setCapitalGiro(capitalGiroTotal); // Alterei o nome da variável para capitalGiro

      // Renderiza o gráfico com os custos totais
      renderChart(insumosTotalCost, estruturaTotalCost, capitalGiroTotal); // Alterei o nome da variável para capitalGiroTotal
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const renderChart = (insumosTotalCost, estruturaTotalCost, capitalGiroTotal) => { // Alterei o nome da variável para capitalGiroTotal
    const ctx = document.getElementById('CaixaRealPieChart');

    if (chart !== null) {
      chart.destroy();
    }

    setChart(
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Insumos', 'Estrutura', 'Capital de Giro'], // Alterei o nome da categoria para Capital de Giro
          datasets: [{
            data: [insumosTotalCost, estruturaTotalCost, capitalGiroTotal], // Alterei o nome da variável para capitalGiroTotal
            backgroundColor: ['#0088FE', '#00C49F', '#FFBB28']
          }]
        },
        options: {
          plugins: {
            datalabels: {
              color: '#fff',
              font: {
                size: 14
              },
              formatter: (value, context) => {
                return `${context.chart.data.labels[context.dataIndex]}: ${value}`;
              }
            }
          }
        }
      })
    );
  };

  return (
    <div>
      <h4>Caixa Real Hoje</h4>
      <canvas id="CaixaRealPieChart" width="400" height="400"></canvas>
    </div>
  );
};

export default CaixaRealPieChart;
