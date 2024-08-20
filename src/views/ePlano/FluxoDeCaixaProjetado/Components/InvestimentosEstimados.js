import React, { useState, useEffect } from 'react';
import { API_BASE_URL, API_BASE_URL_AMPLIFY } from  '../../../../apiConfig';
import useAuth from '../../../../hooks/useAuth';

const InvestimentosEstimados = ({ meses }) => {
  const [estruturaInvestimento, setEstruturaInvestimento] = useState(0);
  const [insumosInvestimento, setInsumosInvestimento] = useState(0);
  const [insumosCapitalGiro, setCapitalGiroInvestimento] = useState(0);

  // Obtendo o usuário e o estado de carregamento do hook useAuth
  const { user, loading } = useAuth();
  const userId = user ? user.uid : null;

  useEffect(() => {
    const fetchData = async () => {
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

      } catch (error) {
        console.error('Erro ao buscar os dados da API:', error);
      }
    };

    if (!loading && userId) {
      fetchData();
    }
  }, [loading, userId]);

  // Inicializa os valores apenas no primeiro mês; os outros meses são preenchidos com zero
  const createDynamicValues = (value, numMonths) => {
    return [value, ...Array(numMonths - 1).fill(0)];
  };

  // Mapa de valores para cada categoria de investimento
  const valueMap = {
    "Estrutura Física/ Virtual": createDynamicValues(estruturaInvestimento, meses.length),
    "Insumos": createDynamicValues(insumosInvestimento, meses.length),
    "Capital de Giro": createDynamicValues(insumosCapitalGiro, meses.length),
  };

  // Soma dos investimentos para cada mês
  const sumInvestments = () => 
    valueMap["Estrutura Física/ Virtual"].map((value, index) => 
      value + valueMap["Insumos"][index] + valueMap["Capital de Giro"][index]
    );

  const investmentSums = sumInvestments();

  // Renderização das células do valor de cada categoria
  const renderCells = (item, highlight) => {
    let values = item in valueMap ? valueMap[item] : (item === "INVESTIMENTOS ESTIMADOS" ? investmentSums : Array(meses.length).fill(0));
    return values.map((value, index) => (
      <div key={index} className='cell' style={{ fontWeight: highlight ? 'bold' : 'normal' }}>
        R$ {value.toLocaleString("pt-BR")}
      </div>
    ));
  };

  // Renderização da tabela completa
  const renderTable = (items, highlightItems) => (
    <div className='table'>
      {items.map(item => (
        <div key={item} className='row' style={{ fontWeight: highlightItems.includes(item) ? 'bold' : 'normal' }}>
          <div className='cellCol items-color'>{item}</div>
          <div className='cell total-color'>
            R$ {(item in valueMap ? valueMap[item].reduce((a, b) => a + b, 0) :
                item === "INVESTIMENTOS ESTIMADOS" ? investmentSums.reduce((a, b) => a + b, 0) : 0)
               .toLocaleString("pt-BR")}
          </div>
          {renderCells(item, highlightItems.includes(item))}
        </div>
      ))}
    </div>
  );

  const investimentosEstimados = [
    "INVESTIMENTOS ESTIMADOS",
    "Estrutura Física/ Virtual",
    "Insumos",
    "Capital de Giro",
  ];

  const highlightItems = ["INVESTIMENTOS ESTIMADOS"];

  return (
    <div className='groupLine'>
      {renderTable(investimentosEstimados, highlightItems)}
    </div>
  );
};

export default InvestimentosEstimados;
