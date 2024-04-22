import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

import './EstimarInvestimentosModal.scss'; // Assumindo que o estilo é adequado para esse modal também

const CapitalGiroModal = ({ isOpen, onClose, onSave }) => {
  const [investimentoTotal, setInvestimentoTotal] = useState('');

  const handleSave = () => {
    const data = {
      investimento_total: investimentoTotal
    };
    onSave(data, 'capital-de-giro');
  };

  return (
    <div>
      <div className='overlay' onClick={onClose}></div>
      <div className={`modal-guia ${isOpen ? 'open' : ''}`}>
        <span className='close' onClick={onClose}>
          <FaTimes />
        </span>
        <div className='modal-content'>
          <div className='modal-header'>            
            <h1>Adicione Capital de Giro</h1>
          </div>
          <div className='modal-container'>
            <input
              type="text"
              value={investimentoTotal}
              onChange={(e) => setInvestimentoTotal(e.target.value)}
              placeholder="Digite o valor do capital de giro"
            />
          </div>            
          <div className='footer-modal'>              
            <div className='modal-buttons'>
              <button onClick={onClose}>Cancelar</button>
              <button onClick={handleSave}>Salvar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CapitalGiroModal;
