import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Layout from '../../../components/Layout/layout';
import ModalResumoExecutivo from './EstimarReceitasModal';
import ModalAdicionarTaxa from './ModalAdicionarTaxa'; // Importe o componente ModalAdicionarTaxa
import { API_BASE_URL, API_BASE_URL_AMPLIFY } from '../../../apiConfig';

const EstimarReceitas = () => {
  const [isResumoExecutivoModalOpen, setIsResumoExecutivoModalOpen] = useState(false);
  const [isTaxModalOpen, setIsTaxModalOpen] = useState(false); // Estado para controlar a abertura do modal de impostos
  const [receitasMensais, setReceitasMensais] = useState([]);
  const [taxes, setTaxes] = useState([]);

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

  const obterTaxesMensaisNegocio = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/impostos_mensais_negocio`);
      const data = await response.json();
      setTaxes(data);
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
      const response = await fetch(`${API_BASE_URL}/adicionar_taxa_mensal_negocio`, {
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
          <div className='title'>
            <h1>Estimar as Receitas Mensais do Negócio</h1>
          </div>
          <div className='texts'>
            <p>Vamos estimar as Receitas Mensais do seu Negócio</p>
            <p>
              <b>
              NSTRUÇÕES PARA ESTIMAR AS RECEITAS MENSAIS E OS IMPOSTOS DO SEU NEGÓCIO
              </b>
            </p>
            <p>1- Clique no Botão “Adicionar Receitas”.</p>
            <ul>
              <li>A- Na tela que será aberta, Selecione cada Produto/ Serviço inserido na Tela Anterior (todos os Produtos/ Serviços cadastrados na Tela Anterior são exibidos ao Clicar no Campo “Selecione o Produto/ Serviço”).</li>
              <li>B- Para cada Produto/ Serviço Selecionado (um a um), Insira as 2 Informações para calcular a Receita Media Estimada Mensal:</li>
              <ul>
                <li>B1- Digite o Valor Unitário ($) de Venda do Produto/ Serviço.</li>
                <li>B2- Digite a Quantidade Estimada que será Vendida do Produto/ Serviço.</li>
              </ul>
              <li>C- Salve estas 2 informações e repita o mesmo passo a passo para cada Produto/ Serviço.</li>
            </ul>
            <p>
            Após Preencher e Salvar as Estimativas de todos os Produtos/ Serviços, confira na Tabela da Tela Principal (Estimar Receitas) se todos foram Preenchidos corretamente.
Se faltar alguma Informação, volte no Botão “Adicionar Receitas” e realize os ajustes necessários.

            </p>
            <p>2- Clique no Botão “Adicionar Imposto”.</p>
            <ul>
              <li>
                A- Na tela que será aberta, Adicione uma Estimativa de Imposto Mensal.
              </li>
              <li>
                B- Salve esta informação.
              </li>
            </ul>
            <p>Após Preencher e Salvar a Estimativa do Imposto Mensal, confira na Tabela da Tela Principal (Estimar Receitas) se foi Preenchido corretamente.
            Se a Estimativa estiver errada, volte no Botão “Adicionar Imposto” e realize o ajuste necessário.
            </p>
            <p>
            Quando todos os Produtos/ Serviços e o Imposto estiverem Estimados, clique no Botão “Avançar” para prosseguir com o seu ePlano Financeiro.
            </p>
          </div>
          <div className='add-button'>
            <Link to="#" onClick={openResumoExecutivoModal}>Adicionar Receitas</Link>
          </div>
          <div className='table-container'>
            <table>
              <thead>
                <tr>
                  <th>Produto/Serviço (Mix)</th>
                  <th>Valor unitário de Venda (R$)</th>
                  <th>Quantidade Vendida por Mês</th>
                  <th>Total Mensal</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {receitasMensais.map((receita) => (
                  <tr key={receita.id}>
                    <td>{receita.produto_servico}</td>
                    <td>{formatCurrency(receita.valor_unitario)}</td>
                    <td>{receita.quantidade_vendida_por_mes}</td>
                    <td>{formatCurrency(receita.valor_unitario * receita.quantidade_vendida_por_mes)}</td>
                    <td>
                      <button onClick={() => handleExcluirReceita(receita.id)}><FaTrashAlt /></button>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="2"><strong>Total</strong></td>
                  <td>{somaQuantidade()}</td>
                  <td>{formatCurrency(somaTotalValor())}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='add-button'>
            <Link to="#" onClick={() => setIsTaxModalOpen(true)}>Adicionar Impostos</Link>
          </div>
          <div className='table-container'>
            <table>
              <thead>
                <tr>
                  <th>Estimativa de Imposto Mensal</th>
                  <th>Imposto</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {taxes.map((tax) => (
                  <tr key={tax.id}>
                    <td>{tax.descricao}</td>
                    <td>{formatCurrency(tax.valor)}</td>
                    <td>
                      <button onClick={() => handleExcluirTax(tax.id)}><FaTrashAlt /></button>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="3"><strong>Total</strong></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {isResumoExecutivoModalOpen && (
        <ModalResumoExecutivo
          isOpen={isResumoExecutivoModalOpen}
          onClose={() => setIsResumoExecutivoModalOpen(false)}
          onSave={handleSave}
        />
      )}
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

export default EstimarReceitas;
