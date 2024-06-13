import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

import './ProdutosServicosModal.scss';
import { API_BASE_URL, API_BASE_URL_AMPLIFY } from '../../../apiConfig'; // Importe a URL base da API

const ProdutosServicosModal = ({ isOpen, onClose, addNewProdutoServico }) => {
  const [produtoServico, setProdutoServico] = useState('');
  const [descricao, setDescricao] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/adicionar_produto_servico`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ produto_servico: produtoServico, descricao: descricao }),
      });
      if (!response.ok) {
        throw new Error('Falha ao adicionar produto/serviço');
      }
      // Obter o novo produto/serviço adicionado do corpo da resposta
      const newProdutoServico = await response.json();
      // Chamando a função addNewProdutoServico
      addNewProdutoServico(produtoServico, descricao);

      // Fechar o modal após o sucesso da solicitação
      console.log('aqui',newProdutoServico);
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      // Resetar os campos quando o modal for fechado
      setProdutoServico('');
      setDescricao('');
    }
  }, [isOpen]);

  return (
    <div>
      <div className='overlay' onClick={onClose}></div>
      <div className={`modal-guia ${isOpen ? 'open' : ''}`}>
        <span className='close' onClick={onClose}>
          <FaTimes />
        </span>
        <div className='modal-content'>
          <div className='modal-header'>
            <h1>Adicione um Produto ou Serviço</h1>
          </div>
          <div className='modal-container'>
            <input
              type="text"
              value={produtoServico}
              onChange={(e) => setProdutoServico(e.target.value)}
              placeholder="Digite o nome do produto/serviço..."
            />
            <div className="textarea-container">
              <textarea
                rows="6"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Digite a descrição do produto/serviço..."
              />
            </div>
          </div>
          <div className='footer-modal'>
            <div className='modal-buttons'>
              <button onClick={onClose}>Cancelar</button>
              <button onClick={handleSave} disabled={isLoading}>Salvar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProdutosServicosModal;
