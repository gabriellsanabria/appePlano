import React, { useState,useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Chart from 'chart.js/auto';
import 'chartjs-plugin-datalabels'; // Importe o plugin

import Layout from '../../../components/Layout/layout';
import './AnaliseViabilidadePayback3.scss';
import { API_BASE_URL, API_BASE_URL_AMPLIFY } from '../../../apiConfig';

import GrossMonthlyRevenue from '../../Components/FinancialIndicators/Simulador/GrossMonthlyRevenue';
import NetMonthlyProfit from '../../Components/FinancialIndicators/Simulador/NetMonthlyProfit';
import EstimatedMonthlyTaxes from '../../Components/FinancialIndicators/Simulador/EstimatedMonthlyTaxes';
import TotalEstimatedPayments from '../../Components/FinancialIndicators/TotalEstimatedPayments';
import MonthlyExpenses from '../../Components/FinancialIndicators/MonthlyExpenses';
import InitialInvestment from '../../Components/FinancialIndicators/InitialInvestment';
import ExpectedPayback from '../../Components/FinancialIndicators/ExpectedPayback';
import ReturnOnInvestment from '../../Components/FinancialIndicators/ReturnOnInvestment';
import PieChartComponent from '../../Components/Charts/Simulador/PieChartComponent';
import InvestmentsPieChart from '../../Components/Charts/Simulador/InvestmentsPieChart';
import ProfitAnalysisLineChart from '../../Components/Charts/Simulador/ProfitAnalysisLineChart';
import LucroLiquidoAcumuladoTotal from '../FluxoDeCaixaProjetado/Components/LucroLiquidoAcumuladoTotal';
import CaixaReal from '../../Components/FinancialIndicators/Simulador/CaixaReal';
import LucroLAEsperado from '../../Components/FinancialIndicators/Simulador/LucroLAEsperado';
import LucroLAOtimista from '../../Components/FinancialIndicators/Simulador/LucroLAOtimista';
import LucroLAPessimista from '../../Components/FinancialIndicators/Simulador/LucroLAPessimista';

const AnaliseViabilidadePayback = () => {
  const [insumosCost, setInsumosCost] = useState(0);
  const [estruturaCost, setEstruturaCost] = useState(0);
  const [capitalGiro, setCapitalGiro] = useState(0); // Alterei o nome da variável para capitalGiro
  const [contasPagar, setcaixaContasPagarTotal] = useState(0);
  

  useEffect(() => {
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
  
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const [despesasInsumosCost, setDespesasInsumosCost] = useState(0);
  const [despesasEstruturaCost, setDespesasEstruturaCost] = useState(0);
  const [despesasCapitalGiro, setDespesasCapitalGiro] = useState(0); 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [insumosDespesasResponse, estruturaDespesasResponse, capitalGiroDespesasResponse] = await Promise.all([
          fetch(`${API_BASE_URL}/api/despesas/insumos`),
          fetch(`${API_BASE_URL}/api/despesas/estrutura`),
          fetch(`${API_BASE_URL}/api/despesas/equipe`)
        ]);
  
        const [insumosDespesasData, estruturaDespesasData, capitalGiroDespesasData] = await Promise.all([
          insumosDespesasResponse.json(),
          estruturaDespesasResponse.json(),
          capitalGiroDespesasResponse.json()
        ]);
  
        // Calcula a soma total dos custos para cada categoria
        const insumosDespesasTotalCost = insumosDespesasData.reduce((total, item) => total + parseFloat(item.custo), 0);
        const estruturaDespesasTotalCost = estruturaDespesasData.reduce((total, item) => total + parseFloat(item.custo), 0);
        const capitalGiroDespesasTotal = capitalGiroDespesasData.reduce((total, item) => total + parseFloat(item.custo), 0);
  
        // Define os custos totais nos estados correspondentes
        setDespesasInsumosCost(insumosDespesasTotalCost);
        setDespesasEstruturaCost(estruturaDespesasTotalCost);
        setDespesasCapitalGiro(capitalGiroDespesasTotal);
  
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
  

  // Função para gerar a lista de meses
  const generateMonths = (numMonths) => Array.from({ length: numMonths }, (_, i) => `Mês ${i + 0}`);
  const meses = generateMonths(25);  // Lista de meses ajustada para 24 meses
  return (
      <div className='dashboard-pge'>
        <div className='dashboard-cntent'>
          
          <div className='chartStage'>          
            <div className='chart-container'>
            {insumosCost === 0 && estruturaCost === 0 && capitalGiro === 0 ? (
              <>
                <h2>
                  Investimentos Estimados
                </h2>              
                <p>Você ainda não estimou os investimentos. </p>
                <Link to='/planejador-financeiro/estimar-investimento'>Clique aqui para estimar investimentos</Link>
              </>
              ) : (
                <>
                <h2>
                  <Link to='/planejador-financeiro/estimar-investimento'>Caixa Real Hoje</Link>
                </h2>
                <div className='chartBox'>
                  <div className='ochart'>
                    <InvestmentsPieChart/>
                  </div>
                  <div className='label-box'>
                      <div className='label-chart'>
                        <div className='barraCor lj1'></div>
                        <div className='infos'>
                          <div className='ttl'>
                            Caixa Líquido
                          </div>
                          <div className='valores'>
                            R$ {insumosCost.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </div>
                        </div>
                      </div>
                      <div className='label-chart'>
                        <div className='barraCor lj2'></div>
                        <div className='infos'>
                          <div className='ttl'>
                            Estoque
                          </div>
                          <div className='valores'>
                            R$ {estruturaCost.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </div>
                        </div>
                      </div>
                      <div className='label-chart'>
                        <div className='barraCor lj3'></div>
                        <div className='infos'>
                          <div className='ttl'>
                            Recebíveis
                          </div>
                          <div className='valores'>
                            R$ {capitalGiro.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </div>
                        </div>
                      </div>
                      <div className='label-chart'>
                        <div className='barraCor lj4'></div>
                        <div className='infos'>
                          <div className='ttl'>
                            Contas a Pagar
                          </div>
                          <div className='valores'>
                            R$ {capitalGiro.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </div>
                        </div>
                      </div>
                  </div>
                </div>
                </>
              )}
              
            </div>  

            <div className='chart-container'>
            {despesasInsumosCost === 0 && despesasEstruturaCost === 0 && despesasCapitalGiro === 0 ? (
              <>
                <h2>
                  Despesas Mensais Estimadas
                </h2>              
                <p>Você ainda não estimou as despesas. </p>
                <Link to='/planejador-financeiro/estimar-despesas'>Clique aqui para estimar despesas</Link>
              </>
              ) : (
              <>
                <h2>
                  <Link to='/planejador-financeiro/estimar-despesas'>Despesas Mensais Estimadas</Link>
                </h2>
                <div className='chartBox'>
                  <div className='ochart'>
                    <PieChartComponent/>
                  </div>
                  <div className='label-box'>
                      <div className='label-chart'>
                        <div className='barraCor lj1'></div>
                        <div className='infos'>
                          <div className='ttl'>
                            Insumos
                          </div>
                          <div className='valores'>
                            R$ {despesasInsumosCost.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </div>
                        </div>
                      </div>
                      <div className='label-chart'>
                        <div className='barraCor lj2'></div>
                        <div className='infos'>
                          <div className='ttl'>
                            Estrutura
                          </div>
                          <div className='valores'>
                            R$ {despesasEstruturaCost.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </div>
                        </div>
                      </div>
                      <div className='label-chart'>
                        <div className='barraCor lj3'></div>
                        <div className='infos'>
                          <div className='ttl'>
                            Capital de Giro
                          </div>
                          <div className='valores'>
                            R$ {despesasCapitalGiro.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </div>
                        </div>
                      </div>
                  </div>
                </div>
              </>              
            )}
            </div>
          </div>          

          <div className='flex-contain'>
            <div className='indicador'>
              <div className='indicador-content'>
                <h3>Receita Bruta Mensal</h3>
                <p>(Média 24 meses)</p>
                <p className='valor'><GrossMonthlyRevenue /></p>
              </div>
            </div>
            <div className='indicador'>
              <div className='indicador-content'>
                <h3>Lucro Líquido Mensal (LLM)</h3>
                <p>(Média 24 meses)</p>
                <p className='valor'><NetMonthlyProfit meses={meses}/></p>
              </div>
            </div>
            <div className='indicador'>
              <div className='indicador-content'>
                <h3>Caixa Real Hoje</h3>
                <p>(Mês 1;$ Mensal)</p>
                <p className='valor'><CaixaReal meses={meses}/></p> 
              </div>
            </div>
            <div className='indicador'>
              <div className='indicador-content'>
                <h3>Impostos</h3>
                <p>(Estimativa Mensal)</p>
                <p className='valor'><EstimatedMonthlyTaxes /></p>  
              </div>
            </div>
            <div className='indicador'>
              <div className='indicador-content'>
                <h3>Despesa Mensal</h3>
                <p>(Média 24 meses)</p>
                <p className='valor'><MonthlyExpenses meses={meses} /></p>
              </div>
            </div>
            <div className='indicador'>
              <div className='indicador-content'>
              <h3>Lucro Líquido Acumulado Esperado</h3>
                <p>(Somatório 24 meses)</p>
                <p className='valor'>
                  <LucroLAEsperado meses={meses} />                  
                </p>
              </div>
            </div>
            <div className='indicador'>
              <div className='indicador-content'>
                <h3>Lucro Líquido Acumulado Otimista</h3>
                <p>(Somatório 24 meses)</p>
                <p className='valor'>
                  <LucroLAOtimista meses={meses} />                  
                </p>
              </div>
            </div>
            <div className='indicador'>
              <div className='indicador-content'>
                <h3>Lucro Líquido Acumulado Pessimista</h3>
                <p>(Somatório 24 meses)</p>
                <p className='valor'>
                  <LucroLAPessimista meses={meses} />                  
                </p>
              </div>
            </div>
          </div>

          <div className=''>
            <h1>Tempo de Retorno do seu Investimento (Payback)</h1>
          </div>
          <div className=''>
            <div className=''>
              <ProfitAnalysisLineChart />
            </div>
          </div>
        </div>
      </div>
  );
};

export default AnaliseViabilidadePayback;
