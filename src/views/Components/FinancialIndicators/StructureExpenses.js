import React, { useState, useEffect } from 'react';
import API_BASE_URL from '../../../apiConfig';

const StructureExpenses = () => {
  const [totalStructureExpenses, setTotalStructureExpenses] = useState('Carregando...');

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/despesas/estrutura`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Falha na rede');
        }
        return response.json();
      })
      .then(data => {
        // Assume que 'data' é um array de objetos e cada objeto tem um campo 'custo'
        const total = data.reduce((acc, item) => acc + Number(item.custo), 0);
        setTotalStructureExpenses(`R$ ${total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }).slice(3)}`);
      })
      .catch(error => {
        console.error('Erro ao carregar dados:', error);
        setTotalStructureExpenses('Erro ao carregar dados');
      });
  }, []);

  return (
    <div>{totalStructureExpenses}</div>
  );
};

export default StructureExpenses;
