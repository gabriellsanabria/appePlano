// Componente para exibir o Payback Esperado
import React from 'react';

const ExpectedPayback = ({ months = "5" }) => (
  <div>
    {months} meses
  </div>
);

export default ExpectedPayback;