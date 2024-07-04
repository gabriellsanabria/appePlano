import React, { useState, useEffect } from 'react';
import { API_BASE_URL, API_BASE_URL_AMPLIFY } from  '../../../../apiConfig';

const FluxoCaixa = ({ meses }) => {
  
  const [estruturaInvestimento, setEstruturaInvestimento] = useState(0);
  const [insumosInvestimento, setInsumosInvestimento] = useState(0);
  const [insumosCapitalGiro, setCapitalGiroInvestimento] = useState(0);

  const [amount, setAmount] = useState('Carregando...');

  const [despesasEstrutura, setDespesasEstrutura] = useState(0);
  const [despesasEquipe, setDespesasEquipe] = useState(0);
  const [capitalGiro, setCapitalGiro] = useState(0);  

  useEffect(() => {
    const fetchData = async () => {
     try {
        // Busca os dados da API para a estrutura
        const responseEstrutura = await fetch(`${API_BASE_URL}/api/investimentos/estrutura`);
        const dataEstrutura = await responseEstrutura.json();
        const somaInvestimentoEstrutura = dataEstrutura.reduce((total, item) => total + parseFloat(item.investimento), 0);
        setEstruturaInvestimento(somaInvestimentoEstrutura);

        // Busca os dados da API para os insumos
        const responseInsumos = await fetch(`${API_BASE_URL}/api/investimentos/insumos`);
        const dataInsumos = await responseInsumos.json();
        const somaInvestimentoInsumos = dataInsumos.reduce((total, item) => total + parseFloat(item.investimento), 0);
        setInsumosInvestimento(somaInvestimentoInsumos);
        
        // Busca os dados da API para Capital de giro
        const responseCapitalGiro = await fetch(`${API_BASE_URL}/api/investimentos/capital-de-giro`);
        const dataCapitalGiro = await responseCapitalGiro.json();
        const somaCapitalGiro = dataCapitalGiro.reduce((total, item) => total + parseFloat(item.investimento_total), 0);
        setCapitalGiroInvestimento(somaCapitalGiro);

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
      
        // Busca os dados da API para a estrutura
        const responseDespesasEstrutura = await fetch(`${API_BASE_URL}/api/despesas/estrutura`);
        const dataDespesasEstrutura = await responseDespesasEstrutura.json();
        const somaDespesasEstrutura = dataDespesasEstrutura.reduce((total, item) => total + parseFloat(item.custo), 0);
        setDespesasEstrutura(somaDespesasEstrutura);

        // Busca os dados da API para os insumos
        const responseDespesasEquipe = await fetch(`${API_BASE_URL}/api/despesas/equipe`);
        const dataDespesasEquipe = await responseDespesasEquipe.json();
        const somaDespesasEquipe = dataDespesasEquipe.reduce((total, item) => total + parseFloat(item.custo), 0);
        setDespesasEquipe(somaDespesasEquipe);

        // Busca os dados da API para Capital de giro
        const responseDespesasInsumos = await fetch(`${API_BASE_URL}/api/despesas/insumos`);
        const dataDespesasInsumos = await responseDespesasInsumos.json();
        const somaDespesasInsumos = dataDespesasInsumos.reduce((total, item) => total + parseFloat(item.custo), 0);
        setCapitalGiro(somaDespesasInsumos);


      } catch (error) {
        console.error('Erro ao buscar os dados da API:', error);
      }
    };

    fetchData();
  }, []);

  const createDynamicValues = (value, numMonths) => {
    const valuesArray = [totalInvestimentos, ...Array(numMonths - 1).fill(value)];
    return valuesArray;
  };
  const percentages = [0.2, 0.4, 0.6, 0.8, 1, 1, 1, 1.1, 1.1, 1.1, 1.2, 1.2, 1.2, 1.2, 1.2, 1.2, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5];
  const adjustAmountByMonth = (amount, percentages, monthIndex) => {
    const numericAmount = parseFloat(amount.replace('R$ ', '').replace('.', '').replace(',', '.')); // Convertendo a string formatada em um número
  
    // Se o índice do mês for maior que 0 e estiver dentro do intervalo de porcentagens
    if (monthIndex > 0 && monthIndex - 1 < percentages.length) {
      return numericAmount * percentages[monthIndex - 1];
    } else {
      // Caso contrário, retornamos o valor sem ajuste
      return numericAmount;
    }
  };
  
  
  
  // Em seguida, podemos usar a função dentro do componente para calcular os valores ajustados para cada mês.
  
  const adjustedAmount = adjustAmountByMonth(amount, percentages, 0); // Para o primeiro mês
  
  const totalInvestimentosCaixaInicial = insumosInvestimento + insumosCapitalGiro;
  const totalDespesasEstimadas = despesasEstrutura + despesasEquipe + capitalGiro;
  const totalMensalReceitasProjetado = adjustedAmount;
  
  const totalInvestimentos = estruturaInvestimento - insumosInvestimento - insumosCapitalGiro;
  const resultadoReceitaOperacional = totalMensalReceitasProjetado - totalDespesasEstimadas;

  const valueMap = {
    "Receita Operacional": createDynamicValues(resultadoReceitaOperacional, meses.length)
  };

  const investmentSums = valueMap["Receita Operacional"];

  const renderCells = (item, highlight) => {
    let values = item in valueMap ? valueMap[item] : (item === "FLUXO DE CAIXA" ? investmentSums : Array(meses.length).fill(0));
    return values.map((value, index) => {
      let receitaOperacional = item === "Receita Operacional" ? value - totalDespesasEstimadas : adjustAmountByMonth(amount, percentages, index);
      return (
        <div key={index} className='cell' style={{
          fontWeight: highlight ? 'bold' : 'normal'
        }}>
          {item === "(-) Impostos (%)" && index === 0 ? '' :
            (item === "Receita Operacional" ? `R$ ${receitaOperacional.toLocaleString("pt-BR")}` : `R$ ${receitaOperacional.toLocaleString("pt-BR")}`)}
        </div>
      );
    });
  };
  
  
  
  
  

  const renderTable = (items, highlightItems) => (
    <div className='table'>
      {items.map((item, index) => (
        <div key={item} className='row' style={{
          fontWeight: highlightItems.includes(item) ? 'bold' : 'normal'
        }}>
          <div className='cellCol'>{item}</div>
          <div className='cell'>
            {item !== "(-) Impostos (%)" ? // Exibe o total apenas para outros itens que não sejam impostos
              `R$ ${(item in valueMap ? valueMap[item].reduce((a, b) => a + b, 0) :
                item === "FLUXO DE CAIXA" ? investmentSums.reduce((a, b) => a + b, 0) : 0)
                .toLocaleString("pt-BR")}` : index > 0 ? '-' : '-' /* Deixa vazio para o primeiro mês */
            }
          </div>
          {renderCells(item, highlightItems.includes(item))}
        </div>
      ))}

    </div>
  );

  const fluxoCaixa = [
    "FLUXO DE CAIXA",
    "Receita Operacional",
  ];

  const highlightItems = ["FLUXO DE CAIXA"];

  return (
    <div className='groupLine'>        
      {renderTable(fluxoCaixa, highlightItems)}
    </div>
  );
};

export default FluxoCaixa;
