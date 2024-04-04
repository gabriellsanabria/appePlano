import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import 'chartjs-plugin-datalabels'; // Importe o plugin

import Layout from '../../../components/Layout/layout';
import './AnaliseViabilidadePayback.scss';

const AnaliseViabilidadePayback = () => {
  const chart1Ref = useRef(null);
  const chart1Instance = useRef(null);
  const chart2Ref = useRef(null);
  const chart2Instance = useRef(null);
  const chart3Ref = useRef(null);
  const chart3Instance = useRef(null);

  useEffect(() => {
    const createDestroyChart1 = () => {
      if (chart1Instance.current !== null) {
        chart1Instance.current.destroy();
      }

      const ctx = chart1Ref.current.getContext('2d');
      chart1Instance.current = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Estrutura física/virtual', 'Insumos de produção', 'Capital de giro'],
          datasets: [{
            label: 'Investimento',
            data: [30, 25, 40],
            backgroundColor: [
              '#0066cc',
              'orange',
              'rgba(75, 192, 192, 1)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Investimento',
              fontSize: 18 
            },
            legend: {
              position: 'bottom'
            },
            plugins: {
              datalabels: {
                color: '#fff',
                formatter: (value, ctx) => {
                  let sum = ctx.dataset.data.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
                  let percentage = (value * 100 / sum).toFixed(2) + "%";
                  return percentage;
                },
                anchor: 'end',
                align: 'start'
              }
            }
          }
        }
      });
    };

    const createDestroyChart2 = () => {
      if (chart2Instance.current !== null) {
        chart2Instance.current.destroy();
      }

      const ctx = chart2Ref.current.getContext('2d');
      chart2Instance.current = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Estrutura física', 'Equipe de trabalho', 'Insumos de produção', 'Vendas'],
          datasets: [{
            label: 'Despesas Mensais',
            data: [20, 30, 25, 25],
            backgroundColor: [
              '#0066cc',
              'red',
              'orange',
              'rgba(75, 192, 192, 1)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Despesas Mensais',
              fontSize: 18 
            },
            legend: {
              position: 'bottom'
            },
            plugins: {
              datalabels: {
                color: '#fff',
                formatter: (value, ctx) => {
                  let sum = ctx.dataset.data.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
                  let percentage = (value * 100 / sum).toFixed(2) + "%";
                  return percentage;
                },
                anchor: 'end',
                align: 'start'
              }
            }
          }
        }
      });
    };

    const createDestroyChart3 = () => {
      if (chart3Instance.current !== null) {
        chart3Instance.current.destroy();
      }

      const ctx = chart3Ref.current.getContext('2d');
      chart3Instance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: Array.from({ length: 24 }, (_, i) => i + 1), 
          datasets: [
            {
              label: 'Cenário Pessimista',
              data: Array.from({ length: 24 }, (_, i) => -50000 + i * ((20000 + 50000) / 23)),
              borderColor: 'red',
              borderWidth: 2,
              fill: false
            },
            {
              label: 'Cenário Esperado',
              data: Array.from({ length: 24 }, (_, i) => -50000 + i * ((100000 + 50000) / 23)),
              borderColor: 'green',
              borderWidth: 2,
              fill: false
            },
            {
              label: 'Cenário Otimista',
              data: Array.from({ length: 24 }, (_, i) => -50000 + i * ((200000 + 50000) / 23)),
              borderColor: 'blue',
              borderWidth: 2,
              fill: false
            }
          ]          
        },
        options: {
          responsive: true,
          scales: {
            x: {
              title: {
                display: true,
                text: 'Meses'
              }
            },
            y: {
              title: {
                display: true,
                text: 'Valor (R$)'
              },
              min: -50000,
              max: 250000
            }
          },
          plugins: {
            title: {
              display: true,
              text: 'Análise de Lucro',
              fontSize: 18 
            },
            legend: {
              position: 'bottom'
            }
          }
        }
      });
    };

    createDestroyChart1();
    createDestroyChart2();
    createDestroyChart3();

    return () => {
      if (chart1Instance.current !== null) {
        chart1Instance.current.destroy();
      }
      if (chart2Instance.current !== null) {
        chart2Instance.current.destroy();
      }
      if (chart3Instance.current !== null) {
        chart3Instance.current.destroy();
      }
    };
  }, []);

  return (
    <Layout>
      <div className='dashboard-page'>
        <div className='dashboard-content'>
          <div className='title'>
            <h1>Indicadores e Viabilidade do seu Negócio</h1>
          </div>
          <div className='flex-container'>
            <div className='box'>
              <canvas ref={chart1Ref}></canvas>
            </div>
            <div className='box'>
              <canvas ref={chart2Ref}></canvas>
            </div>
          </div>
          <div className='flex-container'>
            <div className='box'>
              <div className='box-content'>
                <h3>Receita Bruta Mensal</h3>
                <p>(Média 24 meses)</p>
                <p className='valor'>R$ 168.700,00</p>
              </div>
            </div>
            <div className='box'>
              <div className='box-content'>
                <h3>Lucro Líquido Mensal (LLM)</h3>
                <p>(Média 24 meses)</p>
                <p className='valor'>R$ 67.900,00</p>
              </div>
            </div>
            <div className='box'>
              <div className='box-content'>
                <h3>Impostos Mensais Estimados</h3>
                <p>(Média 24 meses)</p>
                <p className='valor'>10%</p>
              </div>
            </div>
            <div className='box'>
              <div className='box-content'>
                <h3>Pagamento Total Estimado</h3>
                <p>(Média 24 meses)</p>
                <p className='valor'>R$ 278.800,00</p>
              </div>
            </div>
          </div>

          <div className='flex-container'>
            <div className='box'>
              <div className='box-content'>
                <h3>Despesa Mensal</h3>
                <p>(Média 24 meses)</p>
                <p className='valor'>R$ 68.800,00</p>
              </div>
            </div>
            <div className='box'>
              <div className='box-content'>
                <h3>Investimento Inicial</h3>
                <p className='valor'>R$ 228.000,00</p>
              </div>
            </div>
            <div className='box'>
              <div className='box-content'>
                <h3>Payback Esperado</h3>
                <p>(em meses)</p>
                <p className='valor'>5</p>
              </div>
            </div>
            <div className='box'>
              <div className='box-content'>
                <h3>ROI</h3>
                <p>(em 24 meses)</p>
                <p className='valor'>7,15</p>
              </div>
            </div>
          </div>

          <div className='title'>
            <h1>Tempo de Retorno do seu Investimento (Payback)</h1>
          </div>
          <div className='flex-container'>
            <div className='box'>
              <canvas ref={chart3Ref}></canvas>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AnaliseViabilidadePayback;
