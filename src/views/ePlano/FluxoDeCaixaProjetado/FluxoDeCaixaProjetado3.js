import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import HeaderTable from './Components/HeaderTable';
import InvestimentosEstimados from './Components/InvestimentosEstimados';
import ReceitaBrutaEstimada2 from './Components/ReceitaBrutaEstimada2';
import DespesasEstimadas2 from './Components/DespesasEstimadas2';
import CaixaInicial from './Components/CaixaInicial';
import CaixaReal from './Components/CaixaReal';
import FluxoCaixa from './Components/FluxoCaixa';
import ReceitaOperacional from './Components/ReceitaOperacional';
import LucroLiquidoMensal from './Components/LucroLiquidoMensal2';
import LucroLiquidoAcumulado from './Components/LucroLiquidoAcumulado2';
import Impostos from './Components/Impostos';
import Caixa from './Components/Caixa2';
import './FluxoDeCaixaProjetado.scss';

const FluxoDeCaixaProjetado3 = () => {
  const tableRef = useRef(null);

  // Função para gerar a lista de meses
  const generateMonths = (numMonths) => Array.from({ length: numMonths }, (_, i) => `Mês ${i + 0}`);
  const meses = generateMonths(25);  // Lista de meses ajustada para 24 meses

  return (
      <div className='dashboard-page'>
        <div className='dashboard-content'>
          <div className='table-container'>
            <HeaderTable meses={meses} />
            {/* <InvestimentosEstimados meses={meses} /> */}
            <ReceitaBrutaEstimada2 meses={meses} />
            <DespesasEstimadas2 meses={meses} />
            {/* <CaixaInicial meses={meses}/> */}
            <CaixaReal meses={meses}/>
            <ReceitaOperacional meses={meses} />
            <Impostos meses={meses} />
            <LucroLiquidoMensal meses={meses} />
            <LucroLiquidoAcumulado meses={meses} />
            {/* <Caixa meses={meses} /> */}
          </div>
        </div>
      </div>
  );
};

export default FluxoDeCaixaProjetado3;