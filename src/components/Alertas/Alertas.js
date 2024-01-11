import React from 'react';
import './Alertas.scss'; // Certifique-se de criar um arquivo CSS para estilizar seus alertas

const Alertas = ({ color, message }) => {
  return (
    <div className={`alert ${color}`}>
      <p>{message}</p>
    </div>
  );
};

export default Alertas;
