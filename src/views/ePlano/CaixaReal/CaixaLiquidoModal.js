import React, { useState } from 'react';
import Select from 'react-select';
import { FaTimes, FaArrowLeftLong, FaArrowRightLong, FaQuestionCircle } from 'react-icons/fa';
import { NumericFormat } from 'react-number-format';

import './CaixaModal.scss';

const CaixaLiquidoModal = ({ isOpen, onClose, onSave }) => {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [showHelp, setShowHelp] = useState(false);

  const toggleHelp = () => {
    setShowHelp(!showHelp);
  };

  const handleSave = () => {
    const data = {
      descricao: descricao,
      valor: parseFloat(valor)
    };
    onSave(data, 'liquido');
  };
  
  const handleValorUnitarioChange = (values) => {
    const { floatValue } = values;
    setValor(floatValue); // Atualiza o estado com o novo valor
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
            <h1>Adicione um item do Caixa Líquido</h1>
          </div>
          <div className='modal-container'>
              <input
                type="text"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Digite um item"
              />
            <NumericFormat
                displayType={'input'}
                thousandSeparator='.'
                decimalSeparator=','
                decimalScale={2}
                fixedDecimalScale={true}
                allowNegative={false}
                isNumericString={false}
                value={valor}
                placeholder="Digite o valor R$"
                onValueChange={handleValorUnitarioChange} // Utiliza a função de tratamento
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

export default CaixaLiquidoModal;
