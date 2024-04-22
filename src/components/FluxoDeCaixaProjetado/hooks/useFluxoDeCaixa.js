// src/components/FluxoDeCaixaProjetado/hooks/useFluxoDeCaixa.js
import { useContext } from 'react';
import FluxoDeCaixaContext from '../FluxoDeCaixaContext';

const useFluxoDeCaixa = () => {
  const { state, dispatch } = useContext(FluxoDeCaixaContext);

  // Função para atualizar valores de investimento
  const updateInvestimento = (category, total) => {
    dispatch({
      type: 'UPDATE_INVESTIMENTO',
      payload: { category, total }
    });
  };

  // Função para definir a receita bruta
  const setReceitaBruta = (total) => {
    dispatch({
      type: 'SET_RECEITA_BRUTA',
      payload: total
    });
  };

  // Função para definir as despesas
  const setDespesas = (total) => {
    dispatch({
      type: 'SET_DESPESAS',
      payload: total
    });
  };

  // Função para definir o caixa inicial
  const setCaixaInicial = (amount) => {
    dispatch({
      type: 'SET_CAIXA_INICIAL',
      payload: amount
    });
  };

  // Função para calcular o fluxo de caixa após atualizações
  const calculateFluxoDeCaixa = () => {
    dispatch({
      type: 'CALCULATE_FLUXO_DE_CAIXA'
    });
  };

  // Retornar o estado e as funções de manipulação
  return {
    state, 
    updateInvestimento,
    setReceitaBruta,
    setDespesas,
    setCaixaInicial,
    calculateFluxoDeCaixa
  };
};

export default useFluxoDeCaixa;
