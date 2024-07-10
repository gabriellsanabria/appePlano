import React from 'react';

const Alertas = ({ message, type, onClose }) => {
  let alertClassName = 'alert';

  // Determinar a classe CSS com base no tipo de alerta
  switch (type) {
    case 'success':
      alertClassName += ' success-message';
      break;
    case 'error':
      alertClassName += ' error-message';
      break;
    case 'warning':
      alertClassName += ' warning-message';
      break;
    default:
      break;
  }

  return (
    <div id='alerta' className={alertClassName}>
      {message}
      <span className="closeAlertbtn" onClick={onClose}>&times;</span>
    </div>
  );
};

export default Alertas;
