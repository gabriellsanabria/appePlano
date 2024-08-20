import React, { useState, useEffect } from 'react';
import { API_BASE_URL, API_BASE_URL_AMPLIFY } from  '../../../../apiConfig';
import useAuth from '../../../../hooks/useAuth';

const Caixa = ({ meses }) => {
  const [amount, setAmount] = useState('Carregando...');
  
  const [estruturaInvestimento, setEstruturaInvestimento] = useState(0);
  const [insumosInvestimento, setInsumosInvestimento] = useState(0);
  const [insumosCapitalGiro, setCapitalGiroInvestimento] = useState(0);

  const [estruturaDespesas, setEstruturaDespesas] = useState(0);
  const [insumosDespesas, setInsumosDespesas] = useState(0);
  const [equipeDespesas, setEquipeDespesas] = useState(0);

  // Obtendo o usuário e o estado de carregamento do hook useAuth
  const { user, loading } = useAuth();
  const userId = user ? user.uid : null;
  
  useEffect(() => {
    const fetchAndProcessData = async () => {
      try {

         // Busca os dados da API para a estrutura
         const responseEstrutura = await fetch(`${API_BASE_URL}/api/investimentos/estrutura/user/${userId}`);
         const dataEstrutura = await responseEstrutura.json();
         const somaInvestimentoEstrutura = dataEstrutura.reduce((total, item) => total + parseFloat(item.investimento), 0);
         setEstruturaInvestimento(somaInvestimentoEstrutura);
 
         // Busca os dados da API para os insumos
         const responseInsumos = await fetch(`${API_BASE_URL}/api/investimentos/insumos/user/${userId}`);
         const dataInsumos = await responseInsumos.json();
         const somaInvestimentoInsumos = dataInsumos.reduce((total, item) => total + parseFloat(item.investimento), 0);
         setInsumosInvestimento(somaInvestimentoInsumos);
         
         // Busca os dados da API para Capital de giro
         const responseCapitalGiro = await fetch(`${API_BASE_URL}/api/investimentos/capital-de-giro/user/${userId}`);
         const dataCapitalGiro = await responseCapitalGiro.json();
         const somaCapitalGiro = dataCapitalGiro.reduce((total, item) => total + parseFloat(item.investimento_total), 0);
         setCapitalGiroInvestimento(somaCapitalGiro);

        const response = await fetch(`${API_BASE_URL}/receitas_mensais_negocio/user/${userId}`);
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
      
         // Busca os dados da API para a estrutura
         const responseEstruturaDespesas = await fetch(`${API_BASE_URL}/api/despesas/estrutura/user/${userId}`);
         const dataDespesaEstrutura = await responseEstruturaDespesas.json();
         const somaDespesasEstrutura = dataDespesaEstrutura.reduce((total, item) => total + parseFloat(item.custo), 0);
         setEstruturaDespesas(somaDespesasEstrutura);
 
         // Busca os dados da API para os insumos
         const responseInsumosDespesas = await fetch(`${API_BASE_URL}/api/despesas/insumos/user/${userId}`);
         const dataDespesaInsumos = await responseInsumosDespesas.json();
         const somaDespesasInsumos = dataDespesaInsumos.reduce((total, item) => total + parseFloat(item.custo), 0);
         setInsumosDespesas(somaDespesasInsumos);
         
         // Busca os dados da API para Equipe
         const responseEquipeDespesas = await fetch(`${API_BASE_URL}/api/despesas/equipe/user/${userId}`);
         const dataDespesaEquipe = await responseEquipeDespesas.json();
         const somaDespesasEquipe = dataDespesaEquipe.reduce((total, item) => total + parseFloat(item.custo), 0);
         setEquipeDespesas(somaDespesasEquipe);
      
      
      } catch (error) {
        console.error('Falha ao carregar dados:', error);
        setAmount('Erro ao carregar dados');
      }
    };
    if (!loading && userId) {
      fetchAndProcessData();
    }
  }, [setAmount,loading, userId]);  // Passando setAmount como dependência para o useEffect
  

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
  
  const totalMensalProjetado = parseFloat(amount.replace(/[^\d,-]/g, '').replace(',', '.'));

  // Remover 15% do totalMensalProjetado
  const totalMensalProjetadoPosDesconto = totalMensalProjetado * 0.85;
  
  const percentages = [0.2, 0.4, 0.6, 0.8, 1, 1, 1, 1.1, 1.1, 1.1, 1.2, 1.2, 1.2, 1.2, 1.2, 1.2, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5];
  
  const caixaInicial = insumosInvestimento + insumosCapitalGiro;
  
  const investimentosEstimados = estruturaInvestimento + insumosInvestimento + insumosCapitalGiro;
  const investimentosTotaisEstimados = -investimentosEstimados;
  // Criando um array de valores fixos para os investimentos
  const fixedInvestments = new Array(meses.length).fill(0);
  // fixedInvestments[0] = investimentosTotaisEstimados;
  
  // Calculando a receita operacional usando a função createDynamicValues
  let receitaOperacionalValues = createDynamicValues(totalMensalProjetadoPosDesconto, meses.length, percentages, fixedInvestments);

  receitaOperacionalValues[1] += caixaInicial;
    
  // Calculando a porcentagem de despesas relacionadas aos insumos com base nas porcentagens fornecidas
  const despesasInsumosPorcentagem = insumosDespesas * percentages[0]; // Supondo que você queira usar a porcentagem do primeiro mês
  console.log('Porcentagem de despesas relacionadas aos insumos:', despesasInsumosPorcentagem);

  // Calculando as despesas totais estimadas
  const despesasTotais = estruturaDespesas + equipeDespesas;

  // Subtraindo despesasTotaisEstimadas de cada valor em receitaOperacionalValues
  receitaOperacionalValues = receitaOperacionalValues.map((value, index) => {
    if (index === 0) {
      return value; // Mantém o primeiro valor intacto
    } else {
      return value - despesasTotais - (insumosDespesas * percentages[index - 1]); // Aqui, use a porcentagem correta para cada mês
    }
  });
  
    // Calculando o resultado acumulado em receitaOperacionalValues
    let acumulado = 0;
    const receitaOperacionalAcumulada = receitaOperacionalValues.map((value) => {
      acumulado += value;
      return acumulado;
    });

  // Exibindo os valores subtraídos
  console.log("Valores subtraídos:");
  receitaOperacionalValues.forEach((value, index) => {
    console.log(`Índice ${index}: ${value}`);
  });

  // Valor total da receita operacional
  const receitaOperacional = receitaOperacionalValues.reduce((acc, value) => acc + value, 0);
  
  // Aqui você pode usar receitaOperacionalValues para qualquer outra coisa, como armazenamento no objeto valueMap, se necessário.
  
  const valueMap = {
    "Receita Operacional": receitaOperacionalAcumulada,
  };
  
      
  

  const sumInvestments = () => valueMap["Receita Operacional"];
  const investmentSums = sumInvestments();

  const renderCells = (item, highlight) => {
    const values = item in valueMap ? valueMap[item] : (item === "CAIXA" ? investmentSums : Array(meses.length).fill(0));
    return values.map((value, index) => (
      <div key={index} className='cell' style={{ fontWeight: highlight ? 'bold' : 'normal' }}>
        R$ {value.toLocaleString("pt-BR")}
      </div>
    ));
  };

  const renderTable = (items, highlightItems) => (
    <div className='table'>
      {items.map(item => (
        <div key={item} className='row' style={{ fontWeight: highlightItems.includes(item) ? 'bold' : 'normal' }}>
          <div className='cellCol items-color'>{item}</div>
          <div className='cell total-color'>
            R$ {(item === "CAIXA" ? investmentSums[investmentSums.length - 1] : (item in valueMap ? valueMap[item].reduce((a, b) => a + b, 0) : 0)).toLocaleString("pt-BR")}  
          </div>
          {renderCells(item, highlightItems.includes(item))}
        </div>
      ))}
    </div>
  );

  const caixa = [
    "CAIXA",
  ];

  const highlightItems = ["CAIXA"];

  return (
    <div className='groupLine'>
      {renderTable(caixa, highlightItems)}
    </div>
  );
};

export default Caixa;
