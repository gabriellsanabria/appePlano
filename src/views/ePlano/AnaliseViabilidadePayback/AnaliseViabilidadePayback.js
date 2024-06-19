import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import 'chartjs-plugin-datalabels'; // Importe o plugin

import Layout from '../../../components/Layout/layout';
import './AnaliseViabilidadePayback.scss';

import GrossMonthlyRevenue from '../../Components/FinancialIndicators/GrossMonthlyRevenue';
import NetMonthlyProfit from '../../Components/FinancialIndicators/NetMonthlyProfit';
import EstimatedMonthlyTaxes from '../../Components/FinancialIndicators/EstimatedMonthlyTaxes';
import TotalEstimatedPayments from '../../Components/FinancialIndicators/LucroLAEsperado';
import MonthlyExpenses from '../../Components/FinancialIndicators/MonthlyExpenses';
import InitialInvestment from '../../Components/FinancialIndicators/InitialInvestment';
import ExpectedPayback from '../../Components/FinancialIndicators/ExpectedPayback';
import ReturnOnInvestment from '../../Components/FinancialIndicators/ReturnOnInvestment';
import PieChartComponent from '../../Components/Charts/PieChartComponent';
import CaixaRealPieChart from '../../Components/Charts/CaixaRealPieChart';
import CaixaReal from '../../Components/FinancialIndicators/CaixaReal';
import ProfitAnalysisLineChart from '../../Components/Charts/ProfitAnalysisLineChart';
import LucroLiquidoAcumuladoTotal from '../../ePlano/FluxoDeCaixaProjetado/Components/LucroLiquidoAcumuladoTotal';
import LucroLAEsperado from '../../Components/FinancialIndicators/LucroLAEsperado';
import LucroLAOtimista from '../../Components/FinancialIndicators/LucroLAOtimista';
import LucroLAPessimista from '../../Components/FinancialIndicators/LucroLAPessimista';



const AnaliseViabilidadePayback = () => {
  
  // Função para gerar a lista de meses
  const generateMonths = (numMonths) => Array.from({ length: numMonths }, (_, i) => `Mês ${i + 0}`);
  const meses = generateMonths(25);  // Lista de meses ajustada para 24 meses
  return (
    <Layout>
      <div className='dashboard-page'>
        <div className='dashboard-content'>
          <div className='title'>
            <h1>Indicadores e Viabilidade do seu Negócio</h1>
          </div>
          <div className='texts'>
            <p>Painel de Indicadores do seu ePlano Financeiro</p>
          </div>
          <div className='flex-container'>
            <div className='box'>
              <CaixaRealPieChart/>
            </div>
            <div className='box'>
              <PieChartComponent/>
            </div>
          </div>
          <div className='flex-container'>
            <div className='box'>
              <div className='box-content'>
                <h3>Receita Bruta Mensal</h3>
                <p>(Média 24 meses)</p>
                <p className='valor'><GrossMonthlyRevenue /></p>
              </div>
            </div>
            <div className='box'>
              <div className='box-content'>
                <h3>Lucro Líquido Mensal (LLM)</h3>
                <p>(Média 24 meses)</p>
                <p className='valor'><NetMonthlyProfit meses={meses}/></p>
              </div>
            </div>
            <div className='box'>
              <div className='box-content'>
                <h3>Caixa Real Hoje</h3>
                <p>(Mês 1;$ Mensal)</p>
                <p className='valor'><CaixaReal meses={meses}/></p>                
              </div>
            </div>
            <div className='box'>
              <div className='box-content'>
                <h3>Impostos</h3>
                <p>(Estimativa Mensal)</p>
                <p className='valor'><EstimatedMonthlyTaxes /></p>                
              </div>
            </div>
            {/* <div className='box'>
              <div className='box-content'>
                <h3>Lucro Líquido Acumulado</h3>
                <p>(Somatório 24 meses)</p>
                <p className='valor'>
                  <TotalEstimatedPayments meses={meses} />                  
                </p>
              </div>
            </div> */}
          </div>

          <div className='flex-container'>
            <div className='box'>
              <div className='box-content'>
                <h3>Despesa Mensal</h3>
                <p>(Média 24 meses)</p>
                <p className='valor'><MonthlyExpenses meses={meses} /></p>
              </div>
            </div>
            {/* <div className='box'>
              <div className='box-content'>
                <h3>Investimento Inicial</h3>
                <p>(Mês 0)</p>
                <p className='valor'><InitialInvestment /></p>
              </div>
            </div> */}
            <div className='box blue'>
              <div className='box-content'>
                <h3>Lucro Líquido Acumulado Esperado</h3>
                <p>(Somatório 24 meses)</p>
                <p className='valor'>
                  <LucroLAEsperado meses={meses} />                  
                </p>
              </div>
            </div>
            
            <div className='box green'>
              <div className='box-content'>
                <h3>Lucro Líquido Acumulado Otimista</h3>
                <p>(Somatório 24 meses)</p>
                <p className='valor'>
                  <LucroLAOtimista meses={meses} />                  
                </p>
              </div>
            </div>
            
            <div className='box red'>
              <div className='box-content'>
                <h3>Lucro Líquido Acumulado Pessimista</h3>
                <p>(Somatório 24 meses)</p>
                <p className='valor'>
                  <LucroLAPessimista meses={meses} />                  
                </p>
              </div>
            </div>
            {/* <div className='box'>
              <div className='box-content'>
                <h3>Payback Esperado</h3>
                <p>(Fluxo projetado esperado)</p>
                <p className='valor'><ExpectedPayback /></p>
              </div>
            </div>
            <div className='box'>
              <div className='box-content'>
                <h3>ROI</h3>
                <p>(24 meses)</p>
                <p className='valor'><ReturnOnInvestment /></p>
              </div>
            </div> */}
          </div>

          <div className='title'>
            <h1>Resultado Operacional Acumulado (Projeções Estimadas do Negócio)</h1>
          </div>
          <div className='flex-container'>
            <div className='box'>
              <ProfitAnalysisLineChart />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AnaliseViabilidadePayback;
