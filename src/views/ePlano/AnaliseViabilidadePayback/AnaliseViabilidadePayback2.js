import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import 'chartjs-plugin-datalabels'; // Importe o plugin

import Layout from '../../../components/Layout/layout';
import './AnaliseViabilidadePayback.scss';

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
      <div className='dashboard-page'>
        <div className='dashboard-content'>
          <div className='flex-container'>
            <div className='box'>
              <InvestmentsPieChart/>
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
                <h3>Impostos</h3>
                <p>(Estimativa Mensal)</p>
                {/* <p className='valor'><EstimatedMonthlyTaxes /></p> */}
                <h2>15%</h2>
              </div>
            </div>
            <div className='box'>
              <div className='box-content'>
                <h3>Lucro Líquido Acumulado</h3>
                <p>(Somatório 24 meses)</p>
                <p className='valor'>
                  <TotalEstimatedPayments meses={meses} />                  
                </p>
              </div>
            </div>
          </div>

          <div className='flex-container'>
            <div className='box'>
              <div className='box-content'>
                <h3>Despesa Mensal</h3>
                <p>(Média 24 meses)</p>
                <p className='valor'><MonthlyExpenses meses={meses} /></p>
              </div>
            </div>
            <div className='box'>
              <div className='box-content'>
                <h3>Investimento Inicial</h3>
                <p>(Mês 0)</p>
                <p className='valor'><InitialInvestment /></p>
              </div>
            </div>
            <div className='box'>
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
            </div>
          </div>

          <div className='title'>
            <h1>Tempo de Retorno do seu Investimento (Payback)</h1>
          </div>
          <div className='flex-container'>
            <div className='box'>
              <ProfitAnalysisLineChart />
            </div>
          </div>
        </div>
      </div>
  );
};

export default AnaliseViabilidadePayback;
