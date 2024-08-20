import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { API_BASE_URL } from '../../../apiConfig';

const SideFormImpostos = ({ closeSideForm, onAdd }) => {
  const [valorImpostoMensal, setValorImpostoMensal] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    closeSideForm(); // Calling the closeSideForm function received via props
  };

  const handleSave = async () => {
    try {
      // Verifica se os campos estão vazios
      if (!valorImpostoMensal ) {
        throw new Error('Por favor, preencha todos os campos.');
      }
  
      setIsLoading(true);
  
      // Monta o objeto com os dados a serem enviados
      const bodyData = {
        valor_imposto_mensal: valorImpostoMensal,
      };
  
      console.log('Dados a serem enviados:', bodyData);
  
      const response = await fetch(`${API_BASE_URL}/adicionar_imposto_mensal`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyData),
      });
  
      if (!response.ok) {
        throw new Error('Falha ao adicionar produto/serviço');
      }
  
      // Chama a função onAdd passada de PageHeader para atualizar o estado em Planejador
      onAdd(bodyData);
  
      // Fechar o modal após uma solicitação bem-sucedida
      closeSideForm();
    } catch (error) {
      console.error('Erro ao salvar:', error.message);
  
      // Exibe uma mensagem para o usuário informando que é necessário preencher os campos
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <>
      <div className='sideForm-header'>
          <h1>Informe o imposto estimado</h1>
      </div>
      <div className='sideForm-body'>          
          <div className='form-content'>
              <label>Digite a % do imposto estimado mensal</label>              
            <input
              type="text"
              value={valorImpostoMensal}
              onChange={(e) => setValorImpostoMensal(e.target.value)}
              placeholder="Digite o valor do imposto mensal (%)"
            />
          </div>            
      </div>
      <div className='sideForm-footer'>
          <button className='cancelButton' onClick={handleClose}>Cancelar</button>
          <button className='saveButton' onClick={handleSave}>Salvar</button>
      </div>
    </>
  );
};

SideFormImpostos.propTypes = {
  closeSideForm: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired, // Ensure onAdd is required and of type function
};

export default SideFormImpostos;
