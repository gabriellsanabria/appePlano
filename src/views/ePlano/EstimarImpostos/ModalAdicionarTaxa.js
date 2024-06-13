import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { API_BASE_URL } from '../../../apiConfig';
import './EstimarReceitasModal.scss';
import { NumericFormat } from 'react-number-format';

const ModalAdicionarImposto = ({ isOpen, onClose, onSave }) => {
  
  const [valorImpostoMensal, setValorImpostoMensal] = useState('');
  const [nomeImposto, setNomeImposto] = useState('');
  const [existingImposto, setExistingImposto] = useState(null);

  useEffect(() => {
    const fetchExistingImposto = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/listar_impostos_mensais?uidUser=ftIdNW165-SE`);
        if (response.ok) {
          const impostos = await response.json();
          if (impostos.length > 0) {
            setExistingImposto(impostos[0]); // Assumindo que só há um imposto por usuário
            setValorImpostoMensal(impostos[0].valor_imposto_mensal.toString());
            setNomeImposto(impostos[0].nome_imposto);
          }
        } else {
          console.error('Erro ao obter os impostos:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao obter os impostos:', error);
      }
    };

    if (isOpen) {
      fetchExistingImposto();
    }
  }, [isOpen]);

  const handleSave = async () => {
    const impostoData = {
      valor_imposto_mensal: parseFloat(valorImpostoMensal),
      uidUser: 'ftIdNW165-SE',
      nome_imposto: nomeImposto,
    };

    try {
      if (existingImposto) {
        // Se existir um imposto, atualiza-o
        const response = await fetch(`${API_BASE_URL}/atualizar_imposto_mensal/${existingImposto.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(impostoData),
        });

        if (response.ok) {
          const result = await response.json();
          onSave(result);
          onClose(); // Fechar o modal após salvar
        } else {
          console.error('Erro ao atualizar o imposto:', response.statusText);
        }
      } else {
        // Caso contrário, adiciona um novo imposto
        const response = await fetch(`${API_BASE_URL}/adicionar_imposto_mensal`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(impostoData),
        });

        if (response.ok) {
          const result = await response.json();
          onSave(result);
          onClose(); // Fechar o modal após salvar
        } else {
          console.error('Erro ao salvar o imposto:', response.statusText);
        }
      }
    } catch (error) {
      console.error('Erro ao salvar o imposto:', error);
    }
  };

  const handleValorUnitarioChange = (values) => {
    const { floatValue } = values;
    setValorImpostoMensal(floatValue); // Atualiza o estado do valor do imposto mensal
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
              value={nomeImposto}
              onChange={(e) => setNomeImposto(e.target.value)}
              placeholder="Digite o nome do imposto"
            />
            <NumericFormat
                displayType={'input'}
                thousandSeparator='.'
                decimalSeparator=','
                decimalScale={2}
                fixedDecimalScale={true}
                allowNegative={false}
                isNumericString={false}
                value={valorImpostoMensal}
                placeholder="Digite o valor do imposto mensal (%)"
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

export default ModalAdicionarImposto;
