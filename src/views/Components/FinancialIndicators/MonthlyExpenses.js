// Componente para exibir a Despesa Mensal
import React from 'react';

const MonthlyExpenses = ({ amount = 'R$ -' }) => (
  <div>
    {amount}
  </div>
);

export default MonthlyExpenses;
