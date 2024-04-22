import React, { useRef } from 'react';

const LucroLiquidoMensal = ({ meses }) => {
  const createDynamicValues = (value, numMonths) => Array(numMonths).fill(value);

  const valueMap = {
    "Lucro Líquido Mensal": createDynamicValues(100, meses.length),
  };

  const sumInvestments = () => 
    valueMap["Lucro Líquido Mensal"].map((value, index) => 
      value
    );

  const investmentSums = sumInvestments();

  const renderCells = (item, highlight) => {
    let values = item in valueMap ? valueMap[item] : (item === "Lucro Líquido Mensal" ? investmentSums : Array(meses.length).fill(0));
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
          <div className='cellCol'>{item}</div>
          <div className='cell'>
            R$ {(item in valueMap ? valueMap[item].reduce((a, b) => a + b, 0) :
                item === "Lucro Líquido Mensal" ? investmentSums.reduce((a, b) => a + b, 0) : 0)
               .toLocaleString("pt-BR")}
          </div>
          {renderCells(item, highlightItems.includes(item))}
        </div>
      ))}
    </div>
  );

  const lucroLiquidoMensal = [
    "Lucro Líquido Mensal",
  ];

  const highlightItems = ["Lucro Líquido Mensal"];

  return (
    <div className='groupLine'>        
      {renderTable(lucroLiquidoMensal, highlightItems)}
    </div>
  );
};

export default LucroLiquidoMensal;
