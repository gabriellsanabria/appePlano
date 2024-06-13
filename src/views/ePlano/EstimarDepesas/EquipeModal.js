import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import './EstimarDepesas.scss';
import { API_BASE_URL, API_BASE_URL_AMPLIFY } from '../../../apiConfig';
import { NumericFormat } from 'react-number-format';

const EquipeModal = ({ isOpen, onClose, onSave }) => {
  const [cargoEquipe, setCargoEquipe] = useState('');
  const [custoEquipe, setCustoEquipe] = useState('');

  const saveEquipe = async (equipe) => {
    const response = await fetch(`${API_BASE_URL}/api/despesas/equipe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ cargo: equipe.nome, custo: equipe.custo }) // Corrigir os nomes dos campos
    });
    return response.json();
  };

  const handleSave = async () => {
    if (!cargoEquipe || !custoEquipe) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
    const custoNum = parseFloat(custoEquipe);
    if (isNaN(custoNum)) {
      alert("Por favor, insira um valor numérico para o custo.");
      return;
    }
    
    const equipe = { nome: cargoEquipe, custo: custoNum };
    
try {
      const data = await saveEquipe(equipe);
      console.log('Salvo com sucesso:', data);
      onClose();  // Fechar modal após salvar
      onSave();   // Chamar a função onSave para atualizar os dados locais
    } catch (error) {
      console.error('Erro ao salvar equipe:', error);
      alert('Erro ao salvar. Tente novamente.');
    }
  };

  const handleValorUnitarioChange = (values) => {
    const { floatValue } = values;
    setCustoEquipe(floatValue); // Atualiza o estado com o novo valor
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
            <h1>Adicione membro da Equipe</h1>
          </div>
          <div className='modal-container'>
            <input
              type="text"
              value={cargoEquipe}
              onChange={(e) => setCargoEquipe(e.target.value)}
              placeholder="Digite o cargo"
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
                value={custoEquipe}
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

export default EquipeModal;
