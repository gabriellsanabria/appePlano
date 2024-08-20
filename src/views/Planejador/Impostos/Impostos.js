import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../../components/Layout/layout';
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb';
import PageHeader from '../../../components/PageHeader/PageHeader';
import Alertas from '../../../components/Alertas/Alertas';

import { SiHackthebox } from 'react-icons/si';
import { HiDotsVertical } from "react-icons/hi";
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { useTable, usePagination } from 'react-table';
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";
import { PiPercentBold } from "react-icons/pi";
import { API_BASE_URL, API_BASE_URL_AMPLIFY } from '../../../apiConfig';


const Impostos = () => {
  const headerTitle = 'Estimar Imposto';
  const headerSubtitle = 'Vamos estimar o Imposto mensal que incide sobre o seu Negócio';
  const sideType = 'SideFormImposto';
  const headerIcon = PiPercentBold;

  const breadcrumbItems = [
    { label: 'Resumo', path: '/' },
    { label: 'Planejamento Financeiro', path: '/planejador-financeiro' },
    { label: headerTitle, path: '/dashboard' },
  ];

  // Estado para os dados da API
  const [apiData, setApiData] = useState([]);
  const [saveMessage, setSaveMessage] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null); // Estado para mensagem de alerta
  const [alertType, setAlertType] = useState(null); // Estado para o tipo de alerta

  // Função para buscar os dados da API
  const fetchData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/listar_impostos_mensais`);
      if (response.ok) {
        let data = await response.json();
        // Ordenando os dados por produto_servico em ordem alfabética
        data.sort((a, b) => a.produto_servico.localeCompare(b.produto_servico));
        setApiData(data);
      } else {
        throw new Error('Erro ao buscar dados da API');
      }
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
      const response = await fetch(`${API_BASE_URL}/excluir_produto_servico/${id}`, {
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
    fetchData();
  }, []); // Executa apenas uma vez ao montar o componente

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
        <Link to={`/editar/imposto`}>
          <FaEdit /> Editar
        </Link>
        {/* <Link onClick={() => handleExcluirProdutoServico(id)}>
          <FaTrashAlt /> Deletar
        </Link> */}
      </div>
    );
  };

  // Mapeando os dados da API para o formato esperado pelo react-table
  const data = useMemo(
    () =>
      apiData.map((item) => ({
        id: item.id,
        valor_imposto_mensal: `${item.valor_imposto_mensal}%`, // Adiciona o símbolo de percentual
      })),
    [apiData]
  );
  
  

  const columns = useMemo(
    () => [
      { 
        Header: <strong>Imposto mensal estimado</strong>, 
        accessor: 'valor_imposto_mensal',
        Cell: ({ value }) => <strong>{value}</strong>, 
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

  return (
    <Layout>
      <div className="container">
        <Breadcrumb items={breadcrumbItems} />
        <PageHeader
          title={headerTitle}
          subtitle={headerSubtitle}
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

export default Impostos;
