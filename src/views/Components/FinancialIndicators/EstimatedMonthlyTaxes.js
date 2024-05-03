// Componente para exibir os Impostos Mensais Estimados
import React from 'react';

const EstimatedMonthlyTaxes = ({ percentage = "-" }) => (
  <div>
    {percentage}
  </div>
);

export default EstimatedMonthlyTaxes;
