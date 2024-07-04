import React from 'react';
import Layout from '../../components/Layout/layout';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import PageHeader from '../../components/PageHeader/PageHeader';
import { AiOutlineDashboard  } from "react-icons/ai";

const Simulador = () => {
  const headerTitle = 'Dashboard';
  const headerSubtitle = 'Painel de Resumo de Indicadores do seu ePlano Financeiro';
  const headerIcon = AiOutlineDashboard ;  // Use o ícone IoClose diretamente

  const breadcrumbItems = [
    { label: headerTitle, path: '/dashboard' },
  ];

  return (
    <Layout>
      <div className="container">
        {/* Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} />

        {/* Renderiza o componente PageHeader com o título e subtítulo dinâmicos */}
        <PageHeader title={headerTitle} subtitle={headerSubtitle} icon={headerIcon} />

      </div>
    </Layout>
  );
};

export default Simulador;
