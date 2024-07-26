import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import 'chartjs-plugin-datalabels'; // Importe o plugin
import { API_BASE_URL, API_BASE_URL_AMPLIFY } from '../../../../apiConfig';

const PieChartComponent = () => {
  const [chart, setChart] = useState(null);
  const [insumosCost, setInsumosCost] = useState(0);
  const [estruturaCost, setEstruturaCost] = useState(0);
  const [equipeCost, setEquipeCost] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [insumosResponse, estruturaResponse, equipeResponse] = await Promise.all([        
        fetch(`${API_BASE_URL}/api/despesas/insumos`),
        fetch(`${API_BASE_URL}/api/despesas/estrutura`),
        fetch(`${API_BASE_URL}/api/despesas/equipe`)
      ]);

      const [insumosData, estruturaData, equipeData] = await Promise.all([
        insumosResponse.json(),
        estruturaResponse.json(),
        equipeResponse.json()
      ]);

      // Calcula a soma total dos custos para cada categoria
      const insumosTotalCost = insumosData.reduce((total, item) => total + parseFloat(item.custo), 0);
      const estruturaTotalCost = estruturaData.reduce((total, item) => total + parseFloat(item.custo), 0);
      const equipeTotalCost = equipeData.reduce((total, item) => total + parseFloat(item.custo), 0);

      // Define os custos totais nos estados correspondentes
      setInsumosCost(insumosTotalCost);
      setEstruturaCost(estruturaTotalCost);
      setEquipeCost(equipeTotalCost);

      // Renderiza o gráfico com os custos totais
      renderChart(insumosTotalCost, estruturaTotalCost, equipeTotalCost);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const renderChart = (insumosTotalCost, estruturaTotalCost, equipeTotalCost) => {
    const ctx = document.getElementById('pieChart');

    if (chart !== null) {
      chart.destroy();
    }

    setChart(
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          datasets: [{
            data: [insumosTotalCost, estruturaTotalCost, equipeTotalCost],
            backgroundColor: ['#f7740f', '#ff8f00', '#fcc36f']
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
              }
            }
          }
        }
      })
    );
  };

  return (
    <div>
      <canvas id="pieChart"></canvas>
    </div>
  );
};

export default PieChartComponent;
