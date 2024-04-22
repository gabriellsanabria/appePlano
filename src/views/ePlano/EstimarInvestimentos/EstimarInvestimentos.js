import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Layout from '../../../components/Layout/layout';
import './EstimarInvestimentos.scss'; // Importe ou crie este arquivo para estilizar a página
import EstruturaFisicaModal from './EstimarInvestimentosModal'; // Importe o modal de Estrutura Física/Virtual
import CapitalGiroModal from './CapitalGiroModal'; // Importe o modal de Capital de Giro
import InsumosModal from './InsumosModal'; // Importe o modal de Insumos

import API_BASE_URL from '../../../apiConfig';

const EstimarInvestimentos = () => {
  const [isEstruturaFisicaModalOpen, setIsEstruturaFisicaModalOpen] = useState(false);
  const [isInsumosModalOpen, setIsInsumosModalOpen] = useState(false);
  const [estruturaFisicaData, setEstruturaFisicaData] = useState([]);
  const [insumosData, setInsumosData] = useState([]);
  const [capitalGiroData, setCapitalGiroData] = useState([]);
  const [isEstimarCapitalOpen, setIsEstimarCapitalOpen] = useState(false);

  useEffect(() => {
    fetchEstruturaData();
    fetchInsumosData();
    fetchCapitalGiroData();
  }, []);

  const fetchEstruturaData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/investimentos/estrutura`);
      if (!response.ok) {
        throw new Error('Falha na resposta do servidor');
      }
      const data = await response.json();
      setEstruturaFisicaData(data);
    } catch (error) {
      console.error('Erro ao buscar dados de estrutura:', error);
    }
  };
  

  const fetchInsumosData = async () => {
    const response = await fetch(`${API_BASE_URL}/api/investimentos/insumos`);
    const data = await response.json();
    setInsumosData(data);
  };

  const fetchCapitalGiroData = async () => {
    const response = await fetch(`${API_BASE_URL}/api/investimentos/capital-de-giro`);
    const data = await response.json();
    setCapitalGiroData(data);
  };

  const handleSave = async (data, type) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/investimentos/${type}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      if (response.ok) {
        switch (type) {
          case 'estrutura':
            fetchEstruturaData(); // Atualiza os dados de estrutura após adicionar um novo
            break;
          case 'insumos':
            fetchInsumosData();
            break;
          case 'capital-de-giro':
            fetchCapitalGiroData();
            break;
          default:
            break;
        }
        setIsEstruturaFisicaModalOpen(false);
        setIsEstimarCapitalOpen(false);
        setIsInsumosModalOpen(false);
      } else {
        throw new Error('Falha ao salvar os dados.');
      }
    } catch (error) {
      console.error('Erro:', error);
    }
  };
  
  const handleDelete = async (id, type) => {
    const url = `${API_BASE_URL}/api/investimentos/${type}/${id}`; // Construindo a URL dinâmica
    const response = await fetch(url, {
      method: 'DELETE',
    });
    if (response.ok) {
      // Atualizando os dados dependendo do tipo de investimento
      switch (type) {
        case 'estrutura':
          fetchEstruturaData();
          break;
        case 'insumos':
          fetchInsumosData();
          break;
        case 'capital-de-giro':
          fetchCapitalGiroData();
          break;
        default:
          break;
      }
    } else {
      alert("Falha ao excluir o item.");
    }
  };
  

  const openEstruturaFisicaModal = () => {
    setIsEstruturaFisicaModalOpen(true);
  };

  const openInsumosModal = () => {
    setIsInsumosModalOpen(true);
  };

  const openCapitalGiroModal = () => {
    setIsEstimarCapitalOpen(true);
  };

  function calcularTotal(estruturaFisicaData) {
    let total = 0;
    estruturaFisicaData.forEach((estrutura) => {
      total += parseFloat(estrutura.investimento);
    });
    return `R$ ${total.toFixed(2)}`;
  }

  function insumosTotalData(insumosData) {
    let total = 0;
    insumosData.forEach((insumo) => {
      total += parseFloat(insumo.investimento);
    });
    return total.toFixed(2);
  }

  function capitalGiroTotalData(capitalGiroData) {
    let total = 0;
    capitalGiroData.forEach((capital) => {
      total += parseFloat(capital.investimento_total);
    });
    return total.toFixed(2);
  }

  return (
    <Layout>
      <div className='dashboard-page'>
        <div className='dashboard-content'>
          <div className='title'>
            <h1>Investimentos Necessários para Implementar o Negócio</h1>
          </div>
          <div className='dashboard-col'>
            <p>Vamos definir e estimar as Despesas Mensais do seu Negócio</p>
            <div className='title'>
              <h3>Estrutura física/Virtual</h3>
            </div>
            <div className='add-button'>
              <Link onClick={openEstruturaFisicaModal}>Adicionar Estrutura Física/Virtual</Link>
            </div>
            <div className='table-container'>
              <table>
                <thead>
                  <tr>
                    <th>Estrutura Física/Virtual</th>
                    <th>Despesa R$/Mês</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {estruturaFisicaData.map((estrutura) => (
                    <tr key={estrutura.id}>
                      <td>{estrutura.estrutura}</td>
                      <td>{estrutura.investimento}</td>
                      <td>
                        <button onClick={() => handleDelete(estrutura.id, 'estrutura')}><FaTrashAlt /></button>
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td><strong>Total</strong></td>
                    <td colSpan="2"><strong>{calcularTotal(estruturaFisicaData)}</strong></td>
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
                    <th>Investimento R$/Mês</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {insumosData.map((insumo) => (
                    <tr key={insumo.id}>
                      <td>{insumo.insumo}</td>
                      <td>{insumo.investimento}</td>
                      <td>
                        <button onClick={() => handleDelete(insumo.id, 'insumos')}><FaTrashAlt /></button>
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td><strong>Total</strong></td>
                    <td colSpan="2"><strong>R$ {insumosTotalData(insumosData)}</strong></td>
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
              <Link onClick={openCapitalGiroModal}>Adicionar Capital de Giro</Link>
            </div>
            <div className='table-container'>
              <table>
                <thead>
                  <tr>
                    <th>Investimento R$/Mês</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {capitalGiroData.map((capital) => (
                    <tr key={capital.id}>
                      <td>{capital.investimento_total}</td>
                      <td>
                        <button onClick={() => handleDelete(capital.id, 'capital-de-giro')}><FaTrashAlt /></button>
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td><strong>Total</strong></td>
                    <td colSpan="2"><strong>R$ {capitalGiroTotalData(capitalGiroData)}</strong></td>
                  </tr>
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
          onSave={handleSave}
        />
      )}
      {isEstimarCapitalOpen && (
        <CapitalGiroModal
          isOpen={isEstimarCapitalOpen}
          onClose={() => setIsEstimarCapitalOpen(false)}
          onSave={handleSave}
        />
      )}
      {isInsumosModalOpen && (
        <InsumosModal
          isOpen={isInsumosModalOpen}
          onClose={() => setIsInsumosModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </Layout>
  );
};

export default EstimarInvestimentos;
