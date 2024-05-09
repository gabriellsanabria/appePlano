import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../../../apiConfig';

const ReturnOnInvestment = () => {
  const [amount, setAmount] = useState('Carregando...');
  const [initialInvestiment, setinitialInvestiment] = useState('Carregando...');
  const [estruturaInvestimento, setEstruturaInvestimento] = useState(0);
  const [insumosInvestimento, setInsumosInvestimento] = useState(0);
  const [insumosCapitalGiro, setCapitalGiroInvestimento] = useState(0);
  const [estruturaDespesas, setEstruturaDespesas] = useState(0);
  const [insumosDespesas, setInsumosDespesas] = useState(0);
  const [equipeDespesas, setEquipeDespesas] = useState(0);

  // Função para gerar a lista de meses
  const generateMonths = (numMonths) => Array.from({ length: numMonths }, (_, i) => `Mês ${i + 1}`);
  const meses = generateMonths(25);  // Lista de meses ajustada para 24 meses
  useEffect(() => {
    const fetchAndProcessData = async () => {
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
        const responseEstruturaDespesas = await fetch(`${API_BASE_URL}/api/despesas/estrutura`);
        const dataDespesaEstrutura = await responseEstruturaDespesas.json();
        const somaDespesasEstrutura = dataDespesaEstrutura.reduce((total, item) => total + parseFloat(item.custo), 0);
        setEstruturaDespesas(somaDespesasEstrutura);

        // Busca os dados da API para os insumos
        const responseInsumosDespesas = await fetch(`${API_BASE_URL}/api/despesas/insumos`);
        const dataDespesaInsumos = await responseInsumosDespesas.json();
        const somaDespesasInsumos = dataDespesaInsumos.reduce((total, item) => total + parseFloat(item.custo), 0);
        setInsumosDespesas(somaDespesasInsumos);

        // Busca os dados da API para Equipe
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
  }, [setAmount]); // Passando setAmount como dependência para o useEffect

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
  fixedInvestments[0] = investimentosTotaisEstimados;

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

  // Valor total da receita operacional
  const receitaOperacional = receitaOperacionalValues.reduce((acc, value) => acc + value, 0);

  // Definindo valueMap
  const valueMap = {
    "Receita Operacional": receitaOperacionalValues,
  };

  const sumInvestments = () => valueMap["Receita Operacional"];
  const investmentSums = sumInvestments();
  useEffect(() => {
    async function fetchData() {
      try {
        // Helper function to fetch and process investment data
        const fetchAndProcessInvestment = async (endpoint, investmentKey = 'investimento') => {
          const response = await fetch(`${API_BASE_URL}/api/investimentos/${endpoint}`);
          const data = await response.json();
          return data.reduce((total, item) => total + parseFloat(item[investmentKey]), 0);
        };

        // Parallel fetching of investment data
        const [somaInvestimentoEstrutura, somaInvestimentoInsumos, somaCapitalGiro] = await Promise.all([
          fetchAndProcessInvestment('estrutura'),
          fetchAndProcessInvestment('insumos'),
          fetchAndProcessInvestment('capital-de-giro', 'investimento_total')
        ]);

        // Calculate the total initial investment
        const totalInvestimento = somaInvestimentoEstrutura + somaInvestimentoInsumos + somaCapitalGiro;
        setinitialInvestiment(totalInvestimento.toString());
      } catch (error) {
        setinitialInvestiment('Erro ao carregar dados');
        console.error('Erro ao buscar os dados da API:', error);
      }
    }

    fetchData();
  }, []);


  const totalProfitValue = investmentSums.reduce((a, b) => a + b, 0).toLocaleString("pt-BR").replace(/[.;]/g, '');

  // Cálculo do ROI usando os valores numéricos
  const ROI = 1+(totalProfitValue / initialInvestiment);

  return (
    <div>
      {/* <p>Initial Investment: {initialInvestiment}</p> */}
      {/* <p>Total Profit: R$ {totalProfitValue}</p> */}
        {ROI.toFixed(2)}
      <div className='groupLine'>
      {/* R$ {investmentSums.reduce((a, b) => a + b, 0).toLocaleString("pt-BR")} */}
    </div>
    </div>
  );
};

export default ReturnOnInvestment;
