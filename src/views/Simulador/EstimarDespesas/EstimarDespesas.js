import React, { useState, useEffect, useMemo } from 'react';
import Layout from '../../../components/Layout/layout';
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb';
import PageHeader from '../../../components/PageHeader/PageHeader';
import Alertas from '../../../components/Alertas/Alertas';

import TableEstimarDespesasEstrutura from '../Tables/TableEstimarDespesas/TableEstimarDespesasEstrutura';
import TableEstimarDespesasEquipe from '../Tables/TableEstimarDespesas/TableEstimarDespesasEquipe';
import TableEstimarDespesasInsumos from '../Tables/TableEstimarDespesas/TableEstimarDespesasInsumos';

import { PiChartLineDownBold, PiChartLineUpBold } from "react-icons/pi";


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

  // Estado para os dados da API
  const [apiData, setApiData] = useState([]);
  const [saveMessage, setSaveMessage] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null); // Estado para mensagem de alerta
  const [alertType, setAlertType] = useState(null); // Estado para o tipo de alerta


  // Função onAdd para ser passada para SideFormProdutos
  const handleAddProduto = (newItem) => {
    setApiData([...apiData, newItem]); // Adiciona o novo item ao estado apiData
    setAlertMessage('Adicionado com sucesso!');
    setAlertType('success');
    // alert('Produto adicionado com sucesso!');
    // Lógica adicional se necessário
  };

  const hasTotal = true;
  // const valorTotal = totalCusto;

  const valorTotal = [totalCustoEstrutura,totalCustoEquipe, totalCustoInsumos];
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
        <TableEstimarDespesasEstrutura onTotalCustoEstruturaChange={handleTotalCustoEstruturaChange} />
        <h1>
          Equipe de Trabalho
        </h1>
        <TableEstimarDespesasEquipe onTotalCustoEquipeChange={handleTotalCustoEquipeChange}/>
        <h1>
          Insumos Operacionais
        </h1>
        <TableEstimarDespesasInsumos onTotalCustoInsumosChange={handleTotalCustoInsumosChange}/>
        
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
