import React, { useState } from 'react';
import Select from 'react-select';
import { FaTimes } from 'react-icons/fa';

import './EstimarReceitasModal.scss';

const EstimarReceitasModal = ({ isOpen, onClose, onSave }) => {
  const [produtoServico, setProdutoServico] = useState('');
  const [valorUnitarioVenda, setValorUnitarioVenda] = useState('');
  const [projecaoVendasPorDia, setProjecaoVendasPorDia] = useState('');
  const [diasTrabalhados, setDiasTrabalhados] = useState('');

  const options = [
    { value: 'shampoo', label: 'Shampoo para Cachorro de 200ml' },
    { value: 'racao', label: 'Ração Premium para Gatos - 1kg' },
    { value: 'coleira', label: 'Coleira Antipulgas e Carrapatos' },
    { value: 'brinquedo', label: 'Brinquedo Interativo para Cães - Bola de Tênis' },
    { value: 'areia', label: 'Areia Sanitária para Gatos - 5kg' }
  ];

  const handleProdutoServicoChange = (selectedOption) => {
    setProdutoServico(selectedOption);
  };

  const handleSave = () => {
    onSave({ produtoServico, valorUnitarioVenda, projecaoVendasPorDia, diasTrabalhados });
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
                value={produtoServico}
                onChange={handleProdutoServicoChange}
                options={options}
                placeholder="Selecione o produto/serviço..."
                styles={{
                  control: (provided) => ({
                    ...provided,
                    width: '100%' // Define a largura como 100%
                  })
                }}
              />
              <input
                type="text"
                value={valorUnitarioVenda}
                onChange={(e) => setValorUnitarioVenda(e.target.value)}
                placeholder="Digite o valor (R$) unitário de venda"
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
