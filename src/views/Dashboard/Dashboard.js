import React from 'react';
import Layout from '../../components/Layout/layout';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import PageHeader from '../../components/PageHeader/PageHeader';
import { FaChartSimple } from "react-icons/fa6";
import AnaliseViabilidadePayback from '../ePlano/AnaliseViabilidadePayback/AnaliseViabilidadePayback2';

const Dashboard = () => {
  const headerTitle = 'Resumo';
  const headerSubtitle = 'Painel de Controle: ePlano Financeiro do seu Negócio';
  const headerIcon = FaChartSimple ;  // Use o ícone IoClose diretamente
  
  const breadcrumbItems = [
    { label: 'Resumo', path: '/' },
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
          <h2>Resumos, Tutoriais, cursos e etc [em desenvolvimento]</h2>
          </div>
        </div>

      </div>
    </Layout>
  );
};

export default Dashboard;
