import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Layout from '../../../components/Layout/layout';
import ModalResumoExecutivo from './ProdutosServicosModal';
import TwoColumnLayout from '../../../components/Layout/TwoColumnLayout';
import { API_BASE_URL, API_BASE_URL_AMPLIFY } from '../../../apiConfig';
import './ProdutosServicos.scss';

import ButtonsEplano from '../../Dashboard/ButtonsEplano';

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

  // Dentro da função addNewProdutoServico
  const addNewProdutoServico = (produtoServico, descricao) => {
    setProdutosServicosData([...produtosServicosData, { produto_servico: produtoServico, descricao: descricao }]);
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
                <h1>Produtos e Serviços</h1>
              </div>
              <div className='texts'>              
                <p>Liste e Descreva os Produtos/ Serviços que o seu Negócio irá comercializar</p>
                {/* Aqui você pode listar e descrever os produtos e serviços que o seu negócio oferece de forma simples e organizada. Siga os passos abaixo para adicionar cada item e fornecer uma breve descrição sobre eles. Estamos aqui para ajudá-lo a construir uma lista completa e detalhada, permitindo uma gestão eficiente do seu catálogo de produtos e serviços. */}
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
          </TwoColumnLayout>
        </div>
      </div>
      
      {isResumoExecutivoModalOpen && (
        <ModalResumoExecutivo
          isOpen={isResumoExecutivoModalOpen}
          onClose={() => setIsResumoExecutivoModalOpen(false)}
          addNewProdutoServico={addNewProdutoServico} // Passando a função para adicionar novo produto/serviço
        />
      )}
    </Layout>
  );
};

export default ProdutosServicos;
