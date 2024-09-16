import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { NumericFormat } from 'react-number-format';
import { API_BASE_URL } from '../../../apiConfig';
import useAuth from '../../../hooks/useAuth';

const SideFormEstimarDespesas = ({ closeSideForm, onAdd, actionType, idForEdit }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [nomeDespesa, setNomeDespesa] = useState('');
  const [valorEstimadoDespesa, setValorEstimadoDespesa] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { user, loading } = useAuth();
  const userId = user ? user.uid : null;

  const categoriaDespesaOptions = [
    { value: 'estrutura', label: 'Estrutura' },
    { value: 'equipe', label: 'Equipe' },
    { value: 'insumos', label: 'Insumos' },
  ];

  useEffect(() => {
    if (!loading && userId) {
      if (actionType === 'edit' && idForEdit) {
        obterDespesaParaEdicao(idForEdit);
      }
    }
  }, [loading, userId, actionType, idForEdit]);

  const obterDespesaParaEdicao = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/simulador/despesas/${id}`);
      const data = await response.json();

      if (data) {
        setSelectedOption({ value: data.categoria_despesa, label: data.categoria_despesa });
        setNomeDespesa(data.nome || data.cargo || data.insumo);
        setValorEstimadoDespesa(data.custo);
      }
    } catch (error) {
      console.error('Erro ao obter despesa para edição:', error);
    }
  };

  const handleClose = () => {
    closeSideForm();
  };

  const handleSave = async () => {
    try {
      if (!selectedOption || !nomeDespesa || !valorEstimadoDespesa) {
        throw new Error('Por favor, preencha todos os campos.');
      }

      setIsLoading(true);

      let campoNome = '';
      let campoCusto = '';

      switch (selectedOption.value) {
        case 'estrutura':
          campoNome = 'nome';
          campoCusto = 'custo';
          break;
        case 'equipe':
          campoNome = 'cargo';
          campoCusto = 'custo';
          break;
        case 'insumos':
          campoNome = 'insumo';
          campoCusto = 'custo';
          break;
        default:
          throw new Error('Categoria de despesa inválida.');
      }

      const bodyData = {
        categoria_despesa: selectedOption.label,
        [campoNome]: nomeDespesa,
        [campoCusto]: valorEstimadoDespesa,
        user_id: userId,
      };

      const url = actionType === 'edit'
        ? `${API_BASE_URL}/api/simulador/despesas/${idForEdit}`
        : `${API_BASE_URL}/api/simulador/despesas/${selectedOption.value}`;

      const method = actionType === 'edit' ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyData),
      });

      if (!response.ok) {
        throw new Error(actionType === 'edit' ? 'Falha ao atualizar despesa' : 'Falha ao adicionar despesa');
      }

      onAdd(bodyData);

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
        <h1>{actionType === 'edit' ? 'Editar Despesa' : 'Adicionar Despesa'}</h1>
      </div>
      <div className='sideForm-body'>
        <div className='form-content'>
          <label>Selecione a Categoria da Despesa</label>
          <Select
            value={selectedOption}
            onChange={setSelectedOption}
            options={categoriaDespesaOptions}
            placeholder="Selecione a Categoria da Despesa..."
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
          <label>Nome da Despesa</label>
          <input
            type="text"
            value={nomeDespesa}
            onChange={(e) => setNomeDespesa(e.target.value)}
            placeholder="Digite o Nome da Despesa"
          />
        </div>
        <div className='form-content'>
          <label>Valor Estimado da Despesa por Mês (R$)</label>
          <NumericFormat
            displayType={'input'}
            thousandSeparator='.'
            prefix={'R$'}
            decimalSeparator=','
            decimalScale={2}
            fixedDecimalScale={true}
            allowNegative={false}
            isNumericString={false}
            value={valorEstimadoDespesa}
            placeholder="Digite o Valor Estimado da Despesa por Mês (R$)"
            onValueChange={(values) => setValorEstimadoDespesa(values.floatValue)}
          />
        </div>
      </div>
      <div className='sideForm-footer'>
        <button className='cancelButton' onClick={handleClose}>Cancelar</button>
        <button className='saveButton' onClick={handleSave}>
          {actionType === 'edit' ? 'Salvar Alterações' : 'Salvar'}
        </button>
      </div>
    </>
  );
};

SideFormEstimarDespesas.propTypes = {
  closeSideForm: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  actionType: PropTypes.string.isRequired,
  idForEdit: PropTypes.string, // Pode ser nulo para adição
};

export default SideFormEstimarDespesas;
