import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

import Layout from '../../../components/Layout/layout';
import './FluxoDeCaixaProjetado.scss';

const FluxoDeCaixaProjetado = () => {
  const tableRef = useRef(null);

  // Gerar dinamicamente a lista de meses de 1 a 24
  const generateMonths = (numMonths) => {
    return Array.from({ length: numMonths }, (_, i) => `Mês ${i + 1}`);
  };

  const meses = generateMonths(6);  // Ajustado para 24 meses

  // Função para criar valores replicados dinamicamente
  const createDynamicValues = (value, numMonths) => {
    return Array(numMonths).fill(value);
  };

  // Mapa de valores estimados por categoria, replicados conforme os meses
  const valueMap = {
    "Estrutura Física/ Virtual": createDynamicValues(50000, meses.length),
    "Insumos": createDynamicValues(30000, meses.length),
    "Capital de Giro": createDynamicValues(20000, meses.length),
  };

  // Função para somar investimentos estimados
  const sumInvestments = () => {
    return valueMap["Estrutura Física/ Virtual"].map((value, index) => 
      value + valueMap["Insumos"][index] + valueMap["Capital de Giro"][index]
    );
  };

  const investmentSums = sumInvestments();  // Soma de investimentos

  // Função para renderizar as células de cada linha e calcular o total
  const renderCells = (item, numCells, highlight) => {
    let values = item in valueMap ? valueMap[item] : Array(numCells).fill(0);
    if (item === "INVESTIMENTOS ESTIMADOS") {
      values = investmentSums;
    }
    return values.map((value, index) => (
      <td key={index} style={{ 
        backgroundColor: highlight ? '#e6e6e6' : '', 
        fontWeight: highlight ? 'bold' : 'normal' 
      }}>
        R$ {value.toLocaleString("pt-BR")}
      </td>
    ));
  };

  const renderTable = (items, highlightItems, includeHeader = true) => (
    <div className='scrollable-table'>
      <table ref={tableRef} className='cash-flow-table'>
        {includeHeader && (
          <thead>
            <tr>
              <th>Cálculo</th>
              <th >Total</th>
              {meses.map((mes, index) => (
                <th key={index}>{mes}</th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {items.map(item => (
            <tr key={item} style={{ 
              backgroundColor: highlightItems.includes(item) ? '#e6e6e6' : '', 
              fontWeight: highlightItems.includes(item) ? 'bold' : 'normal'
            }}>
              <td>{item}</td>
              <td style={{
                fontWeight: 'normal',
                backgroundColor: highlightItems.includes(item) ? '#e6e6e6' : ''
              }}>
                R$ {(item in valueMap ? valueMap[item].reduce((a, b) => a + b, 0) : 
                     item === "INVESTIMENTOS ESTIMADOS" ? investmentSums.reduce((a, b) => a + b, 0) : 0)
                    .toLocaleString("pt-BR")}
              </td>
              {renderCells(item, meses.length, highlightItems.includes(item))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const investimentosEstimados = [
    "INVESTIMENTOS ESTIMADOS",
    "Estrutura Física/ Virtual",
    "Insumos",
    "Capital de Giro",
  ];

  const receitaBruta = [
    "RECEITA BRUTA (ESTIMADA)",
    "Estrutura Física/ Virtual",
  ];


  const despesasEstimadas = [
    "DESPESAS ESTIMADAS",
    "Estrutura Física/ Virtual",
    "Insumos",
    "Capital de Giro",
  ];

  const caixaInicial = [
    "CAIXA INICIAL: BASE MÊS 0",
    "Caixa Investimento: Estoque",
    "Caixa: Investimento Capital de Giro",
  ];

  const fluxoCaixa = [
    "FLUXO DE CAIXA",
    "Receita Operacional",
    "(-) Impostos (%)",
  ];
  
  const lucroLiquidoMensal = [
    "Lucro Líquido Mensal",
  ];
  
  const lucroLiquidoAcumulado = [
    "Lucro Líquido Acumulado",
  ];
  const caixa = [
    "CAIXA",
  ];
  
  const highlightItems = [
    "INVESTIMENTOS ESTIMADOS",
  ];

  return (
    <Layout>
      <div className='dashboard-page'>
        <div className='dashboard-content'>
          <div className='title'>
            <h1>Fluxo de Caixa Projetado</h1>
            <p>A seguir é apresentado o Fluxo de Caixa Projetado, conforme as informações inseridas sobre o seu Negócio</p>
          </div>
          <div className='table-container'>
            {renderTable(investimentosEstimados, highlightItems, true)}
            {renderTable(receitaBruta, highlightItems, false)} 
            {renderTable(despesasEstimadas, highlightItems, false)} 
            {renderTable(caixaInicial, highlightItems, false)} 
            {renderTable(fluxoCaixa, highlightItems, false)} 
            {renderTable(lucroLiquidoMensal, highlightItems, false)} 
            {renderTable(lucroLiquidoAcumulado, highlightItems, false)} 
            {renderTable(caixa, highlightItems, false)} 
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FluxoDeCaixaProjetado;
