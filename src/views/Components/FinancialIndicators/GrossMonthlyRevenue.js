import React, { useState, useEffect } from 'react';
import { API_BASE_URL, API_BASE_URL_AMPLIFY } from '../../../apiConfig';

const GrossMonthlyRevenue = () => {
  const [amount, setAmount] = useState('Carregando...');

  useEffect(() => {
    fetch(`${API_BASE_URL}/receitas_mensais_negocio`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Falha na rede');
      })
      .then(data => {
        // Calculando o total individual e somando para obter o total geral
        const totalRevenue = data.reduce((acc, curr) => {
          const totalIndividual = (curr.quantidade_vendida_por_mes * parseFloat(curr.valor_unitario));
          return acc + totalIndividual;
        }, 0);

        setAmount(`R$ ${totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);
      })
      .catch(error => { 
        console.error('Falha ao carregar dados:', error);
        setAmount('Erro ao carregar dados');
      });
  }, []);

  return (
    <div>
      {amount}
    </div>
  );
};

export default GrossMonthlyRevenue;
