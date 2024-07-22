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
  }, []); // Removido setAmount como dependência para o useEffect

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

  // Calcular total de lucro
  const totalProfitValue = amount !== 'Erro ao carregar dados'
    ? parseFloat(amount.replace(/[^\d,-]/g, '').replace(',', '.'))
    : 0;

  // Calcular ROI
  const initialInvestmentNumber = parseFloat(initialInvestiment);
  const ROI = initialInvestmentNumber !== 0
    ? (1 + (totalProfitValue / initialInvestmentNumber)).toFixed(2)
    : 0;

  return (
    <div>
      {/* Mostrar ROI */}
      {ROI}
    </div>
  );
};

export default ReturnOnInvestment;
