import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../../components/Layout/layout';
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
    <Layout>
      <div className='dashboard-page'>
        <div className='dashboard-content'>
          <div className='title'>
            <h1>Fluxo de Caixa Projetado</h1>            
          </div>
          <div className='texts'>
            <p>
                Este é o Fluxo de Caixa Projetado; a partir das informações que foram salvas nas 4 Telas anteriores
              </p>    
              <p>O Fluxo de Caixa está dividido em:</p>
              <ul>
                <li>Investimentos.</li>
                <li>Receitas Mensais,</li>
                <li>Despesas Mensais.</li>
                <li>Caixa Inicial.</li>
              </ul>
              <p>
                Estas Informações permitem visualizar uma Projeção de 24 meses do seu Negócio.
              </p>
              <p>
                A partir deste Fluxo de Caixa, vamos te apresentar Indicadores de Desempenho que te ajudarão a Analisar a Viabilidade da sua Ideia de Negócio.
              </p>
              <p>
                - Avance para a Tela: <Link to='/analise-viabilidade'>Painel de Indicadores</Link>
              </p>
          </div>
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
    </Layout>
  );
};

export default FluxoDeCaixaProjetado;
