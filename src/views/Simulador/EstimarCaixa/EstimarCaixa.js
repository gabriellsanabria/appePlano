import React, { useState, useEffect, useMemo } from 'react';
import Layout from '../../../components/Layout/layout';
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb';
import PageHeader from '../../../components/PageHeader/PageHeader';
import Alertas from '../../../components/Alertas/Alertas';

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
        <TableEstimarCaixaLiquido onTotalCaixaLiquidoChange={handleTotalCaixaLiquidoChange} />
        <h1>
          Caixa Insumos (Estoque)
        </h1>
        <TableEstimarCaixaInsumos onTotalInvestimentosInsumosChange={handleTotalCaixaEstoque} />
        <h1>
          Caixa Recebíveis
        </h1>
        <TableEstimarCaixaRecebiveis onTotalCaixaRecebiveisChange={handleTotalCaixaRecebiveisChange} />
        <h1>
          Dívidas
        </h1>
        <TableEstimarCaixaContasAPagar onTotalContasPagarChange={handleTotalContasPagarChange} />
        
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

export default EstimarCaixa;
