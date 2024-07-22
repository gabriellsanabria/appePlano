import React, { useState, useEffect, useMemo } from 'react';
import Layout from '../../../components/Layout/layout';
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb';
import PageHeader from '../../../components/PageHeader/PageHeader';
import Alertas from '../../../components/Alertas/Alertas';

import TableEstimarInvestimentosEstrutura from '../Tables/TableEstimarInvestimentos/TableEstimarInvestimentosEstrutura';
import TableEstimarCapitalGiro from '../Tables/TableEstimarInvestimentos/TableEstimarCapitalGiro';
import TableEstimarInvestimentosInsumos from '../Tables/TableEstimarInvestimentos/TableEstimarInvestimentosInsumos';

import { FaDollarSign } from "react-icons/fa";



const EstimarInvestimentos = () => {
  const headerTitle = 'Estimar Investimentos';
  const headerSubtitle = 'Vamos estimar os Investimentos do seu Negócio';
  const sideType = 'SideFormEstimarInvestimentos';
  const headerIcon = FaDollarSign;

  const breadcrumbItems = [
    { label: 'Dashboard', path: '/' },
    { label: 'Planejamento Financeiro', path: '/planejador-financeiro' },
    { label: headerTitle, path: '/dashboard' },
  ];

  // Estado para os dados da API
  const [apiData, setApiData] = useState([]);
  const [saveMessage, setSaveMessage] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null); // Estado para mensagem de alerta
  const [alertType, setAlertType] = useState(null); // Estado para o tipo de alerta


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
        <h1>
          Estrutura Física/Virtual
        </h1>
        <TableEstimarInvestimentosEstrutura/>
        <h1>
          Insumos
        </h1>
        <TableEstimarInvestimentosInsumos/>
        <h1>
          Capital de Giro
        </h1>
        <TableEstimarCapitalGiro/>
        
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

export default EstimarInvestimentos;
