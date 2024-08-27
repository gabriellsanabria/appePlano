import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { FaTimes } from 'react-icons/fa';
  import { API_BASE_URL, API_BASE_URL_AMPLIFY } from '../../../apiConfig';

import './EstimarReceitasModal.scss';

const EstimarReceitasModal = ({ isOpen, onClose, onSave }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [valorUnitarioVenda, setValorUnitarioVenda] = useState('');
  const [projecaoVendasPorDia, setProjecaoVendasPorDia] = useState('');
  const [produtosServicos, setProdutosServicos] = useState([]);

  useEffect(() => {
    obterProdutosServicos();
  }, []);

  const obterProdutosServicos = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/produtos_servicos`);
      const data = await response.json();
      // Extrair as opções necessárias para o Select
      const options = data.map((produtoServico) => ({
        value: produtoServico.id,
        label: produtoServico.produto_servico // ou o campo correto que contém o nome do Produto/Serviço
      }));
      setProdutosServicos(options);
    } catch (error) {
      console.error('Erro ao obter produtos/serviços:', error);
    }
  };

  const handleSave = () => {
    onSave({
      produto_servico: selectedOption.label,
      valor_unitario: valorUnitarioVenda,
      quantidade_vendida_por_mes: projecaoVendasPorDia
    });
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
            <h1>Adicionar Receita</h1>
          </div>
          <div className='modal-container'>
            <Select
              value={selectedOption}
              onChange={setSelectedOption}
              options={produtosServicos} // Usar as opções dos produtos e serviços
              placeholder="Selecione o Produto/Serviço..."
            />
            <input
              type="text"
              value={valorUnitarioVenda}
              onChange={(e) => setValorUnitarioVenda(e.target.value)}
              placeholder="Digite o Preço Unitário de Venda (R$)"
            />
            <input
              type="text"
              value={projecaoVendasPorDia}
              onChange={(e) => setProjecaoVendasPorDia(e.target.value)}
              placeholder="Digite a projeção de vendas por mês"
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

export default EstimarReceitasModal;
