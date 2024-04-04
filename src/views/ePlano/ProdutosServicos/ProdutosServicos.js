import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrashAlt, FaEye } from 'react-icons/fa'; // Importe os ícones necessários do Font Awesome

import Layout from '../../../components/Layout/layout';
import './ProdutosServicos.scss'; // Importe ou crie este arquivo para estilizar a página
import ModalResumoExecutivo from './ProdutosServicosModal'; // Importe o modal ModalResumoExecutivo

const ProdutosServicos = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isResumoExecutivoModalOpen, setIsResumoExecutivoModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  // Função para abrir o modal do resumo executivo
  const openResumoExecutivoModal = () => {
    setIsResumoExecutivoModalOpen(true);
  };

  // Array de dados fictícios para as linhas da tabela
  const produtosServicosData = [
    {
      id: 1,
      nome: 'Shampoo para Cachorro de 200ml',
      descricao: 'O Shampoo para Cachorro de 200ml é um produto especialmente formulado para cuidar da higiene e saúde da pelagem dos cães. Com uma fórmula suave e equilibrada, este shampoo proporciona uma limpeza eficaz sem agredir a pele sensível dos animais.'
    },
    {
      id: 2,
      nome: 'Ração Premium para Gatos - 1kg',
      descricao: 'A Ração Premium para Gatos é uma opção nutritiva e saborosa para os felinos mais exigentes. Formulada com ingredientes selecionados e balanceados, proporciona uma alimentação completa e saudável para o seu gato.'
    },
    {
      id: 3,
      nome: 'Coleira Antipulgas e Carrapatos',
      descricao: 'A Coleira Antipulgas e Carrapatos é um acessório essencial para manter o seu animal de estimação protegido contra infestações de pulgas e carrapatos. Com ação prolongada, proporciona até 8 meses de proteção contínua.'
    },
    {
      id: 4,
      nome: 'Brinquedo Interativo para Cães - Bola de Tênis',
      descricao: 'O Brinquedo Interativo para Cães - Bola de Tênis é perfeito para estimular a atividade física e mental do seu cão. Feito de material resistente e durável, é ideal para jogos de busca e interação entre o tutor e o animal.'
    },
    {
      id: 5,
      nome: 'Areia Sanitária para Gatos - 5kg',
      descricao: 'A Areia Sanitária para Gatos é uma opção eficaz e higiênica para manter a bandeja de areia do seu gato limpa e odorizada. Com grãos finos e alta capacidade de absorção, proporciona conforto e praticidade para o seu pet.'
    }
  ];
  

  return (
    <Layout>
      <div className='dashboard-page'>
        <div className='dashboard-content'>
          <div className='title'>
            <h1>Receitas Mensais do Negócio</h1>
            <p>Liste e Descreva os Produtos/ Serviços que o seu Negócio irá comercializar</p>
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
                {/* Mapear os dados para renderizar as linhas */}
                {produtosServicosData.map((produtoServico) => (
                  <tr key={produtoServico.id}>
                    <td>{produtoServico.nome}</td>
                    <td>{produtoServico.descricao}</td>
                    <td>
                      <button><Link to={`/editar-produto-servico/${produtoServico.id}`}><FaEdit /></Link></button>
                      <button><Link to={`/excluir-produto-servico/${produtoServico.id}`}><FaTrashAlt /></Link></button>
                      {/* <button><Link to={`/ver-produto-servico/${produtoServico.id}`}><FaEye /></Link></button> */}
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
