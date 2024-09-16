import React, { useState } from 'react';
import Layout from '../../../components/Layout/layout';
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb';
import PageHeader from '../../../components/PageHeader/PageHeader';
import Alertas from '../../../components/Alertas/Alertas';
import SideForm from '../../../components/SideForm/SideForm';

import TableEstimarDespesasEstrutura from '../Tables/TableEstimarDespesas/TableEstimarDespesasEstrutura';
import TableEstimarDespesasEquipe from '../Tables/TableEstimarDespesas/TableEstimarDespesasEquipe';
import TableEstimarDespesasInsumos from '../Tables/TableEstimarDespesas/TableEstimarDespesasInsumos';

import { PiChartLineDownBold } from "react-icons/pi";

const EstimarDespesas = () => {
  const headerTitle = 'Estimar Despesas';
  const headerSubtitle = 'Vamos estimar as Despesas Mensais do seu Negócio';
  const sideType = 'SideFormEstimarDespesasSimulador';
  const headerIcon = PiChartLineDownBold;

  const [totalCustoEstrutura, setTotalCustoEstrutura] = useState(0);
  const handleTotalCustoEstruturaChange = (newTotalCustoEstrutura) => {
    setTotalCustoEstrutura(newTotalCustoEstrutura);
  };

  const [totalCustoEquipe, setTotalCustoEquipe] = useState(0);
  const handleTotalCustoEquipeChange = (newTotalCustoEquipe) => {
    setTotalCustoEquipe(newTotalCustoEquipe);
  };

  const [totalCustoInsumos, setTotalCustoInsumos] = useState(0);
  const handleTotalCustoInsumosChange = (newTotalCustoInsumos) => {
    setTotalCustoInsumos(newTotalCustoInsumos);
  };

  const breadcrumbItems = [
    { label: 'Resumo', path: '/' },
    { label: 'ePlano Financeiro', path: '/planejador-financeiro' },
    { label: headerTitle, path: '/dashboard' },
  ];

  // States to control the visibility of SideForm and overlay
  const [isSideFormOpen, setIsSideFormOpen] = useState(false);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [editId, setEditId] = useState(null); // Novo estado para armazenar o id do item em edição

  // Function to open the SideForm and overlay
  const openSideForm = (id) => {
    setEditId(id);
    setIsSideFormOpen(true);
    setIsOverlayOpen(true);
  };

  // Function to close the SideForm and overlay
  const closeSideForm = () => {
    setIsSideFormOpen(false);
    setIsOverlayOpen(false);
    setEditId(null);
  };

  // Estado para os dados da API
  const [apiData, setApiData] = useState([]);
  const [saveMessage, setSaveMessage] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null); // Estado para mensagem de alerta
  const [alertType, setAlertType] = useState(null); // Estado para o tipo de alerta

  // Função onAdd para ser passada para SideFormProdutos
  const handleAddProduto = async (newItem) => {
    try {
      // Assuming you may want to send `newItem` to an API
      // const response = await fetch(/* API endpoint */, { method: 'POST', body: JSON.stringify(newItem) });
      // if (!response.ok) throw new Error('Failed to add item');
  
      setApiData([...apiData, newItem]);
      setAlertMessage('Adicionado com sucesso!');
      setAlertType('success');
    } catch (error) {
      setAlertMessage('Falha ao adicionar o item. Tente novamente.');
      setAlertType('error');
    }
  };
  

  const hasTotal = true;
  // const valorTotal = totalCusto;

  const valorTotal = [totalCustoEstrutura, totalCustoEquipe, totalCustoInsumos];
  const labelTotalArray = 'Estrutura, Equipe, Insumos';

  // Usando o método split para criar um array
  const labelTotal = labelTotalArray.split(', ');

  return (
    <Layout>
      <div className="container">
        <Breadcrumb items={breadcrumbItems} />
        <PageHeader
          title={headerTitle}
          subtitle={headerSubtitle}
          icon={headerIcon}
          sideType={sideType}
          onAdd={handleAddProduto}
          hasTotal={hasTotal}
          labelTotal={labelTotal}
          valorTotalOn={valorTotal}
        />
        <h1>
          Estrutura Física/Virtual
        </h1>
        <TableEstimarDespesasEstrutura
          onTotalCustoEstruturaChange={handleTotalCustoEstruturaChange}
          addProduto={handleAddProduto}
          sideType={sideType}
        />
        <h1>
          Equipe de Trabalho
        </h1>
        <TableEstimarDespesasEquipe
          onTotalCustoEquipeChange={handleTotalCustoEquipeChange}
          addProduto={handleAddProduto}
          sideType={sideType}
        />
        <h1>
          Insumos Operacionais
        </h1>
        <TableEstimarDespesasInsumos
          onTotalCustoInsumosChange={handleTotalCustoInsumosChange}
          addProduto={handleAddProduto}
          sideType={sideType}
        />
      </div>
      {saveMessage && 
        <Alertas message={saveMessage} type={alertType} onClose={() => setSaveMessage(null)} />
      }
      {alertMessage && 
        <Alertas message={alertMessage} type={alertType} onClose={() => setAlertMessage(null)} />
      }
      
      {/* SideForm that appears from right to left */}
      <div className={`SideForm ${isSideFormOpen ? 'open' : ''}`}>
        <div className="SideForm-content">
          <SideForm 
            type={sideType} // Alterado para usar sideType
            closeSideForm={closeSideForm}
            actionType={'edit'}
            idForEdit={editId}
            onAdd={handleAddProduto}
          />
        </div>
      </div>
    </Layout>
  );
};

export default EstimarDespesas;
