import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { API_BASE_URL } from '../../../apiConfig';

const SideFormProdutos = ({ closeSideForm, onAdd }) => {
  const [produtoServico, setProdutoServico] = useState('');
  const [descricao, setDescricao] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    closeSideForm(); // Calling the closeSideForm function received via props
  };

  const handleSave = async () => {
    try {
      // Verifica se os campos estão vazios
      if (!produtoServico || !descricao) {
        throw new Error('Por favor, preencha todos os campos.');
      }
  
      setIsLoading(true);
  
      // Monta o objeto com os dados a serem enviados
      const bodyData = {
        produto_servico: produtoServico,
        descricao: descricao,
      };
  
      console.log('Dados a serem enviados:', bodyData);
  
      const response = await fetch(`${API_BASE_URL}/adicionar_produto_servico`, {
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
          <h1>Cadastre um produto/serviço</h1>
      </div>
      <div className='sideForm-body'>
          <div className='form-content'>
              <label>Nome do Produto/Serviço</label>
              <input
                type="text"
                value={produtoServico}
                onChange={(e) => setProdutoServico(e.target.value)}
                placeholder="Digite o nome do produto/serviço..."
              />
          </div>            
          <div className='form-content'>
              <label>Descrição</label>
              <textarea
                rows="8"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Digite a descrição do produto/serviço..."
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

SideFormProdutos.propTypes = {
  closeSideForm: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired, // Ensure onAdd is required and of type function
};

export default SideFormProdutos;
