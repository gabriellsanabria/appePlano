import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import './EstimarDepesasModal.scss';
import { API_BASE_URL, API_BASE_URL_AMPLIFY } from '../../../apiConfig';

const EstimarDepesas = ({ isOpen, onClose, onSave }) => {
  const [nomeEstrutura, setNomeEstrutura] = useState('');
  const [custoEstrutura, setCustoEstrutura] = useState('');

  const saveEstrutura = async (estrutura) => {
    const response = await fetch(`${API_BASE_URL}/api/despesas/estrutura`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(estrutura)
    });
    return response.json();
  };

  const handleSave = async () => {
    if (!nomeEstrutura || !custoEstrutura) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
    const custoNum = parseFloat(custoEstrutura);
    if (isNaN(custoNum)) {
      alert("Por favor, insira um valor numérico para o custo.");
      return;
    }
    
    const estrutura = { nome: nomeEstrutura, custo: custoNum };
    
try {
      const data = await saveEstrutura(estrutura);
      console.log('Salvo com sucesso:', data);
      onClose();  // Fechar modal após salvar
      onSave();   // Chamar a função onSave para atualizar os dados locais
    } catch (error) {
      console.error('Erro ao salvar estrutura:', error);
      alert('Erro ao salvar. Tente novamente.');
    }
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
            <h1>Adicione a Estrutura Física/Virtual do Negócio</h1>
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
              value={custoEstrutura}
              onChange={(e) => setCustoEstrutura(e.target.value)}
              placeholder="Digite o valor estimado dessa despesa por mês"
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

export default EstimarDepesas;
