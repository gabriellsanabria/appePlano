// Componente para exibir o Lucro Líquido Mensal (LLM)
import React from 'react';

const NetMonthlyProfit = ({ amount = "R$ 67.900,00" }) => (
  <div>
    {amount}
  </div>
);

export default NetMonthlyProfit;
