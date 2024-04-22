// Componente para exibir o Pagamento Total Estimado
import React from 'react';

const TotalEstimatedPayments = ({ amount = "R$ 278.800,00" }) => (
  <div>
    {amount}
  </div>
);

export default TotalEstimatedPayments;
