import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../../../../apiConfig';

const CaixaReal = ({ meses }) => {
  const [caixaLiquido, setCaixaLiquido] = useState(0);
  const [caixaEstoqueInvestimento, setCaixaEstoqueInvestimento] = useState(0);
  const [caixaRecebiveis, setCaixaRecebiveis] = useState(0);
  const [caixaContasPagar, setCaixaContasPagar] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseCaixaLiquido = await fetch(`${API_BASE_URL}/api/caixa/liquido`);
        const dataCaixaLiquido = await responseCaixaLiquido.json();
        const somaCaixaLiquido = dataCaixaLiquido.reduce((total, item) => total + parseFloat(item.valor), 0);
        setCaixaLiquido(somaCaixaLiquido);
        
        const responseCaixaEstoque = await fetch(`${API_BASE_URL}/api/caixa/estoque`);
        const dataCaixaEstoque = await responseCaixaEstoque.json();
        const somaCaixaEstoque = dataCaixaEstoque.reduce((total, item) => total + parseFloat(item.valor), 0);
        setCaixaEstoqueInvestimento(somaCaixaEstoque);

        const responseCaixaRecebiveis = await fetch(`${API_BASE_URL}/api/caixa/recebiveis`);
        const dataCaixaRecebiveis = await responseCaixaRecebiveis.json();
        const somaCaixaRecebiveis = dataCaixaRecebiveis.reduce((total, item) => total + parseFloat(item.valor), 0);
        setCaixaRecebiveis(somaCaixaRecebiveis);

        const responseCaixaContasPagar = await fetch(`${API_BASE_URL}/api/caixa/contas_pagar`);
        const dataCaixaContasPagar = await responseCaixaContasPagar.json();
        const somaCaixaContasPagar = dataCaixaContasPagar.reduce((total, item) => total + parseFloat(item.valor), 0);
        setCaixaContasPagar(somaCaixaContasPagar);
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
    "Caixa: Líquido": createDynamicValues(caixaLiquido, meses.length),
    "Caixa: Estoque": createDynamicValues(caixaEstoqueInvestimento, meses.length),
    "Caixa: Recebíveis": createDynamicValues(caixaRecebiveis, meses.length),
    "Caixa: Contas a Pagar": createDynamicValues(caixaContasPagar, meses.length),
  };

  const sumInvestments = () => 
    valueMap["Caixa: Líquido"].map((value, index) => 
      value + valueMap["Caixa: Estoque"][index] + valueMap["Caixa: Recebíveis"][index] - valueMap["Caixa: Contas a Pagar"][index]
    );

  const investmentSums = sumInvestments();

  const renderCells = (item, highlight) => {
    let values = item in valueMap ? valueMap[item] : (item === "CAIXA INICIAL: BASE MÊS 1" ? investmentSums : Array(meses.length).fill(0));
    return values.map((value, index) => (
      <div key={index} className='cell' style={{fontWeight: highlight ? 'bold' : 'normal'}}>
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
                item === "CAIXA INICIAL: BASE MÊS 1" ? investmentSums.reduce((a, b) => a + b, 0) : 0)
               .toLocaleString("pt-BR")}
          </div>
          {renderCells(item, highlightItems.includes(item))}
        </div>
      ))}
    </div>
  );

  const caixaInicial = [
    "CAIXA INICIAL: BASE MÊS 1",
    "Caixa: Líquido",
    "Caixa: Estoque",
    "Caixa: Recebíveis",
    "Caixa: Contas a Pagar",
  ];

  const highlightItems = ["CAIXA INICIAL: BASE MÊS 1"];

  return (
    <div className='groupLine'>        
      {renderTable(caixaInicial, highlightItems)}
    </div>
  );
};

export default CaixaReal;
