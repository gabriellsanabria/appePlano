// Componente para exibir o Investimento Inicial
import React from 'react';

const InitialInvestment = ({ amount = "R$ 228.000,00" }) => (
  <div>
    {amount}
  </div>
);

export default InitialInvestment;
