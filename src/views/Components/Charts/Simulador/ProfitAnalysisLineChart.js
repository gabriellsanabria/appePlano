import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import 'chartjs-plugin-datalabels';
import { API_BASE_URL } from '../../../../apiConfig';

const ProfitAnalysisLineChart = () => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    const [lucroLiquidoData, setLucroLiquidoData] = useState({
        esperado: [],
        otimista: [],
        pessimista: []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const generateMonths = (numMonths) => Array.from({ length: numMonths }, (_, i) => `Mês ${i + 1}`);
    const meses = generateMonths(24);  // Lista de meses ajustada para 24 meses

    const createDynamicValues = (totalMensalProjetado, numMonths, percentages, fixedValues) => {
        const values = [];
        let totalSoFar = 0;
        for (let i = 0; i < numMonths; i++) {
            const percentage = i === 0 ? 0 : percentages[i - 1] || 0;
            let projectedRevenue;
            if (fixedValues && fixedValues[i] !== undefined && i === 0) {
                // Apply fixed value only for the first month
                projectedRevenue = fixedValues[i];
            } else {
                projectedRevenue = totalMensalProjetado * percentage;
            }
            totalSoFar += projectedRevenue;
            values.push(projectedRevenue);
        }
        return values;
    };

    useEffect(() => {
        if (chartRef.current) {
            const ctx = chartRef.current.getContext('2d');
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
                            borderColor: 'red',
                            borderWidth: 2,
                            fill: false
                        },
                        {
                            label: 'Cenário Esperado',
                            data: lucroLiquidoData.esperado,
                            borderColor: 'green',
                            borderWidth: 2,
                            fill: false
                        },
                        {
                            label: 'Cenário Otimista',
                            data: lucroLiquidoData.otimista,
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
                            min: -500000,
                            max: 1000000
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
    }, [lucroLiquidoData, meses]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
    
                const [estruturaRes, insumosRes, capitalGiroRes, receitasRes, estruturaDespesasRes, insumosDespesasRes, equipeDespesasRes] = await Promise.all([
                    fetch(`${API_BASE_URL}/api/investimentos/estrutura`),
                    fetch(`${API_BASE_URL}/api/investimentos/insumos`),
                    fetch(`${API_BASE_URL}/api/investimentos/capital-de-giro`),
                    fetch(`${API_BASE_URL}/receitas_mensais_negocio`),
                    fetch(`${API_BASE_URL}/api/despesas/estrutura`),
                    fetch(`${API_BASE_URL}/api/despesas/insumos`),
                    fetch(`${API_BASE_URL}/api/despesas/equipe`)
                ]);
    
                const [estruturaData, insumosData, capitalGiroData, receitasData, estruturaDespesasData, insumosDespesasData, equipeDespesasData] = await Promise.all([
                    estruturaRes.json(),
                    insumosRes.json(),
                    capitalGiroRes.json(),
                    receitasRes.json(),
                    estruturaDespesasRes.json(),
                    insumosDespesasRes.json(),
                    equipeDespesasRes.json()
                ]);
    
                const parseNumber = (value) => {
                    const number = parseFloat(value);
                    return isNaN(number) ? 0 : number;
                };
    
                const somaInvestimentoEstrutura = estruturaData.reduce((total, item) => total + parseNumber(item.investimento), 0);
                const somaInvestimentoInsumos = insumosData.reduce((total, item) => total + parseNumber(item.investimento), 0);
                const somaCapitalGiro = capitalGiroData.reduce((total, item) => total + parseNumber(item.investimento_total), 0);
    
                const totalRevenue = receitasData.reduce((acc, curr) => {
                    const totalIndividual = parseNumber(curr.quantidade_vendida_por_mes) * parseNumber(curr.valor_unitario);
                    return acc + totalIndividual;
                }, 0);
    
                const somaDespesasEstrutura = estruturaDespesasData.reduce((total, item) => total + parseNumber(item.custo), 0);
                const somaDespesasInsumos = insumosDespesasData.reduce((total, item) => total + parseNumber(item.custo), 0);
                const somaDespesasEquipe = equipeDespesasData.reduce((total, item) => total + parseNumber(item.custo), 0);
    
                const totalMensalProjetado = totalRevenue * 0.85; // Remover 15% do totalMensalProjetado
    
                const percentages = [0.2, 0.4, 0.6, 0.8, 1, 1, 1, 1.1, 1.1, 1.1, 1.2, 1.2, 1.2, 1.2, 1.2, 1.2, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5];
    
                const caixaInicial = somaInvestimentoInsumos + somaCapitalGiro;
    
                const investimentosEstimados = somaInvestimentoEstrutura + somaInvestimentoInsumos + somaCapitalGiro;
                const investimentosTotaisEstimados = -investimentosEstimados;
                const fixedInvestments = new Array(meses.length).fill(0);
                fixedInvestments[0] = investimentosTotaisEstimados;
    
                let receitaOperacionalValues = createDynamicValues(totalMensalProjetado, meses.length, percentages, fixedInvestments);
                receitaOperacionalValues[1] += caixaInicial;
    
                const despesasTotais = somaDespesasEstrutura + somaDespesasEquipe;
    
                receitaOperacionalValues = receitaOperacionalValues.map((value, index) => {
                    if (index === 0) {
                        return value;
                    } else {
                        return value - despesasTotais - (somaDespesasInsumos * percentages[index - 1]);
                    }
                });
    
                const calcularLucroAcumulado = (receitas) => {
                    const lucroAcumulado = [];
                    receitas.reduce((acumulado, value) => {
                        const lucro = acumulado + value;
                        lucroAcumulado.push(lucro);
                        return lucro;
                    }, 0);
                    return lucroAcumulado;
                };
    
                const receitaOperacionalFinal = calcularLucroAcumulado(receitaOperacionalValues);
    
                const receitaOperacionalOtimista = calcularLucroAcumulado(
                    receitaOperacionalValues.map((value, index) => index === 0 ? value : value * 1.1)
                );
                const receitaOperacionalPessimista = calcularLucroAcumulado(
                    receitaOperacionalValues.map((value, index) => index === 0 ? value : value * 0.9)
                );
    
                setLucroLiquidoData({
                    esperado: receitaOperacionalFinal,
                    otimista: receitaOperacionalOtimista,
                    pessimista: receitaOperacionalPessimista
                });
                setLoading(false);
            } catch (error) {
                console.error('Falha ao carregar dados:', error);
                setError('Erro ao carregar dados');
                setLoading(false);
            }
        };
    
        fetchData();
    }, []);
    
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