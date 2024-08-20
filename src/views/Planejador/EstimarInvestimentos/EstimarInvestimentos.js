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
  const headerTitle = 'Estimar o Caixa';
  const headerSubtitle = 'Vamos cadastrar o Caixa Atual do seu Negócio';
  const sideType = 'SideFormEstimarInvestimentos';
  const headerIcon = FaDollarSign;

  const [totalInvestimentosEstrutura, setTotalInvestimentosEstrutura] = useState(0);
  const handleTotalInvestimentosEstruturaChange = (newTotalInvestimentosEstrutura) => {
    setTotalInvestimentosEstrutura(newTotalInvestimentosEstrutura);
  };
  const [totalInvestimentosInsumos, setTotalInvestimentosInsumos] = useState(0);
  const handleTotalInvestimentosInsumosChange = (newTotalInvestimentosInsumos) => {
    setTotalInvestimentosInsumos(newTotalInvestimentosInsumos);
  };
  const [totalInvestimentosCapital, setTotalInvestimentosCapital] = useState(0);
  const handleTotalInvestimentosCapitalChange = (newTotalInvestimentosCapital) => {
    setTotalInvestimentosCapital(newTotalInvestimentosCapital);
  };

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


  // Função onAdd para ser passada para SideFormProdutos
  const handleAddProduto = (newItem) => {
    setApiData([...apiData, newItem]); // Adiciona o novo item ao estado apiData
    // alert('Produto adicionado com sucesso!');
    // Lógica adicional se necessário
  };

  const hasTotal = true;
  // const valorTotal = totalCusto;

  const valorTotal = [totalInvestimentosEstrutura, totalInvestimentosInsumos, totalInvestimentosCapital];
  const labelTotalArray = 'Estrutura, Insumos, Capital de Giro';

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
          Estrutura Física/Virtual
        </h1>
        <TableEstimarInvestimentosEstrutura onTotalInvestimentosEstruturaChange={handleTotalInvestimentosEstruturaChange} />
        <h1>
          Insumos
        </h1>
        <TableEstimarInvestimentosInsumos onTotalInvestimentosInsumosChange={handleTotalInvestimentosInsumosChange} />
        <h1>
          Capital de Giro
        </h1>
        <TableEstimarCapitalGiro onTotalInvestimentosCapitalChange={handleTotalInvestimentosCapitalChange} />
        
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
