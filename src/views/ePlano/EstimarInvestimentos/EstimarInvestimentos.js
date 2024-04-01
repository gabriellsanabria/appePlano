import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrashAlt, FaEye } from 'react-icons/fa'; // Importe os ícones necessários do Font Awesome

import Layout from '../../../components/Layout/layout';
import './EstimarInvestimentos.scss'; // Importe ou crie este arquivo para estilizar a página
import EstruturaFisicaModal from './EstimarInvestimentosModal'; // Importe o modal de Estrutura Física
import CapitalGiroModal from './CapitalGiroModal'; // Importe o modal de Equipe
import InsumosModal from './InsumosModal'; // Importe o modal de Insumos

const EstimarInvestimentos = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isResumoExecutivoModalOpen, setIsResumoExecutivoModalOpen] = useState(false);
  const [isEstruturaFisicaModalOpen, setIsEstruturaFisicaModalOpen] = useState(false); // Estado para controlar a abertura do modal de Estrutura Física
  const [isEquipeModalOpen, setIsEquipeModalOpen] = useState(false); // Estado para controlar a abertura do modal de Equipe
  const [isInsumosModalOpen, setIsInsumosModalOpen] = useState(false); // Estado para controlar a abertura do modal de Insumos

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  // Array de dados fictícios para a tabela inicial
  const initialTableData = [
    ['Cálculo', 'Total 10 meses', 'Mês 1', 'Mês 2', 'Mês 3', 'Mês 4', 'Mês 5', 'Mês 6', 'Mês 7', 'Mês 8', 'Mês 9', 'Mês 10'],
    ['Estrutura Física/ Virtual','R$ 8.500,00', 'R$ 100,00', 'R$ 200,00', 'R$ 300,00', 'R$ 400,00', 'R$ 500,00', 'R$ 600,00', 'R$ 700,00', 'R$ 800,00', 'R$ 900,00', 'R$ 1.000,00'],
    ['Insumos (ESTOQUE)','R$ 8.500,00', 'R$ 100,00', 'R$ 200,00', 'R$ 300,00', 'R$ 400,00', 'R$ 500,00', 'R$ 600,00', 'R$ 700,00', 'R$ 800,00', 'R$ 900,00', 'R$ 1.000,00'],
    ['Capital de Giro Próprio','R$ 8.500,00', 'R$ 100,00', 'R$ 200,00', 'R$ 300,00', 'R$ 400,00', 'R$ 500,00', 'R$ 600,00', 'R$ 700,00', 'R$ 800,00', 'R$ 900,00', 'R$ 1.000,00'],
    ['Capital de  Giro de Terceiros','R$ 8.500,00', 'R$ 100,00', 'R$ 200,00', 'R$ 300,00', 'R$ 400,00', 'R$ 500,00', 'R$ 600,00', 'R$ 700,00', 'R$ 800,00', 'R$ 900,00', 'R$ 1.000,00'],
  ];
  

// Array de dados fictícios para a seção de Estrutura Física
const estruturaFisicaData = [
  {
    id: 1,
    nome: 'Aluguel',
    despesaMes: 'R$ 3.000,00'
  },
  {
    id: 2,
    nome: 'Água',
    despesaMes: 'R$ 200,00'
  }
];


  // Função para abrir o modal de Estrutura Física
  const openEstruturaFisicaModal = () => {
    setIsEstruturaFisicaModalOpen(true);
  };

  // Função para abrir o modal de Equipe
  const openEquipeModal = () => {
    setIsEquipeModalOpen(true);
  };

  // Função para abrir o modal de Insumos
  const openInsumosModal = () => {
    setIsInsumosModalOpen(true);
  };

// Array de dados fictícios para a seção de Equipe
const capitalData = [
  {
    id: 1,
    despesaMes: 'R$ 1.300,00'
  },
  {
    id: 2,
    despesaMes: 'R$ 1.300,00'
  }
];

// Array de dados fictícios para a seção de Insumos
const insumosData = [
  {
    id: 1,
    nome: 'Shampoo Hipoalergênico',
    despesaMes: 'R$ 1.300,00'
  },
  {
    id: 2,
    nome: 'Ração Premium para Filhotes',
    despesaMes: 'R$ 1.300,00'
  }
];

  

  return (
    <Layout>
      <div className='dashboard-page'>
        <div className='dashboard-content'>          
            <div className='title'>
              <h1>Investimentos: Definir a Estrutura de Operação do Negócio</h1>
            </div>
            <div className='table-container'>
              <h3>CÁLCULO DOS PAGAMENTOS MENSAIS DOS INVESTIMENTOS</h3>
            <table>
              <tbody>
                {initialTableData.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className='dashboard-col'>     
          
          <p>Vamos Listar a Estrutura Necessária para Operar o Negócio.</p>       
            <div className='title'>
              <h3>Estrutura física</h3>
            </div>
            <div className='add-button'>
              <Link onClick={openEstruturaFisicaModal}>Adicionar Estrutura Física</Link>
            </div>
            <div className='table-container'>
              <table>
                <thead>
                  <tr>
                    <th>Estrutura Física</th>
                    <th>Despesa R$/Mês</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Mapear os dados para renderizar as linhas */}
                  {estruturaFisicaData.map((estrutura) => (
                    <tr key={estrutura.id}>
                      <td>{estrutura.nome}</td>
                      <td>{estrutura.despesaMes}</td>
                      <td>
                        <button><Link to={`/editar-estrutura/${estrutura.id}`}><FaEdit /></Link></button>
                        <button><Link to={`/excluir-estrutura/${estrutura.id}`}><FaTrashAlt /></Link></button>
                      </td>
                    </tr>
                  ))}
                <tr>
                  <td><strong>Total</strong></td>
                  <td colSpan="2"><strong>R$ 5.000,00</strong></td>
                </tr>
                </tbody>
              </table>

            </div>
          </div>
          
          <div className='dashboard-col'>            
            <div className='title'>
              <h3>Insumos (Estoque)</h3>
            </div>
            <div className='add-button'>
              <Link onClick={openInsumosModal}>Adicionar Insumos</Link>
            </div>
            <div className='table-container'>
              <table>
                <thead>
                  <tr>
                    <th>Insumo</th>
                    <th>Despesa R$/Mês</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Mapear os dados para renderizar as linhas */}
                  {insumosData.map((insumo) => (
                    <tr key={insumo.id}>
                      <td>{insumo.nome}</td>
                      <td>{insumo.despesaMes}</td>
                      <td>
                        <button><Link to={`/editar-insumo/${insumo.id}`}><FaEdit /></Link></button>
                        <button><Link to={`/excluir-insumo/${insumo.id}`}><FaTrashAlt /></Link></button>
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td><strong>Total</strong></td>
                    <td colSpan="2"><strong>R$ R$ 5.000,00</strong></td>
                    
                  </tr>
                </tbody>
              </table>

            </div>
          </div>
          <div className='dashboard-col'>            
            <div className='title'>
              <h3>Capital de Giro</h3>
            </div>
            <div className='add-button'>
              <Link onClick={openEquipeModal}>Adicionar Capital de Giro</Link>
            </div>
            <div className='table-container'>
              <table>
                <thead>
                  <tr>
                    <th>Capital de Giro R$/Mês</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Mapear os dados para renderizar as linhas */}
                  {capitalData.map((capital) => (
                    <tr key={capital.id}>
                      <td>{capital.despesaMes}</td>
                      <td>
                        <button><Link to={`/editar-capital/${capital.id}`}><FaEdit /></Link></button>
                        <button><Link to={`/excluir-capital/${capital.id}`}><FaTrashAlt /></Link></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

            </div>
          </div>
        </div>
      </div>
      {isEstruturaFisicaModalOpen && (
        <EstruturaFisicaModal
          isOpen={isEstruturaFisicaModalOpen}
          onClose={() => setIsEstruturaFisicaModalOpen(false)}
        />
      )}
      {isEquipeModalOpen && (
        <CapitalGiroModal
          isOpen={isEquipeModalOpen}
          onClose={() => setIsEquipeModalOpen(false)}
        />
      )}
      {isInsumosModalOpen && (
        <InsumosModal
          isOpen={isInsumosModalOpen}
          onClose={() => setIsInsumosModalOpen(false)}
        />
      )}
    </Layout>
  );
};

export default EstimarInvestimentos;
