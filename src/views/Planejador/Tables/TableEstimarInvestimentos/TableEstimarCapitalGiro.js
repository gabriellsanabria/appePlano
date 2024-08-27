import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Alertas from '../../../../components/Alertas/Alertas';

import { PiChartLineDownBold, PiChartLineUpBold } from "react-icons/pi";
import { HiDotsVertical } from "react-icons/hi";
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { useTable, usePagination } from 'react-table';
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";
import { API_BASE_URL, API_BASE_URL_AMPLIFY } from '../../../../apiConfig';
import useAuth from '../../../../hooks/useAuth';

const TableEstimarDespesasEquipe = ({onTotalInvestimentosCapitalChange}) => {
  // Estado para os dados da API
  const [apiData, setApiData] = useState([]);
  const [saveMessage, setSaveMessage] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null); // Estado para mensagem de alerta
  const [alertType, setAlertType] = useState(null); // Estado para o tipo de alerta
  const [totalInvestimentos, setTotalInvestimentos] = useState(0);

  // Obtendo o usuário e o estado de carregamento do hook useAuth
  const { user, loading } = useAuth();
  const userId = user ? user.uid : null;

  // Função para buscar os dados da API
const fetchData = async () => {
    try {
      const response = await fetch(`https://api.eplano.com.br/api/investimentos/capital-de-giro/user/${userId}`);
      if (response.ok) {
        let data = await response.json();
        // Ordenando os dados por produto_servico em ordem alfabética
        data.sort((a, b) => a.investimento_total.localeCompare(b.investimento_total));
        
        const totalInvestimentos = data.reduce((sum, item) => sum + parseFloat(item.investimento_total) || 0, 0);
        setTotalInvestimentos(totalInvestimentos);
  
        setApiData(data);
        if (onTotalInvestimentosCapitalChange) onTotalInvestimentosCapitalChange(totalInvestimentos);
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
      const confirmacao = window.confirm('Tem certeza que deseja excluir este Produto/Serviço?');
      
      // Se o usuário cancelar, retorna sem fazer nada
      if (!confirmacao) {
        return;
      }
  
      // Se confirmado, prossegue com a exclusão
      const response = await fetch(`${API_BASE_URL}/api/investimentos/capital-de-giro/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Falha ao excluir Produto/Serviço');
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
        cargo: item.cargo,
        investimento_total: item.investimento_total,
      })),
    [apiData]
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
        Header: <strong>Capital de Giro</strong>, 
        accessor: 'investimento_total',
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
  } = useTable(
    { columns, data, initialState: { pageSize: 3 } }, // Aqui definimos o pageSize inicial como 5
    usePagination
  );

  // Função onAdd para ser passada para SideFormProdutos
  const handleAddProduto = (newItem) => {
    setApiData([...apiData, newItem]); // Adiciona o novo item ao estado apiData
    // alert('Produto adicionado com sucesso!');
    // Lógica adicional se necessário
  };

  return (
      <>
        <div className="container">
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
      </>
  );
};

export default TableEstimarDespesasEquipe;
