import React from 'react';
import Layout from '../../../components/Layout/layout';
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb';
import PageHeader from '../../../components/PageHeader/PageHeader';
import { FaChartSimple, FaChartGantt  } from "react-icons/fa6";
import AnaliseViabilidadePayback from '../../ePlano/FluxoDeCaixaProjetado/FluxoDeCaixaProjetado3';

const SimuladorFluxoCaixa = () => {
  const headerTitle = 'Fluxo de Caixa Projetado';
  const headerSubtitle = 'Fluxo de Caixa Estimado do seu Negócio';
  const headerIcon = FaChartGantt ;  // Use o ícone IoClose diretamente
  
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

        <AnaliseViabilidadePayback />

      </div>
    </Layout>
  );
};

export default SimuladorFluxoCaixa;
