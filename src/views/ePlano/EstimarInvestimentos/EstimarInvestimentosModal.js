import React, { useState } from 'react';
import Select from 'react-select';
import { FaTimes, FaArrowLeftLong, FaArrowRightLong, FaQuestionCircle } from 'react-icons/fa';

import './EstimarInvestimentosModal.scss';

const EstimarInvestimentosModal = ({ isOpen, onClose, onSave }) => {
  const [nomeEstrutura, setNomeEstrutura] = useState('');
  const [valorEstimado, setValorEstimado] = useState('');
  const [showHelp, setShowHelp] = useState(false);

  const toggleHelp = () => {
    setShowHelp(!showHelp);
  };

  const handleSave = () => {
    const data = {
      estrutura: nomeEstrutura,
      investimento: parseFloat(valorEstimado)
    };
    onSave(data, 'estrutura');
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
            <h1>Adicione os investimentos de estrutura física</h1>
          </div>
          <div className='modal-container'>
              <input
                type="text"
                value={nomeEstrutura}
                onChange={(e) => setNomeEstrutura(e.target.value)}
                placeholder="Digite o nome da estrutura"
              />
              <input
                type="text"
                value={valorEstimado}
                onChange={(e) => setValorEstimado(e.target.value)}
                placeholder="Digite o valor estimado dessa despesa por mês"
              />
              
                <div>
            </div>
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

export default EstimarInvestimentosModal;
