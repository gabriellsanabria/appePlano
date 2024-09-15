import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { API_BASE_URL } from '../../../apiConfig';
import useAuth from '../../../hooks/useAuth';

const SideFormProdutos = ({ closeSideForm, onAdd, actionType, idForEdit }) => {
  const [produtoServico, setProdutoServico] = useState('');
  const [descricao, setDescricao] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const { user, loading } = useAuth();
  const userId = user ? user.uid : null;

  useEffect(() => {
    if (idForEdit) {
      setIsEditMode(true);
      fetchData();
    } else {
      setIsEditMode(false);
    }
  }, [idForEdit]);

  const fetchData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/simulador/produtos_servicos/${idForEdit}`);
      if (!response.ok) {
        throw new Error('Falha ao buscar dados para edição');
      }
      const data = await response.json();
      setProdutoServico(data.produto_servico);
      setDescricao(data.descricao);
    } catch (error) {
      console.error('Erro ao buscar dados:', error.message);
      alert(error.message);
    }
  };

  const handleClose = () => {
    closeSideForm();
  };

  const handleSave = async () => {
    try {
      if (!produtoServico) {
        throw new Error('Por favor, preencha todos os campos.');
      }

      setIsLoading(true);

      const bodyData = {
        produto_servico: produtoServico,
        descricao: descricao,
        uidUser: userId,
      };

      const url = isEditMode
        ? `${API_BASE_URL}/api/simulador/produto_servico/${idForEdit}`
        : `${API_BASE_URL}/api/simulador/produto_servico`;

      const method = isEditMode ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyData),
      });

      if (!response.ok) {
        throw new Error(isEditMode ? 'Falha ao atualizar Produto/Serviço' : 'Falha ao adicionar Produto/Serviço');
      }

      if (actionType === 'edit') {
        onAdd({ ...bodyData, id: idForEdit });
      } else {
        onAdd(bodyData);
      }

      closeSideForm();
    } catch (error) {
      console.error('Erro ao salvar:', error.message);
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className='sideForm-header'>
        <h1>{isEditMode ? 'Editar Produto/Serviço' : 'Cadastre um Produto/Serviço'}</h1>
      </div>
      <div className='sideForm-body'>
        <div className='form-content'>
          <label>Nome do Produto/Serviço</label>
          <input
            type="text"
            value={produtoServico}
            onChange={(e) => setProdutoServico(e.target.value)}
            placeholder="Digite o nome do Produto/Serviço..."
          />
        </div>
        <div className='form-content'>
          <label>Descrição</label>
          <textarea
            rows="8"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Digite a descrição do Produto/Serviço..."
          />
        </div>
      </div>
      <div className='sideForm-footer'>
        <button className='cancelButton' onClick={handleClose}>Cancelar</button>
        <button className='saveButton' onClick={handleSave} disabled={isLoading}>
          {isEditMode ? 'Editar' : 'Cadastrar'}
        </button>
      </div>
    </>
  );
};

SideFormProdutos.propTypes = {
  closeSideForm: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  actionType: PropTypes.string.isRequired,
  idForEdit: PropTypes.string,
};

export default SideFormProdutos;
