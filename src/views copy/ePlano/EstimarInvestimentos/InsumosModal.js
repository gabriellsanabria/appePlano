import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

import './EstimarInvestimentosModal.scss';

const InsumosModal = ({ isOpen, onClose, onSave }) => {
  const [insumo, setInsumo] = useState('');
  const [investimento, setInvestimento] = useState('');
  const [showHelp, setShowHelp] = useState(false);

  const toggleHelp = () => {
    setShowHelp(!showHelp);
  };

  
  const handleSave = () => {
    const data = {
      insumo: insumo,
      investimento: investimento
    };
    onSave(data, 'insumos');
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
            <h1>Adicione os insumos</h1>
          </div>
          <div className='modal-container'>
            <input
              type="text"
              value={insumo}
              onChange={(e) => setInsumo(e.target.value)}
              placeholder="Digite o nome do insumo"
            />
            <input
              type="text"
              value={investimento}
              onChange={(e) => setInvestimento(e.target.value)}
              placeholder="Digite o valor estimado dessa despesa mensal"
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

export default InsumosModal;
