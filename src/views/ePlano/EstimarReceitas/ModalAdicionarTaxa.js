import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { API_BASE_URL } from '../../../apiConfig';

import './EstimarReceitasModal.scss';

const ModalAdicionarImposto = ({ isOpen, onClose, onSave }) => {
  const [valorImpostoMensal, setValorImpostoMensal] = useState('');

  const handleSave = () => {
    onSave({
      valor_imposto_mensal: valorImpostoMensal,
    });
    onClose(); // Fechar o modal após salvar
  };

  return (
    <div>
      {isOpen && <div className='overlay' onClick={onClose}></div>}
      <div className={`modal-guia ${isOpen ? 'open' : ''}`}>
        <span className='close' onClick={onClose}>
          <FaTimes />
        </span>
        <div className='modal-content'>
          <div className='modal-header'>            
            <h1>Adicionar Imposto</h1>
          </div>
          <div className='modal-container'>
            <input
              type="text"
              value={valorImpostoMensal}
              onChange={(e) => setValorImpostoMensal(e.target.value)}
              placeholder="Digite o valor do imposto mensal (%)"
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

export default ModalAdicionarImposto;
