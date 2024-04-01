import React, { useState } from 'react';
import Select from 'react-select';
import { FaTimes, FaArrowLeftLong, FaArrowRightLong, FaQuestionCircle } from 'react-icons/fa';

import './EstruturaNegocioModal.scss';

const EstrutraNegocioModal = ({ isOpen, onClose, onSave }) => {
  const [produtoServico, setProdutoServico] = useState('');
  const [descricao, setDescricao] = useState('');
  const [showHelp, setShowHelp] = useState(false);

  const toggleHelp = () => {
    setShowHelp(!showHelp);
  };

  const handleSave = () => {
    // Aqui você pode salvar os dados
    onSave({ produtoServico, descricao });
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
            <h1>Adicione a estrutura física do seu negócio</h1>
          </div>
          <div className='modal-container'>
              <input
                type="text"
                value={produtoServico}
                onChange={(e) => setProdutoServico(e.target.value)}
                placeholder="Digite o nome da estrutura"
              />
              <input
                type="text"
                value={produtoServico}
                onChange={(e) => setProdutoServico(e.target.value)}
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

export default EstrutraNegocioModal;
