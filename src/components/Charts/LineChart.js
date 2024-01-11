import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import './LineChart.scss';

// Registrar os módulos necessários
Chart.register(...registerables);

const LineChart = ({ data }) => {
  const options = {
    scales: {
      x: {
        grid: {
          display: false, // Desabilita as grades do eixo y
        },
      },
    },
    elements: {
      line: {
        tension: 0.4,
      },
    },
    plugins: {
        legend: {
          display: false,
          position: 'top',
          labels: {
            font: {
              size: 14,
            },
            color: 'black',
          },
          boxWidth: 20, // Largura da borda da legenda
          borderWidth: 1, // Largura da borda da legenda
          padding: 10, // Espaçamento interno da borda da legenda
        },
      },
    };

  return (
    <div className="line-chart">
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
