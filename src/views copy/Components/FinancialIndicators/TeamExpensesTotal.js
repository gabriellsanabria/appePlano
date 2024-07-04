import React, { useState, useEffect } from 'react';
import { API_BASE_URL, API_BASE_URL_AMPLIFY } from '../../../apiConfig';

const TeamExpensesTotal = () => {
  const [totalTeamExpenses, setTotalTeamExpenses] = useState('Carregando...');

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/despesas/equipe`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Falha na rede');
        }
        return response.json();
      })
      .then(data => {
        // Assume que 'data' é um array de objetos e cada objeto tem um campo 'custo'
        const total = data.reduce((acc, item) => acc + Number(item.custo), 0);
        setTotalTeamExpenses(`R$ ${total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }).slice(3)}`);
      })
      .catch(error => {
        console.error('Erro ao carregar dados:', error);
        setTotalTeamExpenses('Erro ao carregar dados');
      });
  }, []);

  return (
    <div>{totalTeamExpenses}</div>
  );
};

export default TeamExpensesTotal;
