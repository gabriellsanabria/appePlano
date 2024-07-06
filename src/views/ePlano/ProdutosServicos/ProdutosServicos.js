import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../../components/Layout/layout';
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb';
import PageHeader from '../../../components/PageHeader/PageHeader';
import { SiHackthebox } from 'react-icons/si';
import { HiDotsVertical } from "react-icons/hi";
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { useTable, usePagination } from 'react-table';
import { FaChevronRight, FaChevronLeft, FaShare } from "react-icons/fa";
import { FiChevronsLeft, FiChevronsRight, FiShare } from "react-icons/fi";

const Planejador = () => {
  const headerTitle = 'Produtos e Serviços';
  const headerSubtitle = 'Liste e Descreva os Produtos/Serviços que o seu Negócio irá comercializar';
  const sideType = 'SideFormProdutos';
  const headerIcon = SiHackthebox;

  const breadcrumbItems = [
    { label: 'Dashboard', path: '/' },
    { label: 'Planejamento Financeiro', path: '/planejador-financeiro' },
    { label: headerTitle, path: '/dashboard' },
  ];

  const renderRowActions = (mpId, row) => {
    return (
      <div className="row-actions">
        <Link to={`/ficha-tecnica`}>
          <FaEdit /> Editar
        </Link>
        <Link>
          <FaTrashAlt /> Deletar
        </Link>
      </div>
    );
  };

  // Dados para a tabela (exemplo de dados)
  const data = React.useMemo(
    () => [
      { id: 1, produto: 'Produto A', descricao: 'Descrição do Produto A' },
      { id: 2, produto: 'Produto B', descricao: 'Descrição do Produto B' },
      { id: 3, produto: 'Produto C', descricao: 'Descrição do Produto C' },
      { id: 1, produto: 'Produto A', descricao: 'Descrição do Produto A' },
      { id: 2, produto: 'Produto B', descricao: 'Descrição do Produto B' },
      { id: 3, produto: 'Produto C', descricao: 'Descrição do Produto C' },
      { id: 1, produto: 'Produto A', descricao: 'Descrição do Produto A' },
      { id: 2, produto: 'Produto B', descricao: 'Descrição do Produto B' },
      { id: 3, produto: 'Produto C', descricao: 'Descrição do Produto C' },
      { id: 1, produto: 'Produto A', descricao: 'Descrição do Produto A' },
      { id: 2, produto: 'Produto B', descricao: 'Descrição do Produto B' },
      { id: 3, produto: 'Produto C', descricao: 'Descrição do Produto C' },
      { id: 1, produto: 'Produto A', descricao: 'Descrição do Produto A' },
      { id: 2, produto: 'Produto B', descricao: 'Descrição do Produto B' },
      { id: 3, produto: 'Produto C', descricao: 'Descrição do Produto C' },
    ],
    []
  );

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

  // Colunas da tabela
  const columns = React.useMemo(
    () => [
      {
        id: 'checkbox',
        Header: ({ getToggleAllRowsSelectedProps }) => (
          <input
            type="checkbox"
            checked={selectedRows.length === data.length}
            onChange={handleSelectAllChange}
          />
        ),
        Cell: ({ row }) => (
          <input
            type="checkbox"
            checked={selectedRows.includes(row.original.id)}
            onChange={() => handleCheckboxChange(row.original.id)}
          />
        ),
      },
      { Header: 'Produto', accessor: 'produto' },
      { Header: 'Descrição', accessor: 'descricao' },
      {
        Header: 'Ações',
        accessor: 'acoes',
        Cell: ({ row }) => (
          <div className="actions-container">
            <div className='Dots'>
              <HiDotsVertical />
            </div>
            <div className="popover-content">
              {renderRowActions(row.original.mp_id, row)}
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

  return (
    <Layout>
      <div className="container">
        <Breadcrumb items={breadcrumbItems} />
        <PageHeader title={headerTitle} subtitle={headerSubtitle} icon={headerIcon} sideType={sideType}/>
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
              {[5, 10, 20, 30, 40, 50].map((pageSize) => (
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
    </Layout>
  );
};

export default Planejador;
