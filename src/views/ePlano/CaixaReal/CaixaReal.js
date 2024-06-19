import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Layout from '../../../components/Layout/layout';
import './Caixa.scss'; // Importe ou crie este arquivo para estilizar a página
import CaixaLiquidoModal from './CaixaLiquidoModal'; // Importe o modal de Estrutura Física/Virtual
import CaixaEstoqueModal from './CaixaEstoqueModal'; // Importe o modal de Estrutura Física/Virtual
import CaixaRecebiveisModal from './CaixaRecebiveisModal'; // Importe o modal de Estrutura Física/Virtual
import CaixaContasPagarModal from './CaixaContasPagarModal'; // Importe o modal de Estrutura Física/Virtual

import TwoColumnLayout from '../../../components/Layout/TwoColumnLayout';

import ButtonsEplano from '../../Dashboard/ButtonsEplano';
import { API_BASE_URL, API_BASE_URL_AMPLIFY } from '../../../apiConfig';

const CaixaReal = () => {
  const [isCaixaLiquidoModalOpen, setIsCaixaLiquidoModalOpen] = useState(false);
  const [isCaixaEstoqueModalOpen, setIsCaixaEstoqueModalOpen] = useState(false);
  const [isCaixaRecebiveisModalOpen, setIsCaixaRecebiveisModalOpen] = useState(false);
  const [isCaixaContasPagarModalOpen, setIsCaixaContasPagarModalOpen] = useState(false);

  const [caixaLiquido, setCaixaLiquido] = useState([]);
  const [caixaEstoque, setCaixaEstoque] = useState([]);
  const [caixaRecebiveis, setCaixaRecebiveis] = useState([]);
  const [contasPagar, setContasPagar] = useState([]);

  useEffect(() => {
    fetchCaixaLiquido();
    fetchCaixaEstoque();
    fetchCaixaRecebiveis();
    fetchCaixaContasPagar();
  }, []);

  const fetchCaixaLiquido = async () => {
    const response = await fetch(`${API_BASE_URL}/api/caixa/liquido`);
    const data = await response.json();
    setCaixaLiquido(data);
  };
  
  const fetchCaixaEstoque = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/caixa/estoque`);
      const data = await response.json();
      console.log('Dados recebidos da API:', data); // Verifica se os dados estão corretos
      setCaixaEstoque(data);
    } catch (error) {
      console.error('Erro ao buscar dados do caixa estoque:', error);
    }
  };
  

  const fetchCaixaRecebiveis = async () => {
    const response = await fetch(`${API_BASE_URL}/api/caixa/recebiveis`);
    const data = await response.json();
    setCaixaRecebiveis(data);
  };

  const fetchCaixaContasPagar = async () => {
    const response = await fetch(`${API_BASE_URL}/api/caixa/contas_pagar`);
    const data = await response.json();
    setContasPagar(data);
  };


const handleSave = async (data, type) => {
  try {
    console.log('Iniciando o processo de salvamento...');
    console.log('Dados a serem salvos:', data);
    console.log('Tipo de dados:', type);

    const response = await fetch(`${API_BASE_URL}/api/caixa/${type}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    console.log('Resposta recebida:', response);

    if (response.ok) {
      console.log('Resposta OK, atualizando dados...');

      switch (type) {
        case 'liquido':
          console.log('Atualizando caixa líquido...');
          fetchCaixaLiquido();
          break;
        case 'estoque':
          console.log('Atualizando caixa estoque...');
          fetchCaixaEstoque();
          break;
        case 'recebiveis':
          console.log('Atualizando caixa recebíveis...');
          fetchCaixaRecebiveis();
          break;
        case 'contas_pagar':
          console.log('Atualizando caixa contas a pagar...');
          fetchCaixaContasPagar();
          break;
        default:
          break;
      }
      console.log('Dados atualizados com sucesso.');

      setIsCaixaLiquidoModalOpen(false);
      setIsCaixaEstoqueModalOpen(false);
      setIsCaixaRecebiveisModalOpen(false);
      setIsCaixaContasPagarModalOpen(false);

    } else {
      console.error('Erro ao salvar os dados:', response.status);
      const errorMessage = await response.text();
      console.error('Mensagem de erro:', errorMessage);
      throw new Error('Falha ao salvar os dados.');
    }
  } catch (error) {
    console.error('Erro durante o processo de salvamento:', error);
  }
};


const handleDelete = async (id, type) => {
  try {
    console.log('Iniciando o processo de deleção...');
    console.log('Dados a serem apagados:', id);
    console.log('Tipo de dados:', type);

    const response = await fetch(`${API_BASE_URL}/api/caixa/${type}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(id)
    });

    console.log('Resposta recebida:', response);

    if (response.ok) {
      console.log('Resposta OK, atualizando dados...');

      switch (type) {
        case 'liquido':
          console.log('Atualizando caixa líquido...');
          fetchCaixaLiquido();
          break;
        case 'estoque':
          console.log('Atualizando caixa estoque...');
          fetchCaixaEstoque();
          break;
        case 'recebiveis':
          console.log('Atualizando caixa recebíveis...');
          fetchCaixaRecebiveis();
          break;
        case 'contas_pagar':
          console.log('Atualizando caixa contas a pagar...');
          fetchCaixaContasPagar();
          break;
        default:
          break;
      }
      console.log('Dados atualizados com sucesso.');

      setIsCaixaLiquidoModalOpen(false);
      setIsCaixaEstoqueModalOpen(false);
      setIsCaixaRecebiveisModalOpen(false);
      setIsCaixaContasPagarModalOpen(false);
    } else {
      console.error('Erro ao salvar os dados:', response.status);
      const errorMessage = await response.text();
      console.error('Mensagem de erro:', errorMessage);
      throw new Error('Falha ao salvar os dados.');
    }
  } catch (error) {
    console.error('Erro durante o processo de salvamento:', error);
  }
};

  // const handleDelete = async (id, type) => {
  //   const url = `${API_BASE_URL}/api/investimentos/${type}/${id}`; // Construindo a URL dinâmica
  //   const response = await fetch(url, {
  //     method: 'DELETE',
  //   });
  //   if (response.ok) {
  //     // Deletando os dados dependendo do tipo de investimento
  //     switch (type) {
  //       case 'liquido':
  //         console.log('Deletando caixa líquido...');
  //         fetchCaixaLiquido();
  //         break;
  //       case 'insumos':
  //         console.log('Deletando caixa estoque...');
  //         fetchCaixaEstoque();
  //         break;
  //       case 'capital-de-giro':
  //         console.log('Deletando caixa recebíveis...');
  //         fetchCaixaRecebiveis();
  //         break;
  //       case 'contas-pagar':
  //         console.log('Deletando caixa contas a pagar...');
  //         fetchCaixaContasPagar();
  //         break;
  //       default:
  //         break;
  //     }
  //   } else {
  //     alert("Falha ao excluir o item.");
  //   }
  // };
  

  const openCaixaLiquidoModal = () => {
    setIsCaixaLiquidoModalOpen(true);
  };

  const openCaixaestoqueModal = () => {
    setIsCaixaEstoqueModalOpen(true);
  };

  const openCaixaRecebiveisModal = () => {
    setIsCaixaRecebiveisModalOpen(true);
  };
  const openCaixaContasPagarModal = () => {
    setIsCaixaContasPagarModalOpen(true);
  };

  // function calcularTotal(estruturaFisicaData) {
  //   let total = 0;
  //   estruturaFisicaData.forEach((estrutura) => {
  //     total += parseFloat(estrutura.investimento);
  //   });
  //   return `R$ ${total.toFixed(2)}`;
  // }

  // function insumosTotalData(insumosData) {
  //   let total = 0;
  //   insumosData.forEach((insumo) => {
  //     total += parseFloat(insumo.investimento);
  //   });
  //   return total.toFixed(2);
  // }

  // function capitalGiroTotalData(capitalGiroData) {
  //   let total = 0;
  //   capitalGiroData.forEach((capital) => {
  //     total += parseFloat(capital.investimento_total);
  //   });
  //   return total.toFixed(2);
  // }

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
            <h1>Estime o Caixa Atual do Negócio </h1>
          </div>
          <div className='texts'>
           <p>Defina e estime o Caixa do seu Negócio. </p>
           <p>Esta tela está organizada em 4 tipos de Caixa, são eles: </p>
           <ul>
            <li>Caixa Líquido.</li>
            <li>Caixa Insumos (Estoque).</li>
            <li>Caixa Recebíveis.</li>
            <li>Caixa Contas a Pagar.</li>
           </ul>
            
          </div>
          <div className='dashboard-col'>
            <p>Vamos Definir e Estimar os Investimento para Implementar o seu Negócio</p>
            <div className='title'>
              <h3>Caixa Líquido</h3>
              <p>
              Neste Botão registre, pelo menos de maneira aproximada, quanto você tem em Caixa Líquido hoje no seu Negócio.
              </p>
              <p>Exemplos de Caixa Líquido</p>
              <ul>
                <li>Dinheiro no Caixa Físico do seu Negócio.</li>
                <li>Dinheiro Aplicado, em geral; na conta corrente de Bancos, Poupanças etc. </li>
              </ul>
              <p>Preenchendo o Caixa Insumos: </p>

              <ul>
                <li>A. Faça uma Estimativa do Caixa Líquido que o seu Negócio possui hoje.</li>
                <li>B. Clique no Botão “Adicionar Caixa Líquido” e insira o total estimado do Caixa Líquido. E Salve.</li>
              </ul>


            </div>
            <div className='add-button'>
              <Link onClick={openCaixaLiquidoModal}>Adicionar Caixa Líquido</Link>
            </div>
            <div className='table-container'>
              <table>
                <thead>
                  <tr>
                    <th>Itens</th>
                    <th>R$/Mês</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {caixaLiquido.map((caixaliquido) => (
                    <tr key={caixaliquido.id}>
                      <td>{caixaliquido.descricao}</td>
                      <td>{caixaliquido.valor}</td>
                      <td>
                        <button onClick={() => handleDelete(caixaliquido.id, 'liquido')}><FaTrashAlt /></button>
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td><strong>Total</strong></td>
                    {/* <td colSpan="2"><strong>{calcularTotal(estruturaFisicaData)}</strong></td> */}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className='dashboard-col'>
            <div className='title'>
              <h3>Caixa Insumos (Estoque)</h3>
            </div>
            <div className='texts'>
            <p>
              Neste Botão registre, pelo menos de maneira aproximada, quanto você tem em Estoque de Insumos hoje no seu Negócio
            </p>
            <p>
              Preenchendo o Caixa Insumos: 
            </p>
            <ul>
              <li>A. Faça uma Estimativa dos Insumos que você possui em Estoque hoje. </li>
              <li>B. Clique no Botão “Adicionar Caixa Insumos” e insira o total estimado de Caixa com Insumos (Estoque). E Salve </li>
            </ul>
            </div>
            <div className='add-button'>
              <Link onClick={openCaixaestoqueModal}>Adicionar Insumos (Estoque)</Link>
            </div>
            <div className='table-container'>
              <table>
                <thead>
                  <tr>
                    <th>Itens</th>
                    <th>R$/Mês</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {caixaEstoque.map((caixaEstoque) => (
                    <tr key={caixaEstoque.id}>
                      <td>{caixaEstoque.descricao}</td>
                      <td>{caixaEstoque.valor}</td>
                      <td>
                        <button onClick={() => handleDelete(caixaEstoque.id, 'estoque')}><FaTrashAlt /></button>
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td><strong>Total</strong></td>
                    {/* <td colSpan="2"><strong>R$ {insumosTotalData(insumosData)}</strong></td> */}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className='dashboard-col'>
            <div className='title'>
              <h3>Caixa Recebíveis</h3>
            </div>
            <div className='texts'>
              <p>Neste Botão registre, pelo menos de maneira aproximada, quanto você tem em Recebíveis, a partir de hoje no seu Negócio</p>
              <p>Exemplos Recebíveis</p>
              <ul>
                <li>Cartão de Crédito a ser recebido. </li>
                <li>Cheques a serem recebidos. </li>
                <li>Pagamentos Parcelados de Clientes que estão em dívida com o seu Negócio. </li>
              </ul>
              <p>Preenchendo o Caixa Recebíveis:</p>
              <ul>
                <li>A. Faça uma Estimativa dos Recebíveis, somando todos os valores que estão te devendo; os valores em aberto hoje.</li>
                <li>B. Clique no Botão “Adicionar Caixa Recebíveis” e insira o total estimado de Caixa com Recebíveis. E Salve. </li>
              </ul>
            </div>
            <div className='add-button'>
              <Link onClick={openCaixaRecebiveisModal}>Adicionar Recebíveis</Link>
            </div>
            <div className='table-container'>
              <table>
                <thead>
                  <tr>
                    <th>Itens</th>
                    <th>Mês R$</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {caixaRecebiveis.map((caixaRecebiveis) => (
                    <tr key={caixaRecebiveis.id}>
                      <td>{caixaRecebiveis.descricao}</td>
                      <td>{caixaRecebiveis.valor}</td>
                      <td>
                        <button onClick={() => handleDelete(caixaRecebiveis.id, 'recebiveis')}><FaTrashAlt /></button>
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td><strong>Total</strong></td>
                    {/* <td colSpan="2"><strong>R$ {capitalGiroTotalData(capitalGiroData)}</strong></td> */}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className='dashboard-col'>
            <div className='title'>
              <h3>Caixa Contas a pagar</h3>
            </div>
            <div className='texts'>
              <p>Neste Botão registre, pelo menos de maneira aproximada, quanto você tem em Contas a Pagar, a partir de hoje no seu Negócio. </p>
              <p>Exemplos de Contas a Pagar: </p>
              <ul>
                <li>Dívidas Negociadas, em geral</li>
                <li>Pagamentos Parcelados de Insumos</li>
              </ul>
              <p>Preenchendo o Caixa Contas a Pagar: </p>
              <ul>
                <li>A. Faça uma Estimativa das Contas a Pagar, somando todos os boletos em aberto hoje.</li>
                <li>B. Clique no Botão “Adicionar Contas a Pagar” e insira o total estimado de Caixa com Contas a Pagar. E Salve. </li>
              </ul>
            </div>
            <div className='add-button'>
              <Link onClick={openCaixaContasPagarModal}>Adicionar Contas</Link>
            </div>
            <div className='table-container'>
              <table>
                <thead>
                  <tr>
                    <th>Itens</th>
                    <th>Mês R$</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {contasPagar.map((contasPagar) => (
                    <tr key={contasPagar.id}>
                      <td>{contasPagar.descricao}</td>
                      <td>{contasPagar.valor}</td>
                      <td>
                        <button onClick={() => handleDelete(contasPagar.id, 'contas_pagar')}><FaTrashAlt /></button>
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td><strong>Total</strong></td>
                    {/* <td colSpan="2"><strong>R$ {capitalGiroTotalData(capitalGiroData)}</strong></td> */}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          </div>
        </TwoColumnLayout>
        </div>
      </div>
      {isCaixaLiquidoModalOpen && (
        <CaixaLiquidoModal
          isOpen={isCaixaLiquidoModalOpen}
          onClose={() => setIsCaixaLiquidoModalOpen(false)}
          onSave={handleSave}
        />
      )}
      {isCaixaEstoqueModalOpen && (
        <CaixaEstoqueModal
          isOpen={isCaixaEstoqueModalOpen}
          onClose={() => setIsCaixaEstoqueModalOpen(false)}
          onSave={handleSave}
        />
      )}
      {isCaixaRecebiveisModalOpen && (
        <CaixaRecebiveisModal
          isOpen={isCaixaRecebiveisModalOpen}
          onClose={() => setIsCaixaRecebiveisModalOpen(false)}
          onSave={handleSave}
        />
      )}
      {isCaixaContasPagarModalOpen && (
        <CaixaContasPagarModal
          isOpen={isCaixaContasPagarModalOpen}
          onClose={() => setIsCaixaContasPagarModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </Layout>
  );
};

export default CaixaReal;
