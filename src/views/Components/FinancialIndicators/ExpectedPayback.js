// Componente para exibir o Payback Esperado
import React from 'react';

const ExpectedPayback = ({ months = "-" }) => (
  <div>
    {months} meses
  </div>
);

export default ExpectedPayback;