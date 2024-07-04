import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Layout from '../../../components/Layout/layout';
import ModalResumoExecutivo from './ProdutosServicosModal';
import { API_BASE_URL, API_BASE_URL_AMPLIFY } from '../../../apiConfig';

const ProdutosServicos = () => {
  const [produtosServicosData, setProdutosServicosData] = useState([]);
  const [isResumoExecutivoModalOpen, setIsResumoExecutivoModalOpen] = useState(false);
  const [lastProductId, setLastProductId] = useState(null); // Estado para rastrear o último ID de produto/serviço

  const fetchData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/produtos_servicos`);
      if (!response.ok) {
        throw new Error('Falha ao buscar os dados');
      }
      const data = await response.json();
      setProdutosServicosData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openResumoExecutivoModal = () => {
    setIsResumoExecutivoModalOpen(true);
  };

  const handleExcluirProdutoServico = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/excluir_produto_servico/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Falha ao excluir produto/serviço');
      }
      fetchData(); // Atualiza os dados após a exclusão
    } catch (error) {
      console.error(error);
    }
  };

// // Verifica se um novo produto/serviço foi adicionado e atualiza os dados se necessário
// useEffect(() => {
//   const initialCount = produtosServicosData.length;
//   fetchData(); // Busca os dados novamente
//   return () => {
//     const finalCount = produtosServicosData.length;
//     if (finalCount > initialCount) {
//       // Se o número de produtos/serviços aumentou, um novo item foi adicionado
//       setLastProductId(produtosServicosData[finalCount - 1].id);
//     }
//   };
// }, [produtosServicosData]);

  return (
    <Layout>
      <div className='dashboard-page'>
        <div className='dashboard-content'>
          <div className='title'>
            <h1>Produtos e Serviços</h1>
          </div>
          
          <div className='texts'>              
            <p>Liste e Descreva os Produtos/ Serviços que o seu Negócio irá comercializar</p>
                <p>
                  <b>
                    INSTRUÇÕES PARA LISTAR E DESCREVER OS PRODUTOS/ SERVIÇOS QUE O SEU NEGÓCIO IRÁ COMERCIALIZAR
                  </b>
                </p>
                <p>1- Clique no Botão “Adicionar Produto/ Serviço”.</p>
                <ul>
                  <li>A- Na tela que será aberta, adicionar cada Produto/ Serviço que o seu Negócio irá comercializar.</li>
                  <li>B- Para cada Produto/ Serviço inserido insira um breve descritivo do mesmo.</li>
                </ul>
                <p>
                  Em seguida, Salve o Produto/ Serviço.
                  Realize este passo a passo para cada Produto/ Serviço.

                  Observação: Você pode inserir quantos Produtos/ Serviços desejar.

                  Clique no Botão “Avançar” para prosseguir com o seu ePlano Financeiro.
                </p>
            </div>
          <div className='add-button'>
            <Link onClick={openResumoExecutivoModal}>Adicionar Produto/Serviço</Link>
          </div>
          <div className='table-container'>
            <table>
              <thead>
                <tr>
                  <th>Produtos/Serviços</th>
                  <th>Descrição</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {produtosServicosData.map((produtoServico) => (
                  <tr key={produtoServico.id}>
                    <td>{produtoServico.produto_servico}</td>
                    <td>{produtoServico.descricao}</td>
                    <td>
                      <button onClick={() => handleExcluirProdutoServico(produtoServico.id)}><FaTrashAlt /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {isResumoExecutivoModalOpen && (
        <ModalResumoExecutivo
          isOpen={isResumoExecutivoModalOpen}
          onClose={() => setIsResumoExecutivoModalOpen(false)}
        />
      )}
    </Layout>
  );
};

export default ProdutosServicos;
