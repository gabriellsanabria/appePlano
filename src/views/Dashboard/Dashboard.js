import React from 'react';
import Layout from '../../components/Layout/layout';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import PageHeader from '../../components/PageHeader/PageHeader';
import { FaChartSimple } from "react-icons/fa6";
import AnaliseViabilidadePayback from '../ePlano/AnaliseViabilidadePayback/AnaliseViabilidadePayback2';

const Dashboard = () => {
  const headerTitle = 'Dashboard';
  const headerSubtitle = 'Painel de Resumo de Indicadores do seu ePlano Financeiro';
  const headerIcon = FaChartSimple ;  // Use o ícone IoClose diretamente
  
  const breadcrumbItems = [
    { label: 'Dashboard', path: '/' },
    { label: headerTitle, path: '/dashboard' },
  ];

  return (
    <Layout>
      <div className="container">
        {/* Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} />
        {/* Renderiza o componente PageHeader com o título e subtítulo dinâmicos */}
        <PageHeader title={headerTitle} subtitle={headerSubtitle} icon={headerIcon} />

        <div className='dashStage'>
          <div class='dashStage-header'>
          <h2>Resumo do negócio - Planejado</h2>
          </div>
          <div className='dashStage-body'>
            <AnaliseViabilidadePayback />
          </div>
        </div>

        <div className='dashStage'>
          <div class='dashStage-header'>
            <h2>Resumo do negócio - Em operação</h2>
          </div>
          <div className='dashStage-body'>
            <AnaliseViabilidadePayback />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
