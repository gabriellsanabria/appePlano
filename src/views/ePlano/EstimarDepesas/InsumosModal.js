import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import './EstimarDepesasModal.scss';
import { API_BASE_URL, API_BASE_URL_AMPLIFY } from '../../../apiConfig';
import { NumericFormat } from 'react-number-format';

const InsumosModal = ({ isOpen, onClose, onSave }) => {
  const [insumoInsumos, setInsumoInsumos] = useState('');
  const [custoInsumo, setCustoInsumo] = useState('');

  const saveInsumos = async (insumos) => {
    const response = await fetch(`${API_BASE_URL}/api/despesas/insumos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ insumo: insumos.insumo, custo: insumos.custo }) // Ajustado conforme o esperado pelo backend
    });
    return response.json();
  };

  const handleSave = async () => {
    if (!insumoInsumos || !custoInsumo) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
    const custoNum = parseFloat(custoInsumo);
    if (isNaN(custoNum)) {
      alert("Por favor, insira um valor numérico para o custo.");
      return;
    }
    
    const insumos = { insumo: insumoInsumos, custo: custoNum };
    
    try {
      const data = await saveInsumos(insumos);
      console.log('Salvo com sucesso:', data);
      if (data.error) {
        alert("Erro ao salvar: " + data.error);
      } else {
        onClose();  // Fechar modal após salvar
        if (typeof onSave === 'function') {
          onSave();   // Chamar a função onSave para atualizar os dados locais
        }
      }
    } catch (error) {
      console.error('Erro ao salvar insumos:', error);
      alert('Erro ao salvar. Tente novamente.');
    }
  };

  const handleValorUnitarioChange = (values) => {
    const { floatValue } = values;
    setCustoInsumo(floatValue); // Atualiza o estado com o novo valor
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
              value={insumoInsumos}
              onChange={(e) => setInsumoInsumos(e.target.value)}
              placeholder="Digite o insumo"
            />
            <NumericFormat
                displayType={'input'}
                thousandSeparator='.'
                prefix={'R$'}
                decimalSeparator=','
                decimalScale={2}
                fixedDecimalScale={true}
                allowNegative={false}
                isNumericString={false}
                value={custoInsumo}
                placeholder="Digite o valor estimado dessa despesa por mês"
                onValueChange={handleValorUnitarioChange} // Utiliza a função de tratamento
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
