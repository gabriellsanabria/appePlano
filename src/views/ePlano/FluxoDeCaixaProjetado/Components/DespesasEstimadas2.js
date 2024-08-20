import React, { useState, useEffect } from 'react';
import { API_BASE_URL, API_BASE_URL_AMPLIFY } from  '../../../../apiConfig';
import useAuth from '../../../../hooks/useAuth';

const DespesasEstimadas2 = ({ meses }) => {

  const [estruturaDespesas, setEstruturaDespesas] = useState(0);
  const [insumosDespesas, setInsumosDespesas] = useState(0);
  const [equipeDespesas, setEquipeDespesas] = useState(0);

  // Obtendo o usuário e o estado de carregamento do hook useAuth
  const { user, loading } = useAuth();
  const userId = user ? user.uid : null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Busca os dados da API para a estrutura
        const responseEstruturaDespesas = await fetch(`${API_BASE_URL}/api/simulador/despesas/estrutura/user/${userId}`);
        const dataEstrutura = await responseEstruturaDespesas.json();
        const somaDespesasEstrutura = dataEstrutura.reduce((total, item) => total + parseFloat(item.custo), 0);
        setEstruturaDespesas(somaDespesasEstrutura);

        // Busca os dados da API para os insumos
        const responseInsumosDespesas = await fetch(`${API_BASE_URL}/api/simulador/despesas/insumos/user/${userId}`);
        const dataInsumos = await responseInsumosDespesas.json();
        const somaDespesasInsumos = dataInsumos.reduce((total, item) => total + parseFloat(item.custo), 0);
        setInsumosDespesas(somaDespesasInsumos);
        
        // Busca os dados da API para Equipe
        const responseEquipeDespesas = await fetch(`${API_BASE_URL}/api/simulador/despesas/equipe/user/${userId}`);
        const dataEquipe = await responseEquipeDespesas.json();
        const somaDespesasEquipe = dataEquipe.reduce((total, item) => total + parseFloat(item.custo), 0);
        setEquipeDespesas(somaDespesasEquipe);

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
    return [0, ...Array(numMonths - 1).fill(value)];
  };
  
  // Calculando a variação percentual para os insumos
  const insumosVariation1 = [0, 0.2, 0.4, 0.6, 0.8, 1, 1, 1, 1.1, 1.1, 1.1, 1.2, 1.2, 1.2, 1.2, 1.2, 1.2, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5];
  const insumosVariation = insumosVariation1.map(() => 1);
  // Mapa de valores para cada categoria de despesas
  const valueMap = {
    "Estrutura Física/ Virtual": createDynamicValues(estruturaDespesas, meses.length),
    "Equipe de Trabalho": createDynamicValues(equipeDespesas, meses.length),
    "Insumos Operacionais": createDynamicValues(insumosDespesas, meses.length).map((value, index) => value * insumosVariation[index]),
  };
  
  // Soma dos investimentos para cada mês
  const sumInvestments = () => 
    valueMap["Estrutura Física/ Virtual"].map((value, index) => 
      value + valueMap["Equipe de Trabalho"][index] + valueMap["Insumos Operacionais"][index]
    );

  const investmentSums = sumInvestments();

  // Renderização das células do valor de cada categoria
  const renderCells = (item, highlight) => {
    let values = item in valueMap ? valueMap[item] : (item === "DESPESAS ESTIMADAS" ? investmentSums : Array(meses.length).fill(0));
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
                item === "DESPESAS ESTIMADAS" ? investmentSums.reduce((a, b) => a + b, 0) : 0)
               .toLocaleString("pt-BR")}
          </div>
          {renderCells(item, highlightItems.includes(item))}
        </div>
      ))}
    </div>
  );

  const despesasEstimadas = [
    "DESPESAS ESTIMADAS",
    "Estrutura Física/ Virtual",
    "Equipe de Trabalho",
    "Insumos Operacionais",
  ];

  const highlightItems = ["DESPESAS ESTIMADAS"];

  return (
    <div className='groupLine'>
      {renderTable(despesasEstimadas, highlightItems)}
    </div>
  );
};

export default DespesasEstimadas2;
