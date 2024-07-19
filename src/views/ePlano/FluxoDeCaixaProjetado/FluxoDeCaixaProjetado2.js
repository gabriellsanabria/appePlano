import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import HeaderTable from './Components/HeaderTable';
import InvestimentosEstimados from './Components/InvestimentosEstimados';
import ReceitaBrutaEstimada from './Components/ReceitaBrutaEstimada';
import DespesasEstimadas from './Components/DespesasEstimadas';
import CaixaInicial from './Components/CaixaInicial';
import FluxoCaixa from './Components/FluxoCaixa';
import LucroLiquidoMensal from './Components/LucroLiquidoMensal';
import LucroLiquidoAcumulado from './Components/LucroLiquidoAcumulado';
import Impostos from './Components/Impostos';
import Caixa from './Components/Caixa';
import './FluxoDeCaixaProjetado.scss';

const FluxoDeCaixaProjetado = () => {
  const tableRef = useRef(null);

  // Função para gerar a lista de meses
  const generateMonths = (numMonths) => Array.from({ length: numMonths }, (_, i) => `Mês ${i + 0}`);
  const meses = generateMonths(25);  // Lista de meses ajustada para 24 meses

  return (
      <div className='dashboard-page'>
        <div className='dashboard-content'>
          <div className='table-container'>
            <HeaderTable meses={meses} />
            <InvestimentosEstimados meses={meses} />
            <ReceitaBrutaEstimada meses={meses} />
            <DespesasEstimadas meses={meses} />
            <CaixaInicial meses={meses}/>
            <FluxoCaixa meses={meses} />
            <Impostos meses={meses} />
            <LucroLiquidoMensal meses={meses} />
            <LucroLiquidoAcumulado meses={meses} />
            <Caixa meses={meses} />
          </div>
        </div>
      </div>
  );
};

export default FluxoDeCaixaProjetado;
