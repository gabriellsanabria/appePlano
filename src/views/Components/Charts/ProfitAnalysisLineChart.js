import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import 'chartjs-plugin-datalabels';

const ProfitAnalysisLineChart = () => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        // Garanta que o elemento canvas está montado
        if (chartRef.current) {
            if (chartInstance.current !== null) {
                chartInstance.current.destroy();
            }

            const ctx = chartRef.current.getContext('2d');
            chartInstance.current = new Chart(ctx, {
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
        }

        return () => {
            if (chartInstance.current !== null) {
                chartInstance.current.destroy();
            }
        };
    }, []);

    return <canvas ref={chartRef}></canvas>;
};

export default ProfitAnalysisLineChart;
