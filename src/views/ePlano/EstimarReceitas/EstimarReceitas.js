import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrashAlt, FaEye } from 'react-icons/fa'; // Importe os ícones necessários do Font Awesome

import Layout from '../../../components/Layout/layout';
import './EstimarReceitas.scss'; // Importe ou crie este arquivo para estilizar a página
import ModalResumoExecutivo from './EstimarReceitasModal'; // Importe o modal ModalResumoExecutivo

const EstimarReceitas = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isResumoExecutivoModalOpen, setIsResumoExecutivoModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  // Função para abrir o modal do resumo executivo
  const openResumoExecutivoModal = () => {
    setIsResumoExecutivoModalOpen(true);
  };

const EstimarReceitasData = [
  {
    id: 1,
    produtoServico: 'Shampoo para Cachorro de 200ml',
    valorUnitarioVenda: 15.99,
    projecaoVendasPorDia: 10,
    diasTrabalhados: 25,
  },
  {
    id: 2,
    produtoServico: 'Ração Premium para Gatos - 1kg',
    valorUnitarioVenda: 29.99,
    projecaoVendasPorDia: 8,
    diasTrabalhados: 25,
  },
  {
    id: 3,
    produtoServico: 'Coleira Antipulgas e Carrapatos',
    valorUnitarioVenda: 22.50,
    projecaoVendasPorDia: 5,
    diasTrabalhados: 25,
  },
  {
    id: 4,
    produtoServico: 'Brinquedo Interativo para Cães - Bola de Tênis',
    valorUnitarioVenda: 12.75,
    projecaoVendasPorDia: 15,
    diasTrabalhados: 25,
  },
  {
    id: 5,
    produtoServico: 'Areia Sanitária para Gatos - 5kg',
    valorUnitarioVenda: 18.49,
    projecaoVendasPorDia: 6,
    diasTrabalhados: 25,
  }
];

  

  return (
    <Layout>
      <div className='dashboard-page'>
        <div className='dashboard-content'>
          <div className='title'>
            <h1>Estimar Receitas</h1>
            <p>Vamos estimar as suas receitas</p>
          </div>
          <div className='add-button'>
            <Link onClick={openResumoExecutivoModal}>Adicionar Receitas</Link>
          </div>
          <div className='table-container'>
            <table>
              <thead>
                <tr>
                  <th>Produto/Serviço (Mix)</th>
                  <th>Valor unitário de Venda (R$)</th>
                  <th>Projeção Vendas por mês</th>
                  <th>Total Projetado Mensal</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {/* Mapear os dados para renderizar as linhas */}
                {EstimarReceitasData.map((item) => (
                  <tr key={item.id}>
                    <td>{item.produtoServico}</td>
                    <td>{item.valorUnitarioVenda}</td>
                    <td>{item.projecaoVendasPorDia}</td>
                    <td>{(item.valorUnitarioVenda * item.projecaoVendasPorDia * item.diasTrabalhados).toFixed(2)}</td>
                    <td>
                      <button><Link to={`/editar-estimativa-receita/${item.id}`}><FaEdit /></Link></button>
                      <button><Link to={`/excluir-estimativa-receita/${item.id}`}><FaTrashAlt /></Link></button>
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

export default EstimarReceitas;
