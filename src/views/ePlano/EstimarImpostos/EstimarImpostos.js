import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Layout from '../../../components/Layout/layout';
import ModalAdicionarTaxa from './ModalAdicionarTaxa'; // Importe o componente ModalAdicionarTaxa
import TwoColumnLayout from '../../../components/Layout/TwoColumnLayout';
import { API_BASE_URL, API_BASE_URL_AMPLIFY } from '../../../apiConfig';

import ButtonsEplano from '../../Dashboard/ButtonsEplano';

const EstimarImpostos = () => {
  const [isResumoExecutivoModalOpen, setIsResumoExecutivoModalOpen] = useState(false);
  const [isTaxModalOpen, setIsTaxModalOpen] = useState(false); // Estado para controlar a abertura do modal de impostos
  const [receitasMensais, setReceitasMensais] = useState([]);
  const [taxes, setTaxes] = useState([]);
  const [totalTaxes, setTotalTaxes] = useState(0);

  useEffect(() => {
    obterReceitasMensaisNegocio();
    obterTaxesMensaisNegocio(); // Chame a função para obter os impostos quando o componente for montado
  }, []);

  const obterReceitasMensaisNegocio = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/receitas_mensais_negocio`);
      const data = await response.json();
      setReceitasMensais(data);
    } catch (error) {
      console.error('Erro ao obter receitas mensais do negócio:', error);
    }
  };


  // Dentro da função useEffect, atualize a chamada para obter os impostos e calcule o total
  useEffect(() => {
    obterTaxesMensaisNegocio();
  }, []);

// Dentro da função obterTaxesMensaisNegocio, atualize o estado dos impostos e calcule o total corretamente
  const obterTaxesMensaisNegocio = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/listar_impostos_mensais`);
      const data = await response.json();
      setTaxes(data);
      // Calcula o total dos impostos corretamente usando a propriedade correta
      const total = data.reduce((acc, tax) => acc + parseFloat(tax.valor_imposto_mensal), 0);
      setTotalTaxes(total);
    } catch (error) {
      console.error('Erro ao obter impostos mensais do negócio:', error);
    }
  };



  const openResumoExecutivoModal = () => {
    setIsResumoExecutivoModalOpen(true);
  };

  const handleSave = async (novaReceita) => {
    try {
      const response = await fetch(`${API_BASE_URL}/adicionar_receita_mensal_negocio`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novaReceita),
      });
      if (response.ok) {
        console.log('Receita adicionada com sucesso!');
        obterReceitasMensaisNegocio();
        setIsResumoExecutivoModalOpen(false);
      } else {
        console.error('Erro ao adicionar receita mensal do negócio:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao adicionar receita mensal do negócio:', error);
    }
  };

  const handleExcluirReceita = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/excluir_receita_mensal_negocio/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Falha ao excluir receita estimada');
      }
      obterReceitasMensaisNegocio(); // Atualiza os dados após a exclusão
    } catch (error) {
      console.error(error);
    }
  };

  const handleExcluirTax = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/excluir_tax_mensal_negocio/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Falha ao excluir imposto estimado');
      }
      obterTaxesMensaisNegocio(); // Atualiza os dados após a exclusão
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveTax = async (novaTaxa) => {
    try {
      const response = await fetch(`${API_BASE_URL}/add_imposto`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novaTaxa),
      });
      if (response.ok) {
        console.log('Taxa adicionada com sucesso!');
        obterTaxesMensaisNegocio();
        setIsTaxModalOpen(false);
      } else {
        console.error('Erro ao adicionar taxa mensal do negócio:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao adicionar taxa mensal do negócio:', error);
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const somaQuantidade = () => {
    return receitasMensais.reduce((acc, curr) => acc + curr.quantidade_vendida_por_mes, 0);
  };

  const somaTotalValor = () => {
    return receitasMensais.reduce((acc, curr) => acc + (curr.valor_unitario * curr.quantidade_vendida_por_mes), 0);
  };

  return (
    <Layout>
      <div className='dashboard-page'>
        <div className='dashboard-content'>
        <TwoColumnLayout>
        <div className="left-column" id='profile'>
          <ButtonsEplano />
        </div>
        <div className="right-column">
          
          <div className='title'>
            <h1>Estimar Impostos Mensais</h1>
          </div>
          <div className='add-button'>
            {/* <Link to="#" onClick={() => setIsTaxModalOpen(true)}>Editar Impostos</Link> */}
          </div>
          <div className='table-container'>
            <table>
              <thead>
                <tr>
                  <th>Mês</th>
                  <th>Imposto</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {taxes.map((tax) => (
                  <tr key={tax.id}>
                    <td>{tax.nome_imposto}</td>
                    <td>{totalTaxes.toFixed(2)}%</td>
                    <td>
                      <button onClick={() => setIsTaxModalOpen(true)}><FaEdit /></button>
                    </td>
                  </tr>
                ))}
                {/* Adiciona uma linha para exibir o total dos impostos */}
                <tr>
                  <td colSpan="2"><strong>Total</strong></td>
                  <td>{totalTaxes.toFixed(2)}%</td>
                </tr>

              </tbody>
            </table>
          </div>
          </div>
          </TwoColumnLayout>
        </div>
      </div>
      {isTaxModalOpen && (
        <ModalAdicionarTaxa
          isOpen={isTaxModalOpen}
          onClose={() => setIsTaxModalOpen(false)}
          onSave={handleSaveTax}
        />
      )}
    </Layout>
  );
};

export default EstimarImpostos;
