import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import 'chartjs-plugin-datalabels'; // Importe o plugin
import { API_BASE_URL, API_BASE_URL_AMPLIFY } from '../../../apiConfig';

const CaixaRealPieChart = () => {
  const [chart, setChart] = useState(null);
  const [insumosCost, setInsumosCost] = useState(0);
  const [estruturaCost, setEstruturaCost] = useState(0);
  const [capitalGiro, setCapitalGiro] = useState(0);  
  const [contasPagar, setcaixaContasPagarTotal] = useState(0);
  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [caixaLiquidoResponse, caixaEstoque, caixaRecebiveis, caixaContasPagar] = await Promise.all([
        fetch(`${API_BASE_URL}/api/caixa/liquido`),
        fetch(`${API_BASE_URL}/api/caixa/estoque`),
        fetch(`${API_BASE_URL}/api/caixa/recebiveis`),
        fetch(`${API_BASE_URL}/api/caixa/contas_pagar`)
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
        type: 'pie',
        data: {
          labels: ['Caixa Líquido', 'Caixa Estoque', 'Caixa Recebíveis', 'Caixa Contas a Pagar'], // Alterei o nome da categoria para Capital de Giro
          datasets: [{
            data: [caixaLiquidoTotalCost, caixaEstoqueTotalCost, caixaRecebiveisTotal, caixaContasPagarTotal], // Alterei o nome da variável para capitalGiroTotal
            backgroundColor: ['#0088FE', '#00C49F', '#FFBB28', '#F00000']
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
