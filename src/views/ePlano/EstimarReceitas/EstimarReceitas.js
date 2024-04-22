  import React, { useState, useEffect } from 'react';
  import { Link } from 'react-router-dom';
  import { FaEdit, FaTrashAlt } from 'react-icons/fa';
  import Layout from '../../../components/Layout/layout';
  import ModalResumoExecutivo from './EstimarReceitasModal';
  import API_BASE_URL from '../../../apiConfig';

  const EstimarReceitas = () => {
    const [isResumoExecutivoModalOpen, setIsResumoExecutivoModalOpen] = useState(false);
    const [receitasMensais, setReceitasMensais] = useState([]);

    useEffect(() => {
      obterReceitasMensaisNegocio();
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
              <p>Vamos estimar as Receitas Mensais do seu Negócio</p>
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
          </div>
        </div>
        {isResumoExecutivoModalOpen && (
          <ModalResumoExecutivo
            isOpen={isResumoExecutivoModalOpen}
            onClose={() => setIsResumoExecutivoModalOpen(false)}
            onSave={handleSave}
          />
        )}
      </Layout>
    );
    
  };

  export default EstimarReceitas;
