import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL, API_BASE_URL_AMPLIFY } from  '../../../../apiConfig';
import useAuth from '../../../../hooks/useAuth';

const LucroLiquidoMensal = ({ meses }) => {
  const [amount, setAmount] = useState('Carregando...');
  const [loading, setLoading] = useState(true);
  
  const [estruturaInvestimento, setEstruturaInvestimento] = useState(0);
  const [insumosInvestimento, setInsumosInvestimento] = useState(0);
  const [insumosCapitalGiro, setCapitalGiroInvestimento] = useState(0);

  const [estruturaDespesas, setEstruturaDespesas] = useState(0);
  const [insumosDespesas, setInsumosDespesas] = useState(0);
  const [equipeDespesas, setEquipeDespesas] = useState(0);

  // Obtendo o usuário e o estado de carregamento do hook useAuth
  const { user } = useAuth();
  const userId = user ? user.uid : null;

  useEffect(() => {
    const fetchAndProcessData = async () => {
      try {

         // Busca os dados da API para a estrutura
         const responseEstrutura = await fetch(`${API_BASE_URL}/api/investimentos/estrutura/user/${userId}`);
         const dataEstrutura = await responseEstrutura.json();
         const somaInvestimentoEstrutura = dataEstrutura.reduce((total, item) => total + parseFloat(item.investimento), 0);
         setEstruturaInvestimento(0);
 
         // Busca os dados da API para os insumos
         const responseInsumos = await fetch(`${API_BASE_URL}/api/investimentos/insumos/user/${userId}`);
         const dataInsumos = await responseInsumos.json();
         const somaInvestimentoInsumos = dataInsumos.reduce((total, item) => total + parseFloat(item.investimento), 0);
         setInsumosInvestimento(0);
         
         // Busca os dados da API para Capital de giro
         const responseCapitalGiro = await fetch(`${API_BASE_URL}/api/investimentos/capital-de-giro/user/${userId}`);
         const dataCapitalGiro = await responseCapitalGiro.json();
         const somaCapitalGiro = dataCapitalGiro.reduce((total, item) => total + parseFloat(item.investimento_total), 0);
         setCapitalGiroInvestimento(0);

        const response = await fetch(`${API_BASE_URL}/api/simulador/receitas_mensais_negocio/user/${userId}`);
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
         const responseEstruturaDespesas = await fetch(`${API_BASE_URL}/api/simulador/despesas/estrutura/user/${userId}`);
         const dataDespesaEstrutura = await responseEstruturaDespesas.json();
         const somaDespesasEstrutura = dataDespesaEstrutura.reduce((total, item) => total + parseFloat(item.custo), 0);
         setEstruturaDespesas(somaDespesasEstrutura);
 
         // Busca os dados da API para os insumos
         const responseInsumosDespesas = await fetch(`${API_BASE_URL}/api/simulador/despesas/insumos/user/${userId}`);
         const dataDespesaInsumos = await responseInsumosDespesas.json();
         const somaDespesasInsumos = dataDespesaInsumos.reduce((total, item) => total + parseFloat(item.custo), 0);
         setInsumosDespesas(somaDespesasInsumos);
         
         // Busca os dados da API para Equipe
         const responseEquipeDespesas = await fetch(`${API_BASE_URL}/api/simulador/despesas/equipe/user/${userId}`);
         const dataDespesaEquipe = await responseEquipeDespesas.json();
         const somaDespesasEquipe = dataDespesaEquipe.reduce((total, item) => total + parseFloat(item.custo), 0);
         setEquipeDespesas(somaDespesasEquipe);
      
      
      } catch (error) {
        console.error('Falha ao carregar dados:', error);
        setAmount('Erro ao carregar dados');
      }
    };
    if (userId) {
      fetchAndProcessData();
    }
  }, [setAmount,userId]); // Passando setAmount como dependência para o useEffect
  
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
  
  // const percentages = [0.2, 0.4, 0.6, 0.8, 1, 1, 1, 1.1, 1.1, 1.1, 1.2, 1.2, 1.2, 1.2, 1.2, 1.2, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5];
  const percentages1 = [0.2, 0.4, 0.6, 0.8, 1, 1, 1, 1.1, 1.1, 1.1, 1.2, 1.2, 1.2, 1.2, 1.2, 1.2, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5];
  const percentages = percentages1.map(() => 1);
  
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

  // Exibindo os valores subtraídos
  console.log("Valores subtraídos:");
  receitaOperacionalValues.forEach((value, index) => {
    console.log(`Índice ${index}: ${value}`);
  });

  // Valor total da receita operacional
  const receitaOperacional = receitaOperacionalValues.reduce((acc, value) => acc + value, 0);
  
  // Aqui você pode usar receitaOperacionalValues para qualquer outra coisa, como armazenamento no objeto valueMap, se necessário.
  
  const valueMap = {
    "Receita Operacional": receitaOperacionalValues,
  };
  
      
  

  
  // Assume totalCaixa is a state variable initialized using useState
  const [totalCaixa, setTotalCaixa] = useState(0);
  const [caixaLiquido, setCaixaLiquido] = useState(0);
  const [caixaEstoque, setCaixaEstoque] = useState(0);
  const [caixaRecebiveis, setCaixaRecebiveis] = useState(0);
  const [caixaContasPagar, setCaixaContasPagar] = useState(0);
  useEffect(() => {
    const fetchCaixaData = async () => {
      try {
        setLoading(true);

        const response6 = await axios.get(`${API_BASE_URL}/api/caixa/liquido/user/${userId}`);
        const totalLiquido = response6.data.reduce((total, item) => total + parseFloat(item.valor), 0);
        setCaixaLiquido(totalLiquido);
        console.log('Dados de caixa líquido:', totalLiquido);

        const response7 = await axios.get(`${API_BASE_URL}/api/caixa/estoque/user/${userId}`);
        const totalEstoque = response7.data.reduce((total, item) => total + parseFloat(item.valor), 0);
        setCaixaEstoque(totalEstoque);
        console.log('Dados de caixa estoque:', totalEstoque);

        const response8 = await axios.get(`${API_BASE_URL}/api/caixa/recebiveis/user/${userId}`);
        const totalRecebiveis = response8.data.reduce((total, item) => total + parseFloat(item.valor), 0);
        setCaixaRecebiveis(totalRecebiveis);
        console.log('Dados de caixa recebíveis:', totalRecebiveis);

        const response9 = await axios.get(`${API_BASE_URL}/api/caixa/contas_pagar/user/${userId}`);
        const totalContasPagar = response9.data.reduce((total, item) => total + parseFloat(item.valor), 0);
        setCaixaContasPagar(totalContasPagar);
        console.log('Dados de caixa contas a pagar:', totalContasPagar);

        const resultadoCaixa = totalLiquido + totalEstoque + totalRecebiveis - totalContasPagar;
        setTotalCaixa(resultadoCaixa);
        console.log('Resultado Caixa:', resultadoCaixa);

      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
      } finally {
        setLoading(false);
      }
    };


    if (userId) {
      fetchCaixaData();
    }
  }, [userId]); // Passando setAmount como dependência para o useEffect
  
  

  
  const [totalImposto, setTotalImposto] = useState(0);
  useEffect(() => {
    const fetchImpostoData = async () => {
      try {
        setLoading(true);

        const responseImposto = await axios.get(`${API_BASE_URL}/listar_impostos_mensais/user/${userId}`);
        const imposto = responseImposto.data.reduce((total, item) => total + parseFloat(item.valor_imposto_mensal), 0)/100;
        // setTotalImposto(imposto);
        setTotalImposto(15);
        console.log('Dados de imposto:', imposto);

      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImpostoData();

    // Dependências do useEffect, se necessário
  }, []);  
    
  // alert(totalMensalProjetado);
  const despesasEstimadasTotal = insumosDespesas + despesasTotais;  
  const receitaOp = totalMensalProjetado - despesasEstimadasTotal + totalCaixa;
  
  const lucroLiquidoMensal = totalMensalProjetado-(totalMensalProjetado*totalImposto)-despesasEstimadasTotal+totalCaixa;
  // const lucroLiquidoMensal =despesasEstimadasTotal;
  
  console.log('aqui5',totalCaixa);

  console.log('aqui',receitaOp);

  console.log('aqui6',lucroLiquidoMensal);

  
  const sumInvestments = () => valueMap["Receita Operacional"];
  const investmentSums = sumInvestments();


  const renderCells = (item, highlight) => {
    const values = item in valueMap ? valueMap[item] : (item === "LUCRO LÍQUIDO MENSAL" ? investmentSums : Array(meses.length).fill(0));
    return values.map((value, index) => (
      <div key={index} className='cell' style={{ fontWeight: highlight ? 'bold' : 'normal' }}>
        {index === 1 && item === "LUCRO LÍQUIDO MENSAL" ? `R$ ${lucroLiquidoMensal.toLocaleString("pt-BR")}` : `R$ ${value.toLocaleString("pt-BR")}`}
      </div>
    ));
  };
  

  const renderTable = (items, highlightItems) => (
    <div className='table'>
      {items.map(item => (
        <div key={item} className='row' style={{ fontWeight: highlightItems.includes(item) ? 'bold' : 'normal' }}>
          <div className='cellCol items-color'>{item}</div>
          {/* <div className='cell total-color'>
            R$ {(item in valueMap ? valueMap[item].reduce((a, b) => a + b, 0) : (item === "LUCRO LÍQUIDO MENSAL" ? investmentSums.reduce((a, b) => a + b, 0) : 0)).toLocaleString("pt-BR")}
          </div> */}
          <div></div>
          {renderCells(item, highlightItems.includes(item))}
        </div>
      ))}
    </div>
  );

  const lucroliquidomensal = [
    "LUCRO LÍQUIDO MENSAL",
  ];

  const highlightItems = ["LUCRO LÍQUIDO MENSAL"];

  return (
    <div className='groupLine'>
      {renderTable(lucroliquidomensal, highlightItems)}
    </div>
  );
};

export default LucroLiquidoMensal;