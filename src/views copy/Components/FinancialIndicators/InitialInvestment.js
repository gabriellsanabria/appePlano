import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../../../apiConfig';

const InitialInvestment = () => {
  const [amount, setAmount] = useState('Carregando...');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Busca os dados da API para a estrutura
        const responseEstrutura = await fetch(`${API_BASE_URL}/api/investimentos/estrutura`);
        const dataEstrutura = await responseEstrutura.json();
        const somaInvestimentoEstrutura = dataEstrutura.reduce((total, item) => total + parseFloat(item.investimento), 0);

        // Busca os dados da API para os insumos
        const responseInsumos = await fetch(`${API_BASE_URL}/api/investimentos/insumos`);
        const dataInsumos = await responseInsumos.json();
        const somaInvestimentoInsumos = dataInsumos.reduce((total, item) => total + parseFloat(item.investimento), 0);
        
        // Busca os dados da API para Capital de giro
        const responseCapitalGiro = await fetch(`${API_BASE_URL}/api/investimentos/capital-de-giro`);
        const dataCapitalGiro = await responseCapitalGiro.json();
        const somaCapitalGiro = dataCapitalGiro.reduce((total, item) => total + parseFloat(item.investimento_total), 0);

        // Calcula o total do investimento inicial
        const totalInvestimento = somaInvestimentoEstrutura + somaInvestimentoInsumos + somaCapitalGiro;
        
        // Formata o valor total para o padrão monetário brasileiro
        const formattedAmount = totalInvestimento.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        });

        setAmount(formattedAmount);
      } catch (error) {
        setAmount('Erro ao carregar dados');
        console.error('Erro ao buscar os dados da API:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {amount}
    </div>
  );
};

export default InitialInvestment;
