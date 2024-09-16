import React, { useState, useEffect, useMemo } from 'react';
import Layout from '../../../components/Layout/layout';
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb';
import PageHeader from '../../../components/PageHeader/PageHeader';
import Alertas from '../../../components/Alertas/Alertas';
import SideForm from '../../../components/SideForm/SideForm';

import TableEstimarCaixaInsumos from '../Tables/TableEstimarCaixa/TableEstimarCaixaInsumos';
import TableEstimarCaixaLiquido from '../Tables/TableEstimarCaixa/TableEstimarCaixaLiquido';
import TableEstimarCaixaRecebiveis from '../Tables/TableEstimarCaixa/TableEstimarCaixaRecebiveis';
import TableEstimarCaixaContasAPagar from '../Tables/TableEstimarCaixa/TableEstimarCaixaContasAPagar';

import { PiPiggyBankBold } from "react-icons/pi";


const EstimarCaixa = () => {
  const headerTitle = 'Estimar o Caixa';
  const headerSubtitle = 'Vamos cadastrar o Caixa Atual do seu Negócio';
  const sideType = 'SideFormEstimarCaixa';
  const headerIcon = PiPiggyBankBold;

  const [totalCaixaLiquido, setTotalCaixaLiquido] = useState(0);
  const handleTotalCaixaLiquidoChange = (newTotalCaixaLiquido) => {
    setTotalCaixaLiquido(newTotalCaixaLiquido);
  };
  const [totalCaixaEstoque, setTotalCaixaEstoque] = useState(0);
  const handleTotalCaixaEstoque = (newTotalCaixaEstoque) => {
    setTotalCaixaEstoque(newTotalCaixaEstoque);
  };
  const [totalCaixaRecebiveis, setTotalCaixaRecebiveis] = useState(0);
  const handleTotalCaixaRecebiveisChange = (newTotalCaixaRecebiveis) => {
    setTotalCaixaRecebiveis(newTotalCaixaRecebiveis);
  };
  const [totalContasPagar, setTotalContasPagar] = useState(0);
  const handleTotalContasPagarChange = (newTotalContasPagar) => {
    setTotalContasPagar(newTotalContasPagar);
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

  const valorTotal = [totalCaixaLiquido, totalCaixaEstoque, totalCaixaRecebiveis, totalContasPagar];
  const labelTotalArray = 'Líquido, Estoque, Recebíveis, Dívidas';

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
          onAdd={handleAddProduto} // Passando a função onAdd para PageHeader

          hasTotal={hasTotal}
          labelTotal={labelTotal}
          valorTotalOn={valorTotal}
        />
        <h1>
          Caixa Líquido
        </h1>
        <TableEstimarCaixaLiquido 
          onTotalCaixaLiquidoChange={handleTotalCaixaLiquidoChange}
          addProduto={handleAddProduto} 
          sideType={sideType}
        />
        <h1>
          Caixa Insumos (Estoque)
        </h1>
        <TableEstimarCaixaInsumos 
          onTotalInvestimentosInsumosChange={handleTotalCaixaEstoque} 
          addProduto={handleAddProduto} 
          sideType={sideType}
        />
        <h1>
          Caixa Recebíveis
        </h1>
        <TableEstimarCaixaRecebiveis 
          onTotalCaixaRecebiveisChange={handleTotalCaixaRecebiveisChange}  
          addProduto={handleAddProduto} 
          sideType={sideType}
        />
        <h1>
          Dívidas
        </h1>
        <TableEstimarCaixaContasAPagar 
          onTotalContasPagarChange={handleTotalContasPagarChange} 
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

export default EstimarCaixa;
