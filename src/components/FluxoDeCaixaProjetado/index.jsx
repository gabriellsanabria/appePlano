import React from 'react';
import { FluxoDeCaixaProvider } from './FluxoDeCaixaContext';
import TabelaInvestimento from './components/TabelaInvestimento'; // Correct for default import
import TabelaReceitaBruta from './components/TabelaReceitaBruta';
import TabelaDespesas from './components/TabelaDespesas';
import TabelaCaixaInicial from './components/TabelaCaixaInicial';
import TabelaFluxoDeCaixa from './components/TabelaFluxoDeCaixa';
import TabelaLucroLiquido from './components/TabelaLucroLiquido';
import TabelaCaixa from './components/TabelaCaixa';
import './styles/FluxoDeCaixaProjetado.scss';

const FluxoDeCaixaProjetado = () => {
  return (
    <FluxoDeCaixaProvider>
      <div className='dashboard-page'>
        <div className='dashboard-content'>
          <div className='title'>
            <h1>Fluxo de Caixa Projetado</h1>
            <p>A seguir é apresentado o Fluxo de Caixa Projetado...</p>
          </div>
          <div className='table-container'>
            <TabelaInvestimento />
            <TabelaReceitaBruta />
            <TabelaDespesas />
            <TabelaCaixaInicial />
            <TabelaFluxoDeCaixa />
            <TabelaLucroLiquido />
            <TabelaCaixa />
          </div>
        </div>
      </div>
    </FluxoDeCaixaProvider>
  );
};

export default FluxoDeCaixaProjetado;
