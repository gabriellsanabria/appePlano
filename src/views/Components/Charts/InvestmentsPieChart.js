import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import 'chartjs-plugin-datalabels'; // Importe o plugin
import { API_BASE_URL, API_BASE_URL_AMPLIFY } from '../../../apiConfig';
import useAuth from '../../../hooks/useAuth';

const InvestimentsPieChart = () => {
  const [chart, setChart] = useState(null);
  const [insumosCost, setInsumosCost] = useState(0);
  const [estruturaCost, setEstruturaCost] = useState(0);
  const [capitalGiro, setCapitalGiro] = useState(0); // Alterei o nome da variável para capitalGiro

  // Obtendo o usuário e o estado de carregamento do hook useAuth
  const { user, loading } = useAuth();
  const userId = user ? user.uid : null;

  useEffect(() => {
    if (!loading && userId) {
      fetchData();
    }
  }, [loading, userId]);

  const fetchData = async () => {
    try {
      const [insumosResponse, estruturaResponse, capitalGiroResponse] = await Promise.all([
        fetch(`${API_BASE_URL}/api/investimentos/insumos/user/${userId}`),
        fetch(`${API_BASE_URL}/api/investimentos/estrutura/user/${userId}`),
        fetch(`${API_BASE_URL}/api/investimentos/capital-de-giro/user/${userId}`)
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
    const ctx = document.getElementById('InvestimentPieChart');

    if (chart !== null) {
      chart.destroy();
    }

    setChart(
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          
          datasets: [{
            data: [insumosTotalCost, estruturaTotalCost, capitalGiroTotal], // Alterei o nome da variável para capitalGiroTotal
            backgroundColor: ['#7459D9', '#E3DEF7', '#B9ABEB']
          }]
        },
        options: {
          cutout: '70%', // Reduz o raio interno em 80% do raio externo
          plugins: {
            datalabels: {
              color: '#fff',
              font: {
                size: 14
              },
              formatter: (value, context) => {
                return `${context.chart.data.labels[context.dataIndex]}: ${value}`;
              },
              align: 'end', // Alinha as labels à direita
              anchor: 'end' // Ancora as labels à direita
            }
          }
        }
      })
    );
  };

  return (
    <div>
      <canvas id="InvestimentPieChart"></canvas>
    </div>
  );
};

export default InvestimentsPieChart;
