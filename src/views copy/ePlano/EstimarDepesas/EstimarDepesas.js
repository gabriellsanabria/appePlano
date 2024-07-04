import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Layout from '../../../components/Layout/layout';
import './EstimarDepesas.scss';  // Asegure-se de que este arquivo contém os estilos necessários
import EstruturaFisicaModal from './EstimarDepesasModal';
import EquipeModal from './EquipeModal';
import InsumosModal from './InsumosModal';
import { API_BASE_URL, API_BASE_URL_AMPLIFY } from '../../../apiConfig';

const EstimarDepesas = () => {
  const [isEstruturaFisicaModalOpen, setIsEstruturaFisicaModalOpen] = useState(false);
  const [isEquipeModalOpen, setIsEquipeModalOpen] = useState(false);
  const [isInsumosModalOpen, setIsInsumosModalOpen] = useState(false);
  const [estruturaFisicaData, setEstruturaFisicaData] = useState([]);
  const [equipeData, setEquipeData] = useState([]);
  const [insumosData, setInsumosData] = useState([]);

  useEffect(() => {
    fetchEstruturaData();
    fetchEquipeData();
    fetchInsumosData();
  }, []);

  const fetchEstruturaData = async () => {
    const response = await fetch(`${API_BASE_URL}/api/despesas/estrutura`);
    const data = await response.json();
    setEstruturaFisicaData(data);
  };

  const fetchEquipeData = async () => {
    const response = await fetch(`${API_BASE_URL}/api/despesas/equipe`);
    const data = await response.json();
    setEquipeData(data);
  };

  const fetchInsumosData = async () => {
    const response = await fetch(`${API_BASE_URL}/api/despesas/insumos`);
    const data = await response.json();
    setInsumosData(data);
  };

  const handleDelete = async (id, type) => {
    const response = await fetch(`${API_BASE_URL}/api/despesas/${type}/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      if (type === 'estrutura') fetchEstruturaData();
      else if (type === 'equipe') fetchEquipeData();
      else if (type === 'insumos') fetchInsumosData();
    } else {
      alert("Falha ao excluir o item.");
    }
  };

  const totalEstrutura = estruturaFisicaData.reduce((acc, item) => acc + item.custo, 0);
  const totalEquipe = equipeData.reduce((acc, item) => acc + item.custo, 0);
  const totalInsumos = insumosData.reduce((acc, item) => acc + item.custo, 0);

  const openEstruturaFisicaModal = () => {
    setIsEstruturaFisicaModalOpen(true);
  };

  const openEquipeModal = () => {
    setIsEquipeModalOpen(true);
  };

  const openInsumosModal = () => {
    setIsInsumosModalOpen(true);
  };

  function calcularTotal(estruturaFisicaData) {
    let total = 0;
    estruturaFisicaData.forEach((estrutura) => {
      total += parseFloat(estrutura.custo); // Certifique-se de converter o custo para um número
    });
    return `R$ ${total.toFixed(2)}`; // Agora você pode chamar toFixed na variável total, que é um número
  }
  function equipeTotalData(equipeData) {
    let total = 0;
    equipeData.forEach((membro) => {
      total += parseFloat(membro.custo); // Certifique-se de converter o custo para um número
    });
    return total.toFixed(2); // Retorna o total formatado como string com duas casas decimais
  }
  function insumosTotalData(insumosData) {
    let total = 0;
    insumosData.forEach((insumo) => {
      total += parseFloat(insumo.custo); // Certifique-se de converter o custo para um número
    });
    return total.toFixed(2); // Retorna o total formatado como string com duas casas decimais
  }

  return (
    <Layout>
      <div className='dashboard-page'>
        <div className='dashboard-content'>          
            <div className='title'>
              <h1>Estimar Despesas Mensais do Negócio</h1>
            </div>
            <div className='texts'>
            <p>Vamos estimar as Despesas Mensais do seu Negócio</p>
            <p>
              <b>
              INSTRUÇÕES PARA DEFINIR E ESTIMAR AS DESPESAS MENSAIS DO SEU NEGÓCIO
              </b>
            </p>
            <p>Esta Tela tem o Objetivo de Definir e Estimar todas as Despesas que o seu Negócio terá mensalmente</p>
            <p>Para facilitar, as Despesas foram separadas em:</p>
            
          </div>
          <div className='dashboard-col'>    
            <div className='title'>
              <h3>Estrutura Física/Virtual</h3>
            </div> 
            <div className='texts'>
          <p>Estrutura Física/ Virtual: neste Botão você deve inserir Despesas como.</p>
            <ul>
              <li>Aluguel, Energia Elétrica, Telefone, Água/ Esgoto, Gás etc.</li>
              <li>Seguro da Estrutura, Taxas etc.</li>
              <li>Marketing (impulsionamentos, Itens de divulgação etc.).</li>
              <li>Taxas Estimadas com Cartões etc.</li>
              <li>Manutenção do Site.</li>
              <li>Manutenção da Estrutura.</li>
              <li>Caixa de Reserva Mensal.</li>
              <li>Planos de Saúde.</li>
              <li>Consumíveis Mensais (produtos de limpeza, café e água, por exemplo)</li>
              <li>Etc.</li>
            </ul>
            <p>Se algum destes Valores for uma Despesa Anual, divida o Valor pelos 12 meses para inserir o Valor Mensal.</p>
            <p>Clique no Botão “Adicionar Estrutura Física/ Virtual” e insira o nome do Item e qual é o Valor Mensal. E Salve.</p>
            <p>Repita este passo para Todas as Despesas com Estrutura.</p>    
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
                  {/* Mapear os dados para renderizar as linhas */}
                  {estruturaFisicaData.map((estrutura) => (
                    <tr key={estrutura.id}>
                      <td>{estrutura.nome}</td>
                      <td>{estrutura.custo}</td>
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
              <h3>Equipe</h3>
            </div>
            <div className='texts'>
          <p>neste Botão você deve inserir Despesas como:</p>
            <ul>
              <li>Salários dos Funcionários: Considere Todos os Encargos.</li>
              <li>Pagamentos de Consultorias e Assessorias (Marketing e Contabilidade, por exemplo).</li>
              <li>Etc.</li>
            </ul>
            
            <p>Se algum destes Valores for uma Despesa Anual, divida o Valor pelos 12 meses para inserir o Valor Mensal.</p>
            <p>Clique no Botão “Adicionar Equipe” e insira o nome do Item e qual é o Valor Mensal. E Salve.</p>
            <p>Repita este passo para Todas as Despesas com Equipe.</p>
      
            <div className='add-button'>
              <Link onClick={openEquipeModal}>Adicionar Equipe</Link>
            </div>
            </div>
            <div className='table-container'>
              <table>
                <thead>
                  <tr>
                    <th>Cargo</th>
                    <th>Despesa R$/Mês</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Mapear os dados para renderizar as linhas */}
                  {equipeData.map((membro) => (
                    <tr key={membro.id}>
                      <td>{membro.cargo}</td>
                      <td>{membro.custo}</td>
                      <td>
                        <button onClick={() => handleDelete(membro.id, 'equipe')}><FaTrashAlt /></button>
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan="1"><strong>Total</strong></td>
                    <td><strong>R$ {equipeTotalData(equipeData)}</strong></td>
                    <td></td>
                  </tr>
                </tbody>
              </table>

            </div>
          </div>
          <div className='dashboard-col'>            
            <div className='title'>
              <h3>Insumos de Produção e Vendas</h3>
            </div>
            
            <div className='texts'>
              <p>neste Botão você deve inserir Despesas como os Insumos necessários para Operação do Negócio:</p>
              <p>Este Botão é relacionado com as Receitas.</p>
              <p>Se você vende um refrigerante, este precisa ser comprado. Aqui neste botão é para inserir os Insumos e Estimar qual é o custo Unitário e as quantidades a serem vendidas mensalmente.</p>
              <p>Faça a relação com os Itens inseridos nas Receitas. Este item deve conter as Despesas com todos os Insumos que serão comprados Mensalmente.</p>

              <p>Se algum destes Valores for uma Despesa Anual, divida o Valor pelos 12 meses para inserir o Valor Mensal.</p>
              <p>Clique no Botão “Adicionar Insumos” e insira o nome do Insumo e qual é o Valor Mensal. E Salve.</p>
              <p>Repita este passo para Todas as Despesas com Insumos.</p>

              <p>Quando todas as Despesas estiverem Estimadas, clique no Botão “Avançar” para prosseguir com o seu ePlano Financeiro.</p>

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
                      <td>{insumo.insumo}</td>
                      <td>{insumo.custo}</td>
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
        </div>
      </div>
      {isEstruturaFisicaModalOpen && (
        <EstruturaFisicaModal
          isOpen={isEstruturaFisicaModalOpen}
          onClose={() => setIsEstruturaFisicaModalOpen(false)}
          onSave={fetchEstruturaData} // Passar a função fetchEstruturaData para atualizar os dados locais
        />
      )}


      {isEquipeModalOpen && (
        <EquipeModal
          isOpen={isEquipeModalOpen}
          onClose={() => setIsEquipeModalOpen(false)}
          onSave={fetchEquipeData} // Passar a função fetchEquipeData para atualizar os dados locais da equipe
        />
      )}

      {isInsumosModalOpen && (
        <InsumosModal
          isOpen={isInsumosModalOpen}
          onClose={() => setIsInsumosModalOpen(false)}
          onSave={fetchInsumosData}
        />
      )}
    </Layout>
  );
};

export default EstimarDepesas;
