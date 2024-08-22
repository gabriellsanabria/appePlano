import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import 'chartjs-plugin-datalabels';
import { API_BASE_URL } from '../../../../apiConfig';
import useAuth from '../../../../hooks/useAuth';

const ProfitAnalysisLineChart = () => {     
    const { user } = useAuth();
    const userId = user ? user.uid : null;

    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    const [lucroLiquidoData, setLucroLiquidoData] = useState({
        esperado: [],
        otimista: [],
        pessimista: []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const generateMonths = (numMonths) => Array.from({ length: numMonths }, (_, i) => `Mês ${i + 0}`);
    const meses = generateMonths(25);

    const createDynamicValues = (totalMensalProjetado, numMonths, percentages, fixedValues) => {
        const values = [];
        let totalSoFar = 0;
        for (let i = 0; i < numMonths; i++) {
            const percentage = i === 0 ? 0 : percentages[i - 1] || 0;
            let projectedRevenue;
            if (fixedValues && fixedValues[i] !== undefined && i === 0) {
                projectedRevenue = fixedValues[i];
            } else {
                projectedRevenue = totalMensalProjetado * percentage;
            }
            totalSoFar += projectedRevenue;
            values.push(projectedRevenue);
        }
        return values;
    };

    const calcularLucroAcumulado = (receitas) => {
        const lucroAcumulado = [];
        receitas.reduce((acumulado, value) => {
            const lucro = acumulado + value;
            lucroAcumulado.push(lucro);
            return lucro;
        }, 0);
        return lucroAcumulado;
    };

    useEffect(() => {
        if (chartRef.current) {
            const ctx = chartRef.current.getContext('2d');
            
            // Função para calcular o valor mínimo e máximo com margem adicional
            function calculateMinMaxWithMargin(dataSets, marginRatio = 0.1) {
                const allData = dataSets.flat(); // Une todos os arrays de dados em um só
                const minValue = Math.min(...allData);
                const maxValue = Math.max(...allData);
    
                // Calcula o intervalo total e a margem
                const range = maxValue - minValue;
                const margin = range * marginRatio;
    
                return {
                    min: minValue - margin, // Adiciona margem abaixo do valor mínimo
                    max: maxValue + margin  // Adiciona margem acima do valor máximo
                };
            }
    
            // Calcular valores mínimos e máximos para cada cenário com margem
            const dataSets = [
                lucroLiquidoData.pessimista,
                lucroLiquidoData.esperado,
                lucroLiquidoData.otimista
            ];
            
            // Definir a margem adicional como 10% do intervalo total dos dados
            const { min, max } = calculateMinMaxWithMargin(dataSets, 0.1);
    
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
    
            chartInstance.current = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: meses,
                    datasets: [
                        {
                            label: 'Cenário Pessimista',
                            data: lucroLiquidoData.pessimista,
                            borderColor: '#F8B4B4',
                            borderWidth: 6, // Engrossar a linha
                            fill: false,
                            tension: 0.6 // Suaviza a linha com um valor entre 0 e 1
                        },
                        {
                            label: 'Cenário Esperado',
                            data: lucroLiquidoData.esperado,
                            borderColor: '#A3C2E7',
                            borderWidth: 6, // Engrossar a linha
                            fill: false,
                            tension: 0.6 // Suaviza a linha com um valor entre 0 e 1
                        },
                        {
                            label: 'Cenário Otimista',
                            data: lucroLiquidoData.otimista,
                            borderColor: '#77C9A2',
                            borderWidth: 6, // Engrossar a linha
                            fill: false,
                            tension: 0.6 // Suaviza a linha com um valor entre 0 e 1
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
                            },
                            grid: {
                                display: false // Remove as grades do eixo X
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Valor (R$)'
                            },
                            min: min, // Valor mínimo calculado com margem
                            max: max, // Valor máximo calculado com margem
                            grid: {
                                display: false // Remove as grades do eixo Y
                            }
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
                        },
                        tooltip: {
                            callbacks: {
                                title: function(tooltipItems) {
                                    return tooltipItems[0].label;
                                },
                                label: function(tooltipItem) {
                                    // Formata o valor como moeda brasileira (R$)
                                    const valorFormatado = tooltipItem.raw.toLocaleString('pt-BR', {
                                        style: 'currency',
                                        currency: 'BRL'
                                    });
                                    return tooltipItem.dataset.label + ': ' + valorFormatado;
                                }
                            },
                            bodyFont: {
                                size: 16 // Aumenta o tamanho da fonte do corpo do tooltip
                            },
                            titleFont: {
                                size: 18 // Aumenta o tamanho da fonte do título do tooltip
                            },
                            padding: 10, // Adiciona padding ao tooltip
                            backgroundColor: '#e6e6e6', // Cor de fundo azul
                            titleColor: 'black', // Cor do texto do título
                            bodyColor: 'black' // Cor do texto do corpo
                        }
                    }
                }
            });
    
            // Adicionar CSS para cursor pointer
            chartRef.current.style.cursor = 'pointer';
        }
    }, [lucroLiquidoData, meses]);
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                const [caixaLiquidoResponse, caixaEstoque, caixaRecebiveis, caixaContasPagar, receitasRes, estruturaDespesasRes, insumosDespesasRes, equipeDespesasRes] = await Promise.all([
                    fetch(`${API_BASE_URL}/api/caixa/liquido/user/${userId}`),
                    fetch(`${API_BASE_URL}/api/caixa/estoque/user/${userId}`),
                    fetch(`${API_BASE_URL}/api/caixa/recebiveis/user/${userId}`),
                    fetch(`${API_BASE_URL}/api/caixa/contas_pagar/user/${userId}`),
                    fetch(`${API_BASE_URL}/api/simulador/receitas_mensais_negocio/user/${userId}`),
                    fetch(`${API_BASE_URL}/api/simulador/despesas/estrutura/user/${userId}`),
                    fetch(`${API_BASE_URL}/api/simulador/despesas/insumos/user/${userId}`),
                    fetch(`${API_BASE_URL}/api/simulador/despesas/equipe/user/${userId}`)
                ]);

                const [caixaLiquidoData, caixaEstoqueData, caixaRecebiveisData, caixaContasPagarData, receitasData, estruturaDespesasData, insumosDespesasData, equipeDespesasData] = await Promise.all([
                    caixaLiquidoResponse.json(),
                    caixaEstoque.json(),
                    caixaRecebiveis.json(),
                    caixaContasPagar.json(),
                    receitasRes.json(),
                    estruturaDespesasRes.json(),
                    insumosDespesasRes.json(),
                    equipeDespesasRes.json()
                ]);

                const parseNumber = (value) => {
                    const number = parseFloat(value);
                    return isNaN(number) ? 0 : number;
                };

                const caixaLiquidoTotalCost = caixaLiquidoData.reduce((total, item) => total + parseFloat(item.valor), 0);
                const caixaEstoqueTotalCost = caixaEstoqueData.reduce((total, item) => total + parseFloat(item.valor), 0);
                const caixaRecebiveisTotal = caixaRecebiveisData.reduce((total, item) => total + parseFloat(item.valor), 0);
                const caixaContasPagarTotal = caixaContasPagarData.reduce((total, item) => total + parseFloat(item.valor), 0);

                const totalRevenue = receitasData.reduce((acc, curr) => {
                    const totalIndividual = parseNumber(curr.quantidade_vendida_por_mes) * parseNumber(curr.valor_unitario);
                    return acc + totalIndividual;
                }, 0);

                const somaDespesasEstrutura = estruturaDespesasData.reduce((total, item) => total + parseNumber(item.custo), 0);
                const somaDespesasInsumos = insumosDespesasData.reduce((total, item) => total + parseNumber(item.custo), 0);
                const somaDespesasEquipe = equipeDespesasData.reduce((total, item) => total + parseNumber(item.custo), 0);

                const totalMensalProjetado = totalRevenue * 0.85;

                const percentages1 = [0.2, 0.4, 0.6, 0.8, 1, 1, 1, 1.1, 1.1, 1.1, 1.2, 1.2, 1.2, 1.2, 1.2, 1.2, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5];
                const percentages = percentages1.map(() => 1);

                const caixaInicial = (caixaLiquidoTotalCost + caixaEstoqueTotalCost + caixaRecebiveisTotal) - caixaContasPagarTotal;

                const caixaEstimados = caixaLiquidoTotalCost + caixaEstoqueTotalCost + caixaRecebiveisTotal - caixaContasPagarTotal;
                const fixedInvestments = new Array(meses.length).fill(0);
                fixedInvestments[0] = 0;

                // Calcula o cenário esperado
                let receitaOperacionalEsperado = createDynamicValues(totalMensalProjetado, meses.length, percentages);
                receitaOperacionalEsperado[1] += caixaInicial;
                const despesasTotais = somaDespesasEstrutura + somaDespesasEquipe;
                receitaOperacionalEsperado = receitaOperacionalEsperado.map((value, index) => {
                    if (index === 0) {
                        return value;
                    } else {
                        return value - despesasTotais - (somaDespesasInsumos * percentages[index - 1]);
                    }
                });

                // Calcula o cenário otimista com fator 1.2
                const totalMensalProjetadoOtimista = totalMensalProjetado * 1.2;
                let receitaOperacionalOtimista = createDynamicValues(totalMensalProjetadoOtimista, meses.length, percentages);
                receitaOperacionalOtimista[1] += caixaInicial;
                receitaOperacionalOtimista = receitaOperacionalOtimista.map((value, index) => {
                    if (index === 0) {
                        return value;
                    } else {
                        return value - despesasTotais - (somaDespesasInsumos * percentages[index - 1]);
                    }
                });

                // Calcula o cenário pessimista com fator 0.8
                const totalMensalProjetadoPessimista = totalMensalProjetado * 0.8;
                let receitaOperacionalPessimista = createDynamicValues(totalMensalProjetadoPessimista, meses.length, percentages);
                receitaOperacionalPessimista[1] += caixaInicial;
                receitaOperacionalPessimista = receitaOperacionalPessimista.map((value, index) => {
                    if (index === 0) {
                        return value;
                    } else {
                        return value - despesasTotais - (somaDespesasInsumos * percentages[index - 1]);
                    }
                });

                // Calcula lucro acumulado para os três cenários
                const lucroLiquidoEsperado = calcularLucroAcumulado(receitaOperacionalEsperado);
                const lucroLiquidoOtimista = calcularLucroAcumulado(receitaOperacionalOtimista);
                const lucroLiquidoPessimista = calcularLucroAcumulado(receitaOperacionalPessimista);

                setLucroLiquidoData({
                    esperado: lucroLiquidoEsperado,
                    otimista: lucroLiquidoOtimista,
                    pessimista: lucroLiquidoPessimista
                });
                setLoading(false);
            } catch (error) {
                console.error('Falha ao carregar dados:', error);
                setError('Sem dados até o momento');
                setLoading(false);
            }
        };

        if (userId) {
            fetchData();
        }
    }, [userId]);

    return (
        <div className='groupLine'>
            {loading ? (
                <div>Carregando...</div>
            ) : error ? (
                <div>{error}</div>
            ) : (
                <>
                    <canvas ref={chartRef}></canvas>
                    {/* <div className='table'>
                        <div className='row'>
                            <div className='cellCol items-color'>LUCRO LÍQUIDO ACUMULADO</div>
                            {lucroLiquidoData.esperado.map((value, index) => (
                                <div key={index} className='cell' style={{ fontWeight: 'bold' }}>
                                    R$ {value.toLocaleString("pt-BR")}
                                </div>
                            ))}
                        </div>
                        <div className='row'>
                            <div className='cellCol items-color'>LUCRO LÍQUIDO Otimista</div>
                            {lucroLiquidoData.otimista.map((value, index) => (
                                <div key={index} className='cell' style={{ fontWeight: 'bold' }}>
                                    R$ {value.toLocaleString("pt-BR")}
                                </div>
                            ))}
                        </div>
                        <div className='row'>
                            <div className='cellCol items-color'>LUCRO LÍQUIDO Pessimista</div>
                            {lucroLiquidoData.pessimista.map((value, index) => (
                                <div key={index} className='cell' style={{ fontWeight: 'bold' }}>
                                    R$ {value.toLocaleString("pt-BR")}
                                </div>
                            ))}
                        </div>
                    </div> */}
                </>
            )}
        </div>
    );
};

export default ProfitAnalysisLineChart;
