import React, { useState, useEffect } from 'react';
import { API_BASE_URL, API_BASE_URL_AMPLIFY } from  '../../../apiConfig';

const LucroLiquidoAcumulado = () => {
  const generateMonths = (numMonths) => Array.from({ length: numMonths }, (_, i) => `Mês ${i + 0}`);
  const meses = generateMonths(25);

  const [amount, setAmount] = useState('Carregando...');
  const [estruturaInvestimento, setEstruturaInvestimento] = useState(0);
  const [insumosInvestimento, setInsumosInvestimento] = useState(0);
  const [insumosCapitalGiro, setCapitalGiroInvestimento] = useState(0);
  const [estruturaDespesas, setEstruturaDespesas] = useState(0);
  const [insumosDespesas, setInsumosDespesas] = useState(0);
  const [equipeDespesas, setEquipeDespesas] = useState(0);

  useEffect(() => {
    const fetchAndProcessData = async () => {
      try {
         const responseEstrutura = await fetch(`${API_BASE_URL}/api/investimentos/estrutura`);
         const dataEstrutura = await responseEstrutura.json();
         const somaInvestimentoEstrutura = dataEstrutura.reduce((total, item) => total + parseFloat(item.investimento), 0);
         setEstruturaInvestimento(somaInvestimentoEstrutura);
 
         const responseInsumos = await fetch(`${API_BASE_URL}/api/investimentos/insumos`);
         const dataInsumos = await responseInsumos.json();
         const somaInvestimentoInsumos = dataInsumos.reduce((total, item) => total + parseFloat(item.investimento), 0);
         setInsumosInvestimento(somaInvestimentoInsumos);
         
         const responseCapitalGiro = await fetch(`${API_BASE_URL}/api/investimentos/capital-de-giro`);
         const dataCapitalGiro = await responseCapitalGiro.json();
         const somaCapitalGiro = dataCapitalGiro.reduce((total, item) => total + parseFloat(item.investimento_total), 0);
         setCapitalGiroInvestimento(somaCapitalGiro);

        const response = await fetch(`${API_BASE_URL}/receitas_mensais_negocio`);
        if (!response.ok) {
          throw new Error('Falha na rede');
        }
        const data = await response.json();
        
        const totalRevenue = data.reduce((acc, curr) => {
          const totalIndividual = curr.quantidade_vendida_por_mes * parseFloat(curr.valor_unitario);
          return acc + totalIndividual;
        }, 0);

        setAmount(`R$ ${totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);
      
         const responseEstruturaDespesas = await fetch(`${API_BASE_URL}/api/despesas/estrutura`);
         const dataDespesaEstrutura = await responseEstruturaDespesas.json();
         const somaDespesasEstrutura = dataDespesaEstrutura.reduce((total, item) => total + parseFloat(item.custo), 0);
         setEstruturaDespesas(somaDespesasEstrutura);
 
         const responseInsumosDespesas = await fetch(`${API_BASE_URL}/api/despesas/insumos`);
         const dataDespesaInsumos = await responseInsumosDespesas.json();
         const somaDespesasInsumos = dataDespesaInsumos.reduce((total, item) => total + parseFloat(item.custo), 0);
         setInsumosDespesas(somaDespesasInsumos);
         
         const responseEquipeDespesas = await fetch(`${API_BASE_URL}/api/despesas/equipe`);
         const dataDespesaEquipe = await responseEquipeDespesas.json();
         const somaDespesasEquipe = dataDespesaEquipe.reduce((total, item) => total + parseFloat(item.custo), 0);
         setEquipeDespesas(somaDespesasEquipe);
      
      } catch (error) {
        console.error('Falha ao carregar dados:', error);
        setAmount('Erro ao carregar dados');
      }
    };

    fetchAndProcessData();
  }, [setAmount]); 

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
  
  const totalMensalProjetado = parseFloat(amount.replace(/[^\d,-]/g, '').replace(',', '.'));
  const totalMensalProjetadoPosDesconto = totalMensalProjetado * 0.85;
  const percentages = [0.2, 0.4, 0.6, 0.8, 1, 1, 1, 1.1, 1.1, 1.1, 1.2, 1.2, 1.2, 1.2, 1.2, 1.2, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5];
  const caixaInicial = insumosInvestimento + insumosCapitalGiro;
  const investimentosEstimados = estruturaInvestimento + insumosInvestimento + insumosCapitalGiro;
  const investimentosTotaisEstimados = -investimentosEstimados;
  const fixedInvestments = new Array(meses.length).fill(0);
  fixedInvestments[0] = investimentosTotaisEstimados;
  
  let receitaOperacionalValues = createDynamicValues(totalMensalProjetadoPosDesconto, meses.length, percentages, fixedInvestments);
  receitaOperacionalValues[1] += caixaInicial;
  
  const despesasInsumosPorcentagem = insumosDespesas * percentages[0];
  const despesasTotais = estruturaDespesas + equipeDespesas;
  receitaOperacionalValues = receitaOperacionalValues.map((value, index) => {
    if (index === 0) {
      return value;
    } else {
      return value - despesasTotais - (insumosDespesas * percentages[index - 1]);
    }
  });

  const receitaOperacional = receitaOperacionalValues.reduce((acc, value) => acc + value, 0);
  
  const valueMap = {
    "Receita Operacional": receitaOperacionalValues,
  };
  
  const sumInvestments = () => valueMap["Receita Operacional"];
  const investmentSums = sumInvestments();

  const renderCells = () => {
    const accumulatedValues = [];
    let accumulatedTotal = 0;
    let negativeValues = []; // Array para armazenar valores negativos e suas posições
    investmentSums.forEach((value, index) => {
      accumulatedTotal += value;
      accumulatedValues.push(accumulatedTotal);
      if (accumulatedTotal < 0) {
        negativeValues.push({ value: accumulatedTotal, position: index });
      }
    });
  
    const negativeResultsMessage = `${negativeValues.length}`;
    if (negativeValues.length > 0) {
      console.log("Valores negativos encontrados:");
      negativeValues.forEach((item) => {
        console.log(`Valor negativo encontrado na posição ${item.position}: ${item.value}`);
      });
    }
    return [accumulatedValues, negativeResultsMessage];
  };
  
  

  // Renderizar a matriz de resultados
  const [accumulatedValues, negativeResultsMessage] = renderCells();

  console.log("Valores acumulados:", accumulatedValues);

  return (
    <div className='groupLine'>
      {/* Renderizando a mensagem de resultados negativos */}
      <div>{negativeResultsMessage}</div>
    </div>
  );
};

export default LucroLiquidoAcumulado;
