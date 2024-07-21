import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import 'chartjs-plugin-datalabels'; // Importe o plugin

import Layout from '../../../components/Layout/layout';
import './AnaliseViabilidadePayback2.scss';

import GrossMonthlyRevenue from '../../Components/FinancialIndicators/GrossMonthlyRevenue';
import NetMonthlyProfit from '../../Components/FinancialIndicators/NetMonthlyProfit';
import EstimatedMonthlyTaxes from '../../Components/FinancialIndicators/EstimatedMonthlyTaxes';
import TotalEstimatedPayments from '../../Components/FinancialIndicators/TotalEstimatedPayments';
import MonthlyExpenses from '../../Components/FinancialIndicators/MonthlyExpenses';
import InitialInvestment from '../../Components/FinancialIndicators/InitialInvestment';
import ExpectedPayback from '../../Components/FinancialIndicators/ExpectedPayback';
import ReturnOnInvestment from '../../Components/FinancialIndicators/ReturnOnInvestment';
import PieChartComponent from '../../Components/Charts/PieChartComponent';
import InvestmentsPieChart from '../../Components/Charts/InvestmentsPieChart';
import ProfitAnalysisLineChart from '../../Components/Charts/ProfitAnalysisLineChart';
import LucroLiquidoAcumuladoTotal from '../FluxoDeCaixaProjetado/Components/LucroLiquidoAcumuladoTotal';



const AnaliseViabilidadePayback = () => {
  
  // Função para gerar a lista de meses
  const generateMonths = (numMonths) => Array.from({ length: numMonths }, (_, i) => `Mês ${i + 0}`);
  const meses = generateMonths(25);  // Lista de meses ajustada para 24 meses
  return (
      <div className='dashboard-pge'>
        <div className='dashboard-cntent'>
          
          <div className='chartStage'>          
            <div className='chart-container'>
              <h2>
                Investimentos Totais
              </h2>
              <div className='chartBox'>
                <div className='ochart'>
                  <InvestmentsPieChart/>
                </div>
                <div className='label-box'>
                    <div className='label-chart'>
                      <div className='barraCor azul1'></div>
                      <div className='infos'>
                        <div className='ttl'>
                          Insumos
                        </div>
                        <div className='valores'>
                          R$ 130.000,00
                        </div>
                      </div>
                    </div>
                    <div className='label-chart'>
                      <div className='barraCor azul3'></div>
                      <div className='infos'>
                        <div className='ttl'>
                          Estrutura
                        </div>
                        <div className='valores'>
                          R$ 130.000,00
                        </div>
                      </div>
                    </div>
                    <div className='label-chart'>
                      <div className='barraCor azul3'></div>
                      <div className='infos'>
                        <div className='ttl'>
                          Capital de Giro
                        </div>
                        <div className='valores'>
                          R$ 130.000,00
                        </div>
                      </div>
                    </div>
                </div>
              </div>
            </div>  

            <div className='chart-container'>
              <h2>
                Despesas Mensais
              </h2>
              <div className='chartBox'>
                <div className='ochart'>
                  <PieChartComponent/>
                </div>

                <div className='label-box'>
                    <div className='label-chart'>
                      <div className='barraCor azul1'></div>
                      <div className='infos'>
                        <div className='ttl'>
                          Insumos
                        </div>
                        <div className='valores'>
                          R$ 130.000,00
                        </div>
                      </div>
                    </div>
                    <div className='label-chart'>
                      <div className='barraCor azul3'></div>
                      <div className='infos'>
                        <div className='ttl'>
                          Estrutura
                        </div>
                        <div className='valores'>
                          R$ 130.000,00
                        </div>
                      </div>
                    </div>
                    <div className='label-chart'>
                      <div className='barraCor azul3'></div>
                      <div className='infos'>
                        <div className='ttl'>
                          Equipe
                        </div>
                        <div className='valores'>
                          R$ 130.000,00
                        </div>
                      </div>
                    </div>
                </div>
              </div>
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
                <h3>Impostos</h3>
                <p>(Estimativa Mensal)</p>
                <p className='valor'>
                  15%
                </p>
              </div>
            </div>
            <div className='indicador'>
              <div className='indicador-content'>
                <h3>Lucro Líquido Acumulado</h3>
                <p>(Somatório 24 meses)</p>
                <p className='valor'>
                  <TotalEstimatedPayments meses={meses} />                  
                </p>
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
                <h3>Investimento Inicial</h3>
                <p>(Mês 0)</p>
                <p className='valor'><InitialInvestment /></p>
              </div>
            </div>
            <div className='indicador'>
              <div className='indicador-content'>
                <h3>Payback Esperado</h3>
                <p>(Fluxo projetado esperado)</p>
                <p className='valor'><ExpectedPayback /></p>
              </div>
            </div>
            <div className='indicador'>
              <div className='indicador-content'>
                <h3>ROI</h3>
                <p>(24 meses)</p>
                <p className='valor'><ReturnOnInvestment /></p>
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
