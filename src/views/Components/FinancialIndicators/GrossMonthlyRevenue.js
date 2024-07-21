import React, { useState, useEffect } from 'react';
import { API_BASE_URL, API_BASE_URL_AMPLIFY } from  '../../../apiConfig';

const ReceitaBrutaEstimada = () => {
  const [amount, setAmount] = useState('Carregando...');
  const generateMonths = (numMonths) => Array.from({ length: numMonths }, (_, i) => `Mês ${i + 1}`);
  const meses = generateMonths(25);  // Lista de meses ajustada para 24 meses
 
  useEffect(() => {
    const fetchAndProcessData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/receitas_mensais_negocio`);
        if (!response.ok) {
          throw new Error('Falha na rede');
        }
        const data = await response.json();
        
        // Calculando o total de receita bruta estimada
        const totalRevenue = data.reduce((acc, curr) => {
          const totalIndividual = curr.quantidade_vendida_por_mes * parseFloat(curr.valor_unitario);
          return acc + totalIndividual;
        }, 0);

        // Definindo o valor total de receita bruta estimada formatado
        setAmount(`R$ ${totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);
      } catch (error) {
        console.error('Falha ao carregar dados:', error);
        setAmount('Erro ao carregar dados');
      }
    };

    fetchAndProcessData();
  }, [setAmount]); // Passando setAmount como dependência para o useEffect
  


  const createDynamicValues = (totalMensalProjetado, numMonths, percentages) => {
    const values = [];
    let totalSoFar = 0;
    for (let i = 0; i < numMonths; i++) {
      const percentage = i === 0 ? 0 : percentages[i - 1] || 0;
      const projectedRevenue = totalMensalProjetado * percentage;
      totalSoFar += projectedRevenue;
      values.push(projectedRevenue);
    }
    return values;
  };
  

  const totalMensalProjetado = parseFloat(amount.replace(/[^\d,-]/g, '').replace(',', '.'));

  const percentages = [0.2, 0.4, 0.6, 0.8, 1, 1, 1, 1.1, 1.1, 1.1, 1.2, 1.2, 1.2, 1.2, 1.2, 1.2, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5];
  const valueMap = {
    "Somatório das Receitas Estimadas": createDynamicValues(totalMensalProjetado, meses.length, percentages),
  };

  const sumInvestments = () => valueMap["Somatório das Receitas Estimadas"];
  const investmentSums = sumInvestments();

  const renderCells = (item, highlight) => {
    const values = item in valueMap ? valueMap[item] : (item === "RECEITA BRUTA (ESTIMADA)" ? investmentSums : Array(meses.length).fill(0));
    return values.map((value, index) => (
      <div key={index} className='cell' style={{ fontWeight: highlight ? 'bold' : 'normal' }}>
        R$ {value.toLocaleString("pt-BR")}
      </div>
    ));
  };

  const renderTable = (items, highlightItems) => {
    const totalInvestment = investmentSums.reduce((a, b) => a + b, 0);
    const averagePerMonth = totalInvestment / 24;
  
    return (
      <div className=''>
        {/* <div className='row'>
          <div className='cell total-color'>
            R$ {totalInvestment.toLocaleString("pt-BR")}
          </div>
        </div> */}
        <div className=''>
          <div className=''>
            R$ {averagePerMonth.toLocaleString("pt-BR")}
          </div>
        </div>
      </div>
    );
  };
  
  

  const investimentosEstimados = [
    "RECEITA BRUTA (ESTIMADA)",
    "Somatório das Receitas Estimadas",
  ];

  const highlightItems = ["RECEITA BRUTA (ESTIMADA)"];

  return (
    <div className=''>
      {renderTable(investimentosEstimados, highlightItems)}
    </div>
  );
};

export default ReceitaBrutaEstimada;
