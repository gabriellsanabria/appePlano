import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getFirestore, collection, getDocs, where, query } from 'firebase/firestore';
import Layout from '../../components/Layout/layout';
import GuiaEplano from '../../components/GuiaEplano/GuiaEplano';

import BoxKpi from '../../components/Kpis/BoxKpi';
import ResultadosDRE from '../../components/Kpis/ResultadosDRE';
import LineChart from '../../components/Charts/LineChart';

import './MeuEplano.scss';
const currentYear = new Date().getFullYear();
const previousYear = currentYear - 1;

const lineChartData = {
  labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
  datasets: [
    {
      label: `Ano -1 (${previousYear})`,
      borderColor: '#e6e6e6',
      data: [22000, 20000, 32000, 47000, 30800, 20500, 30250, 49000, 38900, 49200, 22000, 60000],
    },
    {
      label: `Ano Atual (${currentYear})`,
      borderColor: '#0F2736',
      data: [53600, 42900, 49200, 68000, 54000, 25000, 30290, 40900, 80000, 73000, 88200, 120000],
    },
  ],
};
const MeuEplano = () => {
  const navigate = useNavigate();
  const { ePlanoId: paramEPlanoId } = useParams();
  const [organizationId, setOrganizationId] = useState(null); // Adicionando o estado para armazenar o organizationId
  const [ePlanoId, setEPlanoId] = useState(null);


  useEffect(() => {
    setEPlanoId(paramEPlanoId);

    const checkEPlano = async () => {
      try {
        const db = getFirestore();
        const ePlanosControleCollection = collection(db, 'ePlanosControle');
        const q = query(ePlanosControleCollection, where('ePlanoId', '==', paramEPlanoId));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.size > 0) {
          const ePlanoData = querySnapshot.docs[0].data();

          if (ePlanoData.firstAccessEplano === 1) {
            // Armazene o organizationId na variável de estado
            const organizationIdFromData = ePlanoData.organizationId;
            setOrganizationId(organizationIdFromData);

            // Redirecione para /empresa/cadastro/nova com o ePlanoId como parâmetro na URL
            navigate(`/empresa/cadastro/nova/${paramEPlanoId}/${organizationIdFromData}`);
          }
        }
      } catch (error) {
        console.error('Erro ao verificar ePlano:', error);
      }
    };

    checkEPlano();
  }, [paramEPlanoId, navigate]);

  return (
    <Layout>
      <div className='dashboard-page'>
        <div className='dashboard-content'>
        <GuiaEplano />
        
        <div className='boxkpis'>
                    <BoxKpi title="Receita Total" value="R$10.000" />
                    <BoxKpi title="Lucratividade" value="16%" />
                    <BoxKpi title="CMV" value="35%" />
                    <BoxKpi title="Prazo ROI (meses)" value="24" />
                  </div>
                  <div className='dashboard-graficos'>
                    <div className='grafico'>
                      <h3>Faturamento</h3>
                      <LineChart data={lineChartData} />
                    </div>
                    <div className='resultados'>
                      <ResultadosDRE title="Receitas" value="R$ 9999,99" />
                      <ResultadosDRE title="Despesas" value="R$ 9999,99" />
                      <ResultadosDRE title="Despesas Fixas" value="R$ 9999,99" />
                      <ResultadosDRE title="Despesas Variáveis" value="R$ 9999,99" />
                      <ResultadosDRE title="Lucratividade" value="35%" />
                    </div>
                  </div>

                  <div className='boxkpis'>
                    <BoxKpi title="Receita Total" value="R$10.000" />
                    <BoxKpi title="Lucratividade" value="16%" />
                    <BoxKpi title="CMV" value="35%" />
                    <BoxKpi title="Prazo ROI (meses)" value="24" />
                  </div>
                  <div className='dashboard-graficos'>
                    <div className='grafico'>
                      <h3>Faturamento</h3>
                      <LineChart data={lineChartData} />
                    </div>
                    <div className='resultados'>
                      <ResultadosDRE title="Receitas" value="R$ 9999,99" />
                      <ResultadosDRE title="Despesas" value="R$ 9999,99" />
                      <ResultadosDRE title="Despesas Fixas" value="R$ 9999,99" />
                      <ResultadosDRE title="Despesas Variáveis" value="R$ 9999,99" />
                      <ResultadosDRE title="Lucratividade" value="35%" />
                    </div>
                  </div>
        </div>
      </div>
    </Layout>
  );
};

export default MeuEplano;