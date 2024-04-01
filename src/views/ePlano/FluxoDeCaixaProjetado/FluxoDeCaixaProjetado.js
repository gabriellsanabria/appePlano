import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrashAlt } from 'react-icons/fa'; // Importe os ícones necessários do Font Awesome

import Layout from '../../../components/Layout/layout';
import './FluxoDeCaixaProjetado.scss'; // Importe ou crie este arquivo para estilizar a página

const FluxoDeCaixaProjetado = () => {
  const tableRef = useRef(null);
  // Array de meses
  const meses = ['Jan/24', 'Fev/24', 'Mar/24', 'Abr/24', 'Mai/24', 'Jun/24', 'Jul/24', 'Ago/24', 'Set/24', 'Out/24', 'Nov/24', 'Dez/24'];

  // Função para renderizar as células de cada linha
  const renderCells = () => {
    return meses.map((mes, index) => (
      <td key={index}>R$ X</td> // Substitua 'R$ X' pelo valor correspondente
    ));
  };
  return (
    <Layout>
      <div className='dashboard-page'>
        <div className='dashboard-content'>
          <div className='title'>
            <h1>Fluxo de Caixa Projetado</h1>
            <p>Liste e descreva todos os lançamentos previstos para o fluxo de caixa.</p>
          </div>
          <div className='table-container'>
            <h4>CÁLCULO DOS PAGAMENTOS MENSAIS DOS INVESTIMENTOS</h4>
            <div className='scrollable-table'>
              <table className='cash-flow-table'>
                <thead>
                  <tr>
                    <th style={{ width: '200px' }}>Cálculo</th>
                    {meses.map((mes, index) => (
                      <th key={index}>{mes}</th>
                    ))}
                    <th>Total Anual</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Estrutura Física Virtual</td>
                    {renderCells()}
                    <td>R$ X_total</td>
                  </tr>
                  <tr>
                    <td>Insumos de Produção</td>
                    {renderCells()}
                    <td>R$ Y_total</td>
                  </tr>
                  <tr>
                    <td>Capital de Giro Próprio</td>
                    {renderCells()}
                    <td>R$ Z_total</td>
                  </tr>
                  <tr>
                    <td>Capital de Giro de Terceiros</td>
                    {renderCells()}
                    <td>R$ W_total</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FluxoDeCaixaProjetado;
