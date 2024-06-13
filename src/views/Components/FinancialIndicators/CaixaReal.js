import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../../../apiConfig';

const LucroLiquidoMensal = ({ meses }) => {
  const [monthlyAverage, setMonthlyAverage] = useState('Carregando...');

  useEffect(() => {
    const fetchAndProcessData = async () => {
      try {
        const responseLiquido = await fetch(`${API_BASE_URL}/api/caixa/liquido`);
        const dataLiquido = await responseLiquido.json();
        const somaLiquido = dataLiquido.reduce((total, item) => total + parseFloat(item.valor), 0);

        const responseEstoque = await fetch(`${API_BASE_URL}/api/caixa/estoque`);
        const dataEstoque = await responseEstoque.json();
        const somaEstoque = dataEstoque.reduce((total, item) => total + parseFloat(item.valor), 0);

        const responseRecebiveis = await fetch(`${API_BASE_URL}/api/caixa/recebiveis`);
        const dataRecebiveis = await responseRecebiveis.json();
        const somaRecebiveis = dataRecebiveis.reduce((total, item) => total + parseFloat(item.valor), 0);

        const responseContasPagar = await fetch(`${API_BASE_URL}/api/caixa/contas_pagar`);
        const dataContasPagar = await responseContasPagar.json();
        const somaContasPagar = dataContasPagar.reduce((total, item) => total + parseFloat(item.valor), 0);

        const monthlyNetProfit = somaLiquido + somaEstoque + somaRecebiveis - somaContasPagar;
        setMonthlyAverage(monthlyNetProfit.toLocaleString("pt-BR", { minimumFractionDigits: 2 }));
      } catch (error) {
        console.error('Falha ao carregar dados:', error);
        setMonthlyAverage('Erro ao carregar dados');
      }
    };

    fetchAndProcessData();
  }, []);

  return (
    <div>
      R$ {monthlyAverage}
    </div>
  );
};

export default LucroLiquidoMensal;
