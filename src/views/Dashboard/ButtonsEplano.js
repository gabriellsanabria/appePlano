import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FaExclamationCircle, FaCheckCircle, FaTag } from 'react-icons/fa';
import { SiCashapp } from "react-icons/si";
import { PiChartLineDownBold } from "react-icons/pi";
import { PiPiggyBankBold } from "react-icons/pi";
import { RiGovernmentFill } from "react-icons/ri";
import { FaRegChartBar, FaChevronCircleRight } from "react-icons/fa";
import { MdStorefront } from "react-icons/md";
import { FiLoader } from 'react-icons/fi'; // Importe o ícone de spinner

import './ButtonsEplano.scss';
import { API_BASE_URL } from '../../apiConfig';
import DataFetcher from './DataFetcher'; // Importe o componente DataFetcher

const MeuEplano = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [produtosServicosData, setProdutosServicosData] = useState(null);
  const [receitasMensaisData, setReceitasMensaisData] = useState(null);  
  const [impostosMensaisData, setImpostosMensaisData] = useState(null);
  const [estruturaData, setEstruturaData] = useState(null);
  const [equipeData, setEquipeData] = useState(null);
  const [insumosData, setInsumosData] = useState(null);

  const [caixaLiquidoData, setCaixaLiquidoData] = useState(null);
  const [caixaEstoqueData, setCaixaEstoqueData] = useState(null);
  const [caixaRecebiveisData, setCaixaRecebiveisData] = useState(null);
  const [caixaContasPagarData, setCaixaContasPagarData] = useState(null);


  // Função para ser chamada quando os dados forem buscados
  const onDataFetched = ({
    produtosServicosData,
    receitasMensaisData,
    impostosMensaisData,
    estruturaData,
    equipeData,
    insumosData,
          
    caixaLiquidoData,
    caixaEstoqueData,
    caixaRecebiveisData,
    caixaContasPagarData
  }) => {
    setProdutosServicosData(produtosServicosData);
    setReceitasMensaisData(receitasMensaisData);
    setImpostosMensaisData(impostosMensaisData);
    setEstruturaData(estruturaData);
    setEquipeData(equipeData);
    setInsumosData(insumosData);
    
    setCaixaLiquidoData(caixaLiquidoData);
    setCaixaEstoqueData(caixaEstoqueData);
    setCaixaRecebiveisData(caixaRecebiveisData);
    setCaixaContasPagarData(caixaContasPagarData);

    setLoading(false);
  };
  
  // Função para verificar se os dados estão preenchidos
  const isDataFilled = (data) => {
    return data && Object.keys(data).length !== 0;
  };
  return (
    <>        
      <DataFetcher onDataFetched={onDataFetched} />
        <div className="button-section">
        <NavLink to='/produtos-servicos' className={`big-button ${location.pathname === '/produtos-servicos' ? 'active' : ''}`}>
              <div className='icons'>
                <FaTag />
              </div>
              <div className='title'>
                <h2>Produtos/Serviços</h2>
              </div>      
              <div className='loicon'>
                {loading ? (
                  <div>
                    <FiLoader className="spinner-icon" />
                  </div>
                  ) : (
                    isDataFilled(produtosServicosData) ? (
                      <FaCheckCircle className="check-green" />
                    ) : (
                      <div className='exclamation-icon' title="Preencha os Produtos e Serviços">
                        <FaExclamationCircle className="orange" />
                      </div>
                    )
                  )}
                </div>        
            </NavLink>
            <NavLink to='/estimar-receitas' className={`big-button ${location.pathname === '/estimar-receitas' ? 'active' : ''}`}>
              <div className='icons'>
                <SiCashapp />
              </div>
              <div className='title'>
                <h2>Estimar Receitas</h2>
              </div>
              <div className='loicon'>
                {loading ? (
                  <div>
                    <FiLoader className="spinner-icon" />
                  </div>
                  ) : (
                    isDataFilled(receitasMensaisData) ? (
                      <FaCheckCircle className="check-green" />
                    ) : (
                      <div className='exclamation-icon' title="Preencha os Produtos e Serviços">
                        <FaExclamationCircle className="orange" />
                      </div>
                    )
                  )}
                </div>   
            </NavLink>
            <NavLink to='/estimar-despesas' className={`big-button ${location.pathname === '/estimar-despesas' ? 'active' : ''}`}>
              <div className='icons'>
                <PiChartLineDownBold />
              </div>
              <div className='title'>
                <h2>Estimar Despesas</h2>
              </div>
              <div className='loicon'>
                {loading ? (
                  <div>
                    <FiLoader className="spinner-icon" />
                  </div>
                  ) : (
                    (isDataFilled(estruturaData) && isDataFilled(equipeData) && isDataFilled(insumosData)) ? (
                      <FaCheckCircle className="check-green" />
                    ) : (
                      <div className='exclamation-icon' title="Preencha os dados de Estrutura, Equipe e Insumos">
                        <FaExclamationCircle className="orange" />
                      </div>
                    )
                  )}
                </div>   
            </NavLink>
            <NavLink to='/caixa-real' className={`big-button ${location.pathname === '/caixa-real' ? 'active' : ''}`}>
              <div className='icons'>
                <PiPiggyBankBold />
              </div>
              <div className='title'>
                <h2>Estimar Caixa</h2>
              </div>
              <div className='loicon'>
                {loading ? (
                  <div>
                    <FiLoader className="spinner-icon" />
                  </div>
                  ) : (
                    (isDataFilled(caixaLiquidoData) && isDataFilled(caixaEstoqueData) && isDataFilled(caixaRecebiveisData) && isDataFilled(caixaContasPagarData)) ? (
                      <FaCheckCircle className="check-green" />
                    ) : (
                      <div className='exclamation-icon' title="Preencha os dados de Estrutura, Equipe e Insumos">
                        <FaExclamationCircle className="orange" />
                      </div>
                    )
                  )}
                </div>   
            </NavLink>
            <NavLink to='/estimar-impostos' className={`big-button ${location.pathname === '/estimar-impostos' ? 'active' : ''}`}>
              <div className='icons'>
                <RiGovernmentFill />
              </div>
              <div className='title'>
                <h2>Estimar Impostos</h2>
              </div>  
            </NavLink>
            <NavLink to='/fluxo-caixa-projetado' className={`big-button ${location.pathname === '/fluxo-caixa-projetado' ? 'active' : ''}`}>
              <div className='icons'>
                <FaRegChartBar />
              </div>
              <div className='title'>
                <h2>Fluxo de Caixa Projetado</h2>
              </div>
            </NavLink>
            <NavLink to='/analise-viabilidade' className={`big-button ${location.pathname === '/analise-viabilidade' ? 'active' : ''}`}>
              <div className='icons'>
                <MdStorefront />
              </div>
              <div className='title'>
                <h2>Painel Indicadores ePlano</h2>
              </div>
            </NavLink>
          </div>
      </>
  );
};

export default MeuEplano;
