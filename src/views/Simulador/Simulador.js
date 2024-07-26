import React from 'react';
import Layout from '../../components/Layout/layout';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import PageHeader from '../../components/PageHeader/PageHeader';
import { FaChartSimple } from "react-icons/fa6";
import AnaliseViabilidadePayback from '../ePlano/AnaliseViabilidadePayback/AnaliseViabilidadePayback3';

const Simulador = () => {
  const headerTitle = 'Simulador Financeiro';
  const headerSubtitle = 'Painel de Indicadores do seu Simulador ePlano Financeiro';
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
            <h2>Indicadores - Simulador</h2>
          </div>
          <div className='dashStage-body'>
            <AnaliseViabilidadePayback />
          </div>
        </div>

      </div>
    </Layout>
  );
};

export default Simulador;
