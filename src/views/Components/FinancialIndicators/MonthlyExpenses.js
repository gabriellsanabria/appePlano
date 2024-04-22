// Componente para exibir a Despesa Mensal
import React from 'react';

const MonthlyExpenses = ({ amount = "R$ 68.800,00" }) => (
  <div>
    {amount}
  </div>
);

export default MonthlyExpenses;
