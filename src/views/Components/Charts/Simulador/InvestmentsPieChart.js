import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import 'chartjs-plugin-datalabels'; // Importe o plugin
import { API_BASE_URL, API_BASE_URL_AMPLIFY } from '../../../../apiConfig';
import useAuth from '../../../../hooks/useAuth';

const CaixaRealPieChart = () => {
  const [chart, setChart] = useState(null);
  const [insumosCost, setInsumosCost] = useState(0);
  const [estruturaCost, setEstruturaCost] = useState(0);
  const [capitalGiro, setCapitalGiro] = useState(0);  
  const [contasPagar, setcaixaContasPagarTotal] = useState(0);
 
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
      const [caixaLiquidoResponse, caixaEstoque, caixaRecebiveis, caixaContasPagar] = await Promise.all([
        fetch(`${API_BASE_URL}/api/caixa/liquido/user/${userId}`),
        fetch(`${API_BASE_URL}/api/caixa/estoque/user/${userId}`),
        fetch(`${API_BASE_URL}/api/caixa/recebiveis/user/${userId}`),
        fetch(`${API_BASE_URL}/api/caixa/contas_pagar/user/${userId}`)
      ]);

      const [caixaLiquidoData, caixaEstoqueData, caixaRecebiveisData, caixaContasPagarData] = await Promise.all([
        caixaLiquidoResponse.json(),
        caixaEstoque.json(),
        caixaRecebiveis.json(),
        caixaContasPagar.json() 
      ]);

      // Calcula a soma total dos custos para cada categoria
      const caixaLiquidoTotalCost = caixaLiquidoData.reduce((total, item) => total + parseFloat(item.valor), 0);
      const caixaEstoqueTotalCost = caixaEstoqueData.reduce((total, item) => total + parseFloat(item.valor), 0);
      const caixaRecebiveisTotal = caixaRecebiveisData.reduce((total, item) => total + parseFloat(item.valor), 0); // Alterei o nome da variável para capitalGiroTotal
      const caixaContasPagarTotal = caixaContasPagarData.reduce((total, item) => total + parseFloat(item.valor), 0); // Alterei o nome da variável para capitalGiroTotal
      
      // Define os custos totais nos estados correspondentes
      setInsumosCost(caixaLiquidoTotalCost);
      setEstruturaCost(caixaEstoqueTotalCost);
      setCapitalGiro(caixaRecebiveisTotal);
      setcaixaContasPagarTotal(caixaContasPagarTotal);

      // Renderiza o gráfico com os custos totais
      renderChart(caixaLiquidoTotalCost, caixaEstoqueTotalCost, caixaRecebiveisTotal,caixaContasPagarTotal); // Alterei o nome da variável para capitalGiroTotal
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const renderChart = (caixaLiquidoTotalCost, caixaEstoqueTotalCost, caixaRecebiveisTotal, caixaContasPagarTotal) => { // Alterei o nome da variável para capitalGiroTotal
    const ctx = document.getElementById('CaixaRealPieChart');

    if (chart !== null) {
      chart.destroy();
    }

    setChart(
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          datasets: [{
            data: [caixaLiquidoTotalCost, caixaEstoqueTotalCost, caixaRecebiveisTotal, caixaContasPagarTotal], // Alterei o nome da variável para capitalGiroTotal
            backgroundColor: ['#f7740f', '#ff8f00', '#fcc36f', '#ffe9c9']
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
      <canvas id="CaixaRealPieChart" ></canvas>
    </div>
  );
};

export default CaixaRealPieChart;