import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { NumericFormat } from 'react-number-format';
import { API_BASE_URL } from '../../../apiConfig';
import useAuth from '../../../hooks/useAuth';

const SideFormEstimarReceitas = ({ closeSideForm, onAdd, actionType, idForEdit }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [valorUnitarioVenda, setValorUnitarioVenda] = useState('');
  const [projecaoVendasPorDia, setProjecaoVendasPorDia] = useState('');
  const [produtosServicos, setProdutosServicos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const { user, loading } = useAuth();
  const userId = user ? user.uid : null;

  useEffect(() => {
    if (!loading && userId) {
      obterProdutosServicos();
      if (actionType === 'edit' && idForEdit) {
        obterReceitaParaEdicao(idForEdit);
        setIsEditMode(true); // Define o modo de edição
      } else {
        setIsEditMode(false); // Desativa o modo de edição se não estiver editando
      }
    }
  }, [loading, userId, actionType, idForEdit]);

  const obterProdutosServicos = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/simulador/produtos_servicos/${userId}`);
      if (!response.ok) {
        throw new Error('Erro ao obter produtos/serviços');
      }
      const data = await response.json();
      const options = data.map((produtoServico) => ({
        value: produtoServico.id,
        label: produtoServico.produto_servico
      }));
      options.sort((a, b) => a.label.localeCompare(b.label));
      setProdutosServicos(options);

      // Se estiver editando, defina a opção selecionada
      if (isEditMode && selectedOption) {
        const option = options.find(opt => opt.value === selectedOption.value);
        setSelectedOption(option || null);
      }
    } catch (error) {
      console.error('Erro ao obter produtos/serviços:', error.message);
      alert(error.message);
    }
  };

  const obterReceitaParaEdicao = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/simulador/receitas_mensais_negocio/${id}`);
      if (!response.ok) {
        throw new Error('Erro ao obter receita para edição');
      }
      const data = await response.json();
      console.log('Dados recebidos para edição:', data); // Adiciona este log para depuração
      setSelectedOption({ value: data.produto_servico_id, label: data.produto_servico });
      setValorUnitarioVenda(data.valor_unitario || '');
      setProjecaoVendasPorDia(data.quantidade_vendida_por_mes || '');
    } catch (error) {
      console.error('Erro ao obter receita para edição:', error.message);
      alert(error.message);
    }
  };

  const handleClose = () => {
    closeSideForm();
  };

  const handleSave = async () => {
    try {
      if (!selectedOption || !valorUnitarioVenda || !projecaoVendasPorDia) {
        throw new Error('Por favor, preencha todos os campos.');
      }

      setIsLoading(true);

      const bodyData = {
        produto_servico: selectedOption.label,
        valor_unitario: valorUnitarioVenda,
        quantidade_vendida_por_mes: projecaoVendasPorDia,
        uidUser: userId
      };

      const url = isEditMode
        ? `${API_BASE_URL}/api/simulador/receitas_mensais_negocio/${idForEdit}`
        : `${API_BASE_URL}/api/simulador/adicionar_receita_mensal_negocio`;

      const method = isEditMode ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyData),
      });

      if (!response.ok) {
        throw new Error(isEditMode ? 'Falha ao atualizar Receita' : 'Falha ao adicionar Receita');
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

  const handleValorUnitarioChange = (values) => {
    const { floatValue } = values;
    setValorUnitarioVenda(floatValue || '');
  };

  return (
    <>
      <div className='sideForm-header'>
        <h1>{isEditMode ? 'Editar Receita' : 'Adicionar Receita'}</h1>
      </div>
      <div className='sideForm-body'>
        <div className='form-content'>
          <label>Selecione o Produto/Serviço</label>
          <Select
            value={selectedOption}
            onChange={setSelectedOption}
            options={produtosServicos}
            placeholder="Selecione o Produto/Serviço..."
            styles={{
              control: (provided) => ({
                ...provided,
                backgroundColor: '#fff',
                marginLeft: '0px',
                marginRight: '0px',
                marginTop: '10px',
                padding: '12px 10px',
                flex: 1,
                borderRadius: '5px',
                fontSize: '14px',
                cursor: 'pointer'
              }),
              container: (provided) => ({
                ...provided,
                flex: 1,
              }),
              menu: (provided) => ({
                ...provided,
                backgroundColor: '#f3f3f3',
                borderRadius: '5px'
              }),
              option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isSelected ? '#fff' : '#EFF0F6',
                color: 'black',
                borderRadius: '0px',
                fontSize: '14px',
                cursor: 'pointer',
                paddingLeft: '20px',
                textAlign: 'left',
                '&:hover': {
                  backgroundColor: '#ccc',
                },
              }),
            }}
          />
        </div>
        <div className='form-content'>
          <label>Preço de Venda (R$)</label>
          <NumericFormat
            displayType={'input'}
            thousandSeparator='.'
            prefix={'R$'}
            decimalSeparator=','
            decimalScale={2}
            fixedDecimalScale={true}
            allowNegative={false}
            isNumericString={false}
            value={valorUnitarioVenda}
            placeholder="Digite o Preço Unitário de Venda (R$)"
            onValueChange={handleValorUnitarioChange}
          />
        </div>
        <div className='form-content'>
          <label>Estimativa de Vendas</label>
          <input
            type="text"
            value={projecaoVendasPorDia}
            onChange={(e) => setProjecaoVendasPorDia(e.target.value)}
            placeholder="Digite a Quantidade Estimada de Vendas por Mês"
          />
        </div>
      </div>
      <div className='sideForm-footer'>
        <button className='cancelButton' onClick={handleClose}>Cancelar</button>
        <button className='saveButton' onClick={handleSave} disabled={isLoading}>
          {isEditMode ? 'Atualizar' : 'Salvar'}
        </button>
      </div>
    </>
  );
};

SideFormEstimarReceitas.propTypes = {
  closeSideForm: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  actionType: PropTypes.string.isRequired,
  idForEdit: PropTypes.string, // Pode ser nulo para adição
};

export default SideFormEstimarReceitas;
