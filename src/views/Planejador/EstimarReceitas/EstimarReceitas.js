import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../../components/Layout/layout';
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb';
import PageHeader from '../../../components/PageHeader/PageHeader';
import Alertas from '../../../components/Alertas/Alertas';

import { PiChartLineDownBold, PiChartLineUpBold } from "react-icons/pi";
import { HiDotsVertical } from "react-icons/hi";
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { useTable, usePagination } from 'react-table';
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";
import { API_BASE_URL, API_BASE_URL_AMPLIFY } from '../../../apiConfig';
import useAuth from '../../../hooks/useAuth'; // Importe o hook useAuth


const EstimarReceitas = () => {
  const headerTitle = 'Estimar Receitas';
  const headerSubtitle = 'Vamos estimar as Receitas Mensais do seu Negócio';
  const sideType = 'SideFormEstimarReceitas';
  const headerIcon = PiChartLineUpBold;

  const breadcrumbItems = [
    { label: 'Resumo', path: '/' },
    { label: 'Simulador de Negócios', path: '/planejador-financeiro' },
    { label: headerTitle, path: '/dashboard' },
  ];

  // Estado para os dados da API
  const [apiData, setApiData] = useState([]);
  const [saveMessage, setSaveMessage] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null); // Estado para mensagem de alerta
  const [alertType, setAlertType] = useState(null); // Estado para o tipo de alerta

  // Obtendo o usuário e o estado de carregamento do hook useAuth
  const { user, loading } = useAuth();
  const userId = user ? user.uid : null;
  
  // Função para buscar os dados da API
  const fetchData = async () => {
    if (!userId) {
      console.error('User ID não disponível');
      return;
    }

    console.log('Buscando dados para o User ID:', userId);

    try {
      const response = await fetch(`https://api.eplano.com.br/receitas_mensais_negocio/user/${userId}`);
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erro ao buscar dados da API: ${errorText}`);
      }
      
      let data = await response.json();
      console.log('Dados recebidos:', data);
      
      // Ordenando os dados por produto_servico em ordem alfabética
      data.sort((a, b) => a.produto_servico.localeCompare(b.produto_servico));
      setApiData(data);
    } catch (error) {
      console.error('Erro:', error);
    }
  };


  const handleExcluirProdutoServico = async (id) => {
    try {
      // Exibe um alerta de confirmação
      const confirmacao = window.confirm('Tem certeza que deseja excluir este produto/serviço?');
      
      // Se o usuário cancelar, retorna sem fazer nada
      if (!confirmacao) {
        return;
      }
  
      // Se confirmado, prossegue com a exclusão
      const response = await fetch(`${API_BASE_URL}/excluir_receita_mensal_negocio/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Falha ao excluir produto/serviço');
      }
      fetchData(); // Atualiza os dados após a exclusão
      setAlertMessage('Produto/Serviço Deletado com sucesso!');
      setAlertType('success');
    } catch (error) {
      console.error(error);
    }
  };
  

  useEffect(() => {
    if (!loading && userId) {
      fetchData();
    }
  }, [loading, userId]); // Executa quando o loading mudar ou userId estiver disponível

  // Estado para os checkboxes
  const [selectedRows, setSelectedRows] = useState([]);

  const handleCheckboxChange = (id) => {
    setSelectedRows((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((rowId) => rowId !== id)
        : [...prevSelected, id]
    );
  };

  const handleSelectAllChange = () => {
    if (selectedRows.length === data.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(data.map((row) => row.id));
    }
  };

  // Função para renderizar ações de linha
  const renderRowActions = (id, row) => {
    return (
      <div className="row-actions">
        <Link to={`/ficha-tecnica`}>
          <FaEdit /> Editar
        </Link>
        <Link onClick={() => handleExcluirProdutoServico(id)}>
          <FaTrashAlt /> Deletar
        </Link>
      </div>
    );
  };

  // Mapeando os dados da API para o formato esperado pelo react-table
  const data = useMemo(
    () =>
      apiData.map((item) => ({
        id: item.id,
        produto_servico: item.produto_servico,
        valor_unitario: item.valor_unitario,
        quantidade_vendida_por_mes: item.quantidade_vendida_por_mes,
        total_mensal: item.quantidade_vendida_por_mes*item.valor_unitario,
      })),
    [apiData]
  );
  
// Calcular o total geral dos valores mensais
const totalGeral = apiData.reduce(
  (acc, item) => acc + item.quantidade_vendida_por_mes * item.valor_unitario,
  0
);


  const columns = useMemo(
    () => [
      {
        Header: (
          <input
            type="checkbox"
            checked={selectedRows.length === data.length}
            onChange={handleSelectAllChange}
          />
        ),
        accessor: 'selection',
        Cell: ({ row }) => (
          <input
            type="checkbox"
            checked={selectedRows.includes(row.original.id)}
            onChange={() => handleCheckboxChange(row.original.id)}
          />
        ),
        disableSortBy: true,
      },
      { 
        Header: <strong>Produto</strong>, 
        accessor: 'produto_servico',
        Cell: ({ value }) => <strong>{value}</strong>, 
      },
      {
        Header: <strong>Valor unitário de Venda (R$)</strong>,
        accessor: 'valor_unitario',
        Cell: ({ value }) => (
          <strong>
            R$ {parseFloat(value).toLocaleString('pt-BR', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </strong>
        ),
      },
      
      { 
        Header: <strong> Quantidade Vendida por Mês	</strong>, 
        accessor: 'quantidade_vendida_por_mes',
        Cell: ({ value }) => (
          value ? value : '-'
        ),
      },
      { 
        Header: <strong>Total Mensal</strong>, 
        accessor: 'total_mensal',
        Cell: ({ value }) => (
          <strong>
            R$ {parseFloat(value).toLocaleString('pt-BR', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </strong>
        ), 
      },  
      {
        Header: 'Ações',
        accessor: 'acoes',
        Cell: ({ row }) => (
          <div className="actions-container">
            <div className='Dots'>
              <HiDotsVertical />
            </div>
            <div className="popover-content">
              {renderRowActions(row.original.id, row)}
            </div>
          </div>
        ),
      }
    ],
    [selectedRows, data]
  );
  

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    gotoPage,
    previousPage,
    nextPage,
    canPreviousPage,
    canNextPage,
    state: { pageIndex, pageSize, pageCount, pageOptions },
    setPageSize,
  } = useTable({ columns, data }, usePagination);

  // Função onAdd para ser passada para SideFormProdutos
  const handleAddProduto = (newItem) => {
    setApiData([...apiData, newItem]); // Adiciona o novo item ao estado apiData
    // alert('Produto adicionado com sucesso!');
    // Lógica adicional se necessário
  };

  const hasTotal = true;
  // const valorTotal = totalCusto;
  
  const valorTotalReceitas = [totalGeral];
  const labelTotalArray = 'Receitas';

  // Usando o método split para criar um array
  const labelTotal = labelTotalArray.split(', ');
  // const valorTotalReceitas = valorTotalArray.split(', ');

  

  return (
    <Layout>
      <div className="container">
        <Breadcrumb items={breadcrumbItems} />
        <PageHeader
          title={headerTitle}
          subtitle={headerSubtitle}
          hasTotal={hasTotal}
          labelTotal={labelTotal}
          valorTotalOn={valorTotalReceitas}
          icon={headerIcon}
          sideType={sideType}
          onAdd={handleAddProduto} // Passando a função onAdd para PageHeader
        />
        <table {...getTableProps()} className="table">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="pagination">
          <div className="pagination_select">
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
            >
              {[3, 5, 10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  mostrar {pageSize}
                </option>
              ))}
            </select>
          </div>
          <div className="numero_paginas"></div>
          <div className="pagination_Bt">
            <button
              className="chevronBt"
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
            >
              <FiChevronsLeft />
            </button>
            <button
              className="chevronBt"
              onClick={previousPage}
              disabled={!canPreviousPage}
            >
              <FaChevronLeft />
            </button>
            <div className="numero_paginas">
              <span>
                ir para página:{' '}
                <input
                  type="number"
                  defaultValue={pageIndex + 1}
                  onChange={(e) => {
                    const page = e.target.value ? Number(e.target.value) - 1 : 0;
                    gotoPage(page);
                  }}
                  style={{ width: '100px' }}
                />
              </span>{' '}
            </div>
            <div className="numero_paginas">
              {pageOptions ? `${pageIndex + 1} de ${pageOptions.length}` : ''}
            </div>
            <button
              className="chevronBt"
              onClick={nextPage}
              disabled={!canNextPage}
            >
              <FaChevronRight />
            </button>
            <button
              className="chevronBt"
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              <FiChevronsRight />
            </button>
          </div>
        </div>
      </div>
      {saveMessage && 
        <Alertas message={saveMessage} type={alertType} onClose={() => setSaveMessage(null)} />
      }
      {alertMessage && 
        <Alertas message={alertMessage} type={alertType} onClose={() => setAlertMessage(null)} />
      }
    </Layout>
  );
};

export default EstimarReceitas;
