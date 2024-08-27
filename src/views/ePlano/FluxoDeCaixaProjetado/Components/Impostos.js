import React, { useRef } from 'react';
import { API_BASE_URL, API_BASE_URL_AMPLIFY } from  '../../../../apiConfig';
import useAuth from '../../../../hooks/useAuth';

const Impostos = ({meses}) => {
  const generateMonths = (numMonths) => Array.from({ length: numMonths }, (_, i) => `Mês ${i + 1}`);

  const createDynamicValues = (value, numMonths) => Array(numMonths).fill(value);

  // Obtendo o usuário e o estado de carregamento do hook useAuth
  const { user, loading } = useAuth();
  const userId = user ? user.uid : null;
  
  const valueMap = {
    "IMPOSTOS": createDynamicValues(15, meses.length),
  };

  const sumInvestments = () => 
    valueMap["IMPOSTOS"].map((value, index) => 
      value
    );

  const investmentSums = sumInvestments();

  const renderCells = (item, highlight) => {
    let values = item in valueMap ? valueMap[item] : (item === "IMPOSTOS" ? investmentSums : Array(meses.length).fill(0));
    return values.map((value, index) => (
      <div key={index} className='cell' style={{
        fontWeight: highlight ? 'bold' : 'normal'
      }}>
        {value}%
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
          {/* <div className='cell'>
            {item === "IMPOSTOS" ? "-" : // Modificação aqui
            `R$ ${(item in valueMap ? valueMap[item].reduce((a, b) => a + b, 0) :
              item === "IMPOSTOS" ? investmentSums.reduce((a, b) => a + b, 0) : 0)
              .toLocaleString("pt-BR")}`}
          </div> */}
          <div></div>
          {renderCells(item, highlightItems.includes(item))}
        </div>
      ))}
    </div>
  );
  

  const caixaInicial = [
    "IMPOSTOS",
  ];

  const highlightItems = ["IMPOSTOS"];

  return (
    <div className='groupLine'>        
      {renderTable(caixaInicial, highlightItems)}
    </div>
  );
};

export default Impostos;
