// src/components/FluxoDeCaixaProjetado/FluxoDeCaixaContext.jsx
import React, { createContext, useReducer } from 'react';

// Estado inicial para o contexto do Fluxo de Caixa
const initialState = {
  investimentos: {
    'Estrutura Física/ Virtual': { total: 50000, mes: Array(24).fill(1667) },
    'Insumos': { total: 30000, mes: Array(24).fill(1250) },
    'Capital de Giro': { total: 20000, mes: Array(24).fill(833) },
  },
  receitaBruta: Array(24).fill(100000),
  despesas: Array(24).fill(50000),
  caixaInicial: 10000,
  fluxoDeCaixa: Array(24).fill(0),
  lucroLiquidoMensal: Array(24).fill(0),
  lucroLiquidoAcumulado: Array(24).fill(0),
  caixa: Array(24).fill(0),
};

// Criar o contexto do Fluxo de Caixa
const FluxoDeCaixaContext = createContext({});

// Reducer para gerenciar ações que alteram o estado do contexto
function fluxoDeCaixaReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_INVESTIMENTO':
      return {
        ...state,
        investimentos: {
          ...state.investimentos,
          [action.payload.category]: {
            ...state.investimentos[action.payload.category],
            total: action.payload.total,
            mes: Array(24).fill(action.payload.total / 24)
          }
        }
      };
    case 'SET_RECEITA_BRUTA':
      return {
        ...state,
        receitaBruta: Array(24).fill(action.payload)
      };
    case 'SET_DESPESAS':
      return {
        ...state,
        despesas: Array(24).fill(action.payload)
      };
    case 'SET_CAIXA_INICIAL':
      return {
        ...state,
        caixaInicial: action.payload
      };
    case 'CALCULATE_FLUXO_DE_CAIXA':
      const fluxoDeCaixa = state.receitaBruta.map((receita, index) => 
        receita - state.despesas[index] + (index === 0 ? state.caixaInicial : state.fluxoDeCaixa[index-1])
      );
      return {
        ...state,
        fluxoDeCaixa
      };
    // Adicione mais manipuladores de ação conforme necessário
    default:
      return state;
  }
}

// Provider para encapsular os componentes filhos que consumirão o estado
export const FluxoDeCaixaProvider = ({ children }) => {
  const [state, dispatch] = useReducer(fluxoDeCaixaReducer, initialState);

  return (
    <FluxoDeCaixaContext.Provider value={{ state, dispatch }}>
      {children}
    </FluxoDeCaixaContext.Provider>
  );
};

export default FluxoDeCaixaContext;
