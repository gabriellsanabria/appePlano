import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import axios from 'axios';
import { RiGovernmentFill } from "react-icons/ri";
import { SiCashapp } from "react-icons/si";
import { PiChartLineDownBold } from "react-icons/pi";
import { MdStorefront } from "react-icons/md";
import { FaChevronCircleRight, FaExclamationCircle, FaCheckCircle, FaTag } from 'react-icons/fa';
import { PiPiggyBankBold } from "react-icons/pi";
import { FaRegChartBar } from "react-icons/fa";
import { FiLoader } from 'react-icons/fi'; // Importe o ícone de spinner

import './ButtonsEplano.scss';
import { API_BASE_URL, API_BASE_URL_AMPLIFY } from '../../apiConfig';

const MeuEplano = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true); // Estado para controlar o spinner
  const [produtosServicosData, setProdutosServicosData] = useState(null);
  const [impostosMensaisData, setImpostosMensaisData] = useState(null);
  const [estruturaData, setEstruturaData] = useState(null);
  const [equipeData, setEquipeData] = useState(null);
  const [insumosData, setInsumosData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await axios.get(`${API_BASE_URL}/produtos_servicos`);
        console.log('Resposta de produtos_servicos:', response1.data);
        setProdutosServicosData(response1.data);
        setLoading(false); // Quando a consulta estiver completa, define loading como false
        // Verificar se os dados de produtos/serviços estão preenchidos
        console.log('Produtos/Serviços:', isDataFilled(response1.data));
  
        const response2 = await axios.get(`${API_BASE_URL}/listar_impostos_mensais`);
        console.log('Resposta de listar_impostos_mensais:', response2.data);
        setImpostosMensaisData(response2.data);
        setLoading(false); // Quando a consulta estiver completa, define loading como false
        // Verificar se os dados de impostos mensais estão preenchidos
        console.log('Impostos Mensais:', isDataFilled(response2.data));
  
        const response3 = await axios.get(`${API_BASE_URL}/api/despesas/estrutura`);
        console.log('Resposta de estrutura:', response3.data);
        setEstruturaData(response3.data);
        setLoading(false); // Quando a consulta estiver completa, define loading como false
        // Verificar se os dados de estrutura estão preenchidos
        console.log('Estrutura:', isDataFilled(response3.data));
  
        const response4 = await axios.get(`${API_BASE_URL}/api/despesas/equipe`);
        console.log('Resposta de equipe:', response4.data);
        setEquipeData(response4.data);
        setLoading(false); // Quando a consulta estiver completa, define loading como false
        // Verificar se os dados de equipe estão preenchidos
        console.log('Equipe:', isDataFilled(response4.data));
  
        const response5 = await axios.get(`${API_BASE_URL}/api/despesas/insumos`);
        console.log('Resposta de insumos:', response5.data);
        setInsumosData(response5.data);
        setLoading(false); // Quando a consulta estiver completa, define loading como false
        // Verificar se os dados de insumos estão preenchidos
        console.log('Insumos:', isDataFilled(response5.data));
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
      }
    };
  
    fetchData();
  }, []);
  
  // Função para verificar se os dados estão preenchidos
  const isDataFilled = (data) => {
    return data && Object.keys(data).length !== 0;
  };
  

  

  return (
    <>        
      <div className="button-row">
        <div className="button-section">
            <NavLink to='/produtos-servicos' className={`big-button ${location.pathname === '/produtos-servicos' ? 'active' : ''}`}>
              <div className='icons'>
                <FaTag />
              </div>
              <div className='title'>
                <h2>Produtos/Serviços</h2>
              </div>      
              <div className='exclamation-icon'>
                {loading ? (
                  <div>
                    <FiLoader className="spinner-icon" />
                  </div>
                  ) : (
                    isDataFilled(produtosServicosData) ? (
                      <FaCheckCircle className="green" />
                    ) : (
                      <div title="Preencha os Produtos e Serviços">
                        <FaExclamationCircle className="orange" />
                      </div>
                    )
                  )}
                </div>        
            </NavLink>
            <NavLink to='/estimar-receitas' className={`big-button ${location.pathname === '/estimar-receitas' ? 'active' : ''}`}>
              <div className='icons'>
                
              {loading ? <FiLoader className="spinner-icon" /> : (isDataFilled(produtosServicosData) ? <FaCheckCircle className="check-ok-icon" /> : <FaExclamationCircle className="exclamation-icon" />)}
                <SiCashapp />
              </div>
              <div className='title'>
                <h2>Estimar Receitas</h2>
              </div>
            </NavLink>
            <NavLink to='/estimar-despesas' className={`big-button ${location.pathname === '/estimar-despesas' ? 'active' : ''}`}>
              <div className='icons'>
                {loading ? <FiLoader className="spinner-icon" /> : (isDataFilled(produtosServicosData) ? <FaCheckCircle className="check-ok-icon" /> : <FaExclamationCircle className="exclamation-icon" />)}
                
                <PiChartLineDownBold />
              </div>
              <div className='title'>
                <h2>Estimar Despesas</h2>
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
            <NavLink to='/caixa-real' className={`big-button ${location.pathname === '/caixa-real' ? 'active' : ''}`}>
              <div className='icons'>
                {loading ? <FiLoader className="spinner-icon" /> : (isDataFilled(produtosServicosData) ? <FaCheckCircle className="check-ok-icon" /> : <FaExclamationCircle className="exclamation-icon" />)}
                <PiPiggyBankBold />
              </div>
              <div className='title'>
                <h2>Estimar Caixa</h2>
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
        </div>
      </>
  );
};

export default MeuEplano;
