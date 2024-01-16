// ModalCnpj.js

import React from 'react';
import { FaTimes } from 'react-icons/fa';
import CadastraCnpj from '../ApiCnpj/ConsultaCnpj';

const ModalCadastreEmpresa = ({ isOpen, onClose, cnpjData }) => {
  return (
    <div>
    <div className='overlay' onClick={onClose}></div>
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <span className='close' onClick={onClose}>
        <FaTimes />
      </span>
      <div className='modal-content'>
        <h2>Detalhes do CNPJ</h2>
        <CadastraCnpj />
      </div>
    </div>
    </div>
  );
};

export default ModalCadastreEmpresa;
