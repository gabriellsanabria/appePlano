import React, { useState, useEffect } from 'react';
import { API_BASE_URL, API_BASE_URL_AMPLIFY } from '../../../apiConfig';

const MonthlyExpenses = ({ meses }) => {
  const [estruturaDespesas, setEstruturaDespesas] = useState(0);
  const [insumosDespesas, setInsumosDespesas] = useState(0);
  const [equipeDespesas, setEquipeDespesas] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseEstruturaDespesas = await fetch(`${API_BASE_URL}/api/despesas/estrutura`);
        const dataEstrutura = await responseEstruturaDespesas.json();
        const somaDespesasEstrutura = dataEstrutura.reduce((total, item) => total + parseFloat(item.custo), 0);
        setEstruturaDespesas(somaDespesasEstrutura);

        const responseInsumosDespesas = await fetch(`${API_BASE_URL}/api/despesas/insumos`);
        const dataInsumos = await responseInsumosDespesas.json();
        const somaDespesasInsumos = dataInsumos.reduce((total, item) => total + parseFloat(item.custo), 0);
        setInsumosDespesas(somaDespesasInsumos);
        
        const responseEquipeDespesas = await fetch(`${API_BASE_URL}/api/despesas/equipe`);
        const dataEquipe = await responseEquipeDespesas.json();
        const somaDespesasEquipe = dataEquipe.reduce((total, item) => total + parseFloat(item.custo), 0);
        setEquipeDespesas(somaDespesasEquipe);
      } catch (error) {
        console.error('Erro ao buscar os dados da API:', error);
      }
    };

    fetchData();
  }, []);

  const createDynamicValues = (value, numMonths) => {
    return [0, ...Array(numMonths - 1).fill(value)];
  };

  // const insumosVariation = [0, 0.2, 0.4, 0.6, 0.8, 1, 1, 1, 1.1, 1.1, 1.1, 1.2, 1.2, 1.2, 1.2, 1.2, 1.2, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5];
  const insumosVariation1 = [0, 0.2, 0.4, 0.6, 0.8, 1, 1, 1, 1.1, 1.1, 1.1, 1.2, 1.2, 1.2, 1.2, 1.2, 1.2, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5];  
  const insumosVariation = insumosVariation1.map(() => 1);
  
  const valueMap = {
    "Estrutura Física/ Virtual": createDynamicValues(estruturaDespesas, meses.length),
    "Equipe de Trabalho": createDynamicValues(equipeDespesas, meses.length),
    "Insumos Operacionais": createDynamicValues(insumosDespesas, meses.length).map((value, index) => value * insumosVariation[index]),
  };

  const calculateTotals = () => {
    const totals = {};
    let grandTotal = 0;
    Object.keys(valueMap).forEach(category => {
      const categoryTotal = valueMap[category].reduce((acc, value) => acc + value, 0);
      totals[category] = categoryTotal;
      grandTotal += categoryTotal;
    });
    totals['Total Geral'] = grandTotal;
    return totals;
  };

  const sumInvestments = () => 
    valueMap["Estrutura Física/ Virtual"].map((value, index) => 
      value + valueMap["Equipe de Trabalho"][index] + valueMap["Insumos Operacionais"][index]
    );

  const investmentSums = sumInvestments();
  const totalInvestmentSum = investmentSums.reduce((acc, value) => acc + value, 0);
  const averageInvestment = totalInvestmentSum / 24;

  const totals = calculateTotals();

  const renderCells = (item, highlight) => {
    let values = item in valueMap ? valueMap[item] : Array(meses.length).fill(0);
    return values.map((value, index) => (
      <div key={index} className='cell' style={{ fontWeight: highlight ? 'bold' : 'normal' }}>
        R$ {value.toLocaleString("pt-BR")}
      </div>
    ));
  };

  const renderTotalCells = () => {
    return Object.keys(totals).map((category, index) => (
      <div key={index} className='cell'>
        R$ {totals[category].toLocaleString("pt-BR")}
      </div>
    ));
  };

  const renderTable = () => (
    <div>
      R$ {parseFloat(averageInvestment).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
    </div>
  );

  return (
    <div className='groupLine'>
      {renderTable()}
    </div>
  );
};

export default MonthlyExpenses;
