// Componente para exibir o Lucro Líquido Mensal (LLM)
import React from 'react';

const NetMonthlyProfit = ({ amount = "R$ -" }) => (
  <div>
    {amount}
  </div>
);

export default NetMonthlyProfit;
