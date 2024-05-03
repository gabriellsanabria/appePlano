// Componente para exibir o Pagamento Total Estimado
import React from 'react';

const TotalEstimatedPayments = ({ amount = "-" }) => (
  <div>
    {amount}
  </div>
);

export default TotalEstimatedPayments;
