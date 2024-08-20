import React, { useState, useEffect, useMemo } from 'react';
import Layout from '../../../components/Layout/layout';
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb';
import PageHeader from '../../../components/PageHeader/PageHeader';
import Alertas from '../../../components/Alertas/Alertas';

import TableEstimarDespesasEstrutura from '../Tables/TableEstimarDespesas/TableEstimarDespesasEstrutura';
import TableEstimarDespesasEquipe from '../Tables/TableEstimarDespesas/TableEstimarDespesasEquipe';
import TableEstimarDespesasInsumos from '../Tables/TableEstimarDespesasInsumos';

import { PiChartLineDownBold, PiChartLineUpBold } from "react-icons/pi";


const EstimarDespesas = () => {
  const headerTitle = 'Estimar Despesas';
  const headerSubtitle = 'Vamos estimar as Despesas Mensais do seu Negócio';
  const sideType = 'SideFormEstimarDespesas';
  const headerIcon = PiChartLineDownBold;

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
        <TableEstimarDespesasEstrutura/>
        <h1>
          Equipe
        </h1>
        <TableEstimarDespesasEquipe/>
        <h1>
          Insumos
        </h1>
        <TableEstimarDespesasInsumos/>
        
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

export default EstimarDespesas;
