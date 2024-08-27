import React, { useState } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { NumericFormat } from 'react-number-format';
import { API_BASE_URL } from '../../../apiConfig';
import useAuth from '../../../hooks/useAuth'; // Importe o hook useAuth

const SideFormEstimarCaixa = ({ closeSideForm, onAdd }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [descricaoCaixa, setDescricaoCaixa] = useState('');
  const [valorCaixa, setValorCaixa] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Obtendo o usuário e o estado de carregamento do hook useAuth
  const { user, loading } = useAuth();
  const userId = user ? user.uid : null;
  
  // Opções estáticas para categorias de despesa
  const categoriaDespesaOptions = [
    { value: 'liquido', label: 'Caixa Líquido' },
    { value: 'estoque', label: 'Caixa Insumos (Estoque)' },
    { value: 'recebiveis', label: 'Caixa Recebíveis' },
    { value: 'contas_pagar', label: 'Caixa Dívidas' },
  ];

  const handleClose = () => {
    closeSideForm();
  };

  const handleSave = async () => {
    try {
      if (!selectedOption || !descricaoCaixa || !valorCaixa) {
        throw new Error('Por favor, preencha todos os campos.');
      }
  
      setIsLoading(true);
  
      let descricao = '';
      let valor = '';
  
      // Define os nomes dos campos baseado na categoria selecionada
      switch (selectedOption.value) {
        case 'liquido':
          descricao = 'descricao';
          valor = 'valor';
          break;
        case 'estoque':
          descricao = 'descricao';
          valor = 'valor';
          break;
        case 'recebiveis':
          descricao = 'descricao';
          valor = 'valor';
          break;
        case 'contas_pagar':
          descricao = 'descricao';
          valor = 'valor';
          break;
        default:
          throw new Error('Categoria de despesa inválida.');
      }

      console.log('Selected Option Value:', selectedOption.value); // Adicionando o console.log
      
      const bodyData = {
        categoria_despesa: selectedOption.label,
        [descricao]: descricaoCaixa,
        [valor]: valorCaixa,
        uidUser: userId

      };
  
      const response = await fetch(`${API_BASE_URL}/api/caixa/${selectedOption.value}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyData),
      });
  
      if (!response.ok) {
        throw new Error('Falha ao adicionar despesa');
      }
      console.log(response);
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
        <h1>Adicione o Caixa do seu Negócio</h1>
      </div>
      <div className='sideForm-body'>
        <div className='form-content'>
          <label>Selecione o Tipo de Caixa</label>
          <Select
            value={selectedOption}
            onChange={setSelectedOption}
            options={categoriaDespesaOptions}
            placeholder="Selecione o Tipo de Caixa"
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
          <label>Nome do Tipo de Caixa</label>
          <input
            type="text"
            value={descricaoCaixa}
            onChange={(e) => setDescricaoCaixa(e.target.value)}
            placeholder="Digite o Item do Caixa"
          />
        </div>
        <div className='form-content'>
          <label>Valor Estimado do Caixa (R$)</label>
          <NumericFormat
            displayType={'input'}
            thousandSeparator='.'
            prefix={'R$'}
            decimalSeparator=','
            decimalScale={2}
            fixedDecimalScale={true}
            allowNegative={false}
            isNumericString={false}
            value={valorCaixa}
            placeholder="Digite o Valor Estimado do Caixa (R$)"
            onValueChange={(values) => setValorCaixa(values.floatValue)}
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

SideFormEstimarCaixa.propTypes = {
  closeSideForm: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
};

export default SideFormEstimarCaixa;
