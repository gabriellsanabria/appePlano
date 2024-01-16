// ModalResumoExecutivo.js

import React from 'react';
import { FaTimes } from 'react-icons/fa';

const ModalResumoExecutivo = ({ isOpen, onClose, empresaInfo, onInputChange }) => {
  return (
    <div>
    <div className='overlay' onClick={onClose}></div>
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <span className='close' onClick={onClose}>
        <FaTimes />
      </span>
      <div className='modal-content'>
        <h2>Resumo Executivo</h2>
        {/* Exiba os dados do cnpjData no modal */}
      </div>
    </div>
    </div>
  );
};

export default ModalResumoExecutivo;
