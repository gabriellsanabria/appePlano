import React, { useRef } from 'react';
import Layout from '../../../components/Layout/layout';
import HeaderTable from './Components/HeaderTable';
import InvestimentosEstimados from './Components/InvestimentosEstimados';
import ReceitaBrutaEstimada from './Components/ReceitaBrutaEstimada';
import DespesasEstimadas from './Components/DespesasEstimadas';
import CaixaInicial from './Components/CaixaInicial';
import FluxoCaixa from './Components/FluxoCaixa';
import LucroLiquidoMensal from './Components/LucroLiquidoMensal';
import LucroLiquidoAcumulado from './Components/LucroLiquidoAcumulado';
import Caixa from './Components/Caixa';
import './FluxoDeCaixaProjetado.scss';

const FluxoDeCaixaProjetado = () => {
  const tableRef = useRef(null);

  // Função para gerar a lista de meses
  const generateMonths = (numMonths) => Array.from({ length: numMonths }, (_, i) => `Mês ${i + 0}`);
  const meses = generateMonths(25);  // Lista de meses ajustada para 24 meses

  return (
    <Layout>
      <div className='dashboard-page'>
        <div className='dashboard-content'>
          <div className='title'>
            <h1>Fluxo de Caixa Projetado</h1>
            <p>A seguir é apresentado o Fluxo de Caixa Projetado, conforme as informações inseridas sobre o seu Negócio</p>
          </div>
          <div className='table-container'>
            <HeaderTable meses={meses} />
            <InvestimentosEstimados meses={meses} />
            <ReceitaBrutaEstimada meses={meses} />
            <DespesasEstimadas meses={meses} />
            <CaixaInicial meses={meses}/>
            <FluxoCaixa meses={meses} />
            <LucroLiquidoMensal meses={meses} />
            <LucroLiquidoAcumulado meses={meses} />
            <Caixa meses={meses} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FluxoDeCaixaProjetado;
