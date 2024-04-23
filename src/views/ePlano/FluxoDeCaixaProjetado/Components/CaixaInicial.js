import React, { useState, useEffect } from 'react';
import { API_BASE_URL, API_BASE_URL_AMPLIFY } from  '../../../../apiConfig';


const CaixaInicial = ({ meses }) => {

  const [insumosInvestimento, setInsumosInvestimento] = useState(0);
  const [insumosCapitalGiro, setCapitalGiroInvestimento] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
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

      } catch (error) {
        console.error('Erro ao buscar os dados da API:', error);
      }
    };

    fetchData();
  }, []);

  const createDynamicValues = (value, numMonths) => {
    return Array(numMonths).fill(0).map((val, index) => index === 1 ? value : val);
  };
  

  const valueMap = {
    "Caixa Investimento: Estoque": createDynamicValues(insumosInvestimento, meses.length),
    "Caixa: Investimento Capital de Giro": createDynamicValues(insumosCapitalGiro, meses.length),
  };

  const sumInvestments = () => 
    valueMap["Caixa Investimento: Estoque"].map((value, index) => 
      value + valueMap["Caixa: Investimento Capital de Giro"][index]
    );

  const investmentSums = sumInvestments();

  const renderCells = (item, highlight) => {
    let values = item in valueMap ? valueMap[item] : (item === "CAIXA INICIAL: BASE MÊS 0" ? investmentSums : Array(meses.length).fill(0));
    return values.map((value, index) => (
      <div key={index} className='cell' style={{
        fontWeight: highlight ? 'bold' : 'normal'
      }}>
        R$ {value.toLocaleString("pt-BR")}
      </div>
    ));
  };

  const renderTable = (items, highlightItems) => (
    <div className='table'>
      {items.map(item => (
        <div key={item} className='row' style={{
          fontWeight: highlightItems.includes(item) ? 'bold' : 'normal'
        }}>
          <div className='cellCol items-color'>{item}</div>
          <div className='cell total-color'>
            R$ {(item in valueMap ? valueMap[item].reduce((a, b) => a + b, 0) :
                item === "CAIXA INICIAL: BASE MÊS 0" ? investmentSums.reduce((a, b) => a + b, 0) : 0)
               .toLocaleString("pt-BR")}
          </div>
          {renderCells(item, highlightItems.includes(item))}
        </div>
      ))}
    </div>
  );

  const caixaInicial = [
    "CAIXA INICIAL: BASE MÊS 0",
    "Caixa Investimento: Estoque",
    "Caixa: Investimento Capital de Giro",
  ];

  const highlightItems = ["CAIXA INICIAL: BASE MÊS 0"];

  return (
    <div className='groupLine'>        
      {renderTable(caixaInicial, highlightItems)}
    </div>
  );
};

export default CaixaInicial;
