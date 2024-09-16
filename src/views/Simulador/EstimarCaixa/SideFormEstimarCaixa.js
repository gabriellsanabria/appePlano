import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { NumericFormat } from 'react-number-format';
import { API_BASE_URL } from '../../../apiConfig';
import useAuth from '../../../hooks/useAuth'; // Importe o hook useAuth

const SideFormEstimarCaixa = ({ closeSideForm, onAdd, actionType, idForEdit, caixaTipo }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [descricaoCaixa, setDescricaoCaixa] = useState('');
  const [valorCaixa, setValorCaixa] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Obtendo o usuário e o estado de carregamento do hook useAuth
  const { user, loading } = useAuth();
  const userId = user ? user.uid : null;

  // Opções estáticas para categorias de caixa
  const categoriaCaixaOptions = [
    { value: 'liquido', label: 'Caixa Líquido' },
    { value: 'estoque', label: 'Caixa Insumos (Estoque)' },
    { value: 'recebiveis', label: 'Caixa Recebíveis' },
    { value: 'contas_pagar', label: 'Caixa Dívidas' },
  ];

  useEffect(() => {
    if (!loading && userId && actionType === 'edit' && idForEdit) {
      obterCaixaParaEdicao(idForEdit);
    }
  }, [loading, userId, actionType, idForEdit]);

  const obterCaixaParaEdicao = async (id) => {
    try {
      const response = await fetch(`https://api.eplano.com.br/api/caixa/${caixaTipo}/${id}`);
      const data = await response.json();
  
      if (data) {
        setSelectedOption({ value: caixaTipo, label: caixaTipo });
        setDescricaoCaixa(data.descricao || '');
        setValorCaixa(data.valor || '');
      }
    } catch (error) {
      console.error('Erro ao obter caixa para edição:', error);
    }
  };
  

  const handleClose = () => {
    closeSideForm();
  };

  const handleSave = async () => {
    try {
      // Verifica se todos os campos necessários estão preenchidos
      if (!selectedOption || !descricaoCaixa || !valorCaixa) {
        throw new Error('Por favor, preencha todos os campos.');
      }
  
      setIsLoading(true);
  
      // Define os nomes dos campos baseado na categoria selecionada
      let descricao = 'descricao'; // O nome do campo é sempre 'descricao' na sua configuração atual
      let valor = 'valor'; // O nome do campo é sempre 'valor' na sua configuração atual
  
      // Dados a serem enviados no corpo da requisição
      const bodyData = {
        categoria_caixa: selectedOption.label,
        [descricao]: descricaoCaixa,
        [valor]: valorCaixa,
        uidUser: userId
      };
  
      // Define a URL e o método HTTP baseado na ação (editar ou criar)
      const url = actionType === 'edit'
        ? `${API_BASE_URL}/api/caixa/${selectedOption.value}/${idForEdit}`
        : `${API_BASE_URL}/api/caixa/${selectedOption.value}`;
        
      const method = actionType === 'edit' ? 'PUT' : 'POST';
  
      // Envia a requisição para a API
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyData),
      });
  
      // Verifica se a resposta foi bem-sucedida
      if (!response.ok) {
        throw new Error(actionType === 'edit' ? 'Falha ao atualizar caixa' : 'Falha ao adicionar caixa');
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
        <h1>{actionType === 'edit' ? 'Editar Caixa' : 'Adicionar Caixa'}</h1>
        {/* {idForEdit} - {caixaTipo} */}
      </div>
      <div className='sideForm-body'>
        <div className='form-content'>
          <label>Selecione o Tipo de Caixa</label>
          <Select
            value={selectedOption}
            onChange={setSelectedOption}
            options={categoriaCaixaOptions}
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
        <button className='saveButton' onClick={handleSave} disabled={isLoading}>
          {actionType === 'edit' ? 'Salvar Alterações' : 'Salvar'}
        </button>
      </div>
    </>
  );
};

SideFormEstimarCaixa.propTypes = {
  closeSideForm: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  actionType: PropTypes.string.isRequired,
  idForEdit: PropTypes.string,
  caixaTipo: PropTypes.string.isRequired,
};

export default SideFormEstimarCaixa;
