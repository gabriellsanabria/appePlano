import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate, NavLink,useLocation } from 'react-router-dom';
import { getFirestore, collection, getDocs, where, query } from 'firebase/firestore';
import { SiCashapp } from "react-icons/si";
import { PiChartLineDownBold } from "react-icons/pi";
import { MdStorefront } from "react-icons/md";
import { FaChevronCircleRight, FaExclamationCircle, FaTag } from 'react-icons/fa';
import { PiPiggyBankBold } from "react-icons/pi";
import { FaRegChartBar } from "react-icons/fa";

import './ButtonsEplano.scss';

const MeuEplano = () => {
  const navigate = useNavigate();
  const location = useLocation();
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
              <div className='exclamation-icon' title="Preencha os Produtos e Serviços">
                <FaExclamationCircle />
              </div>
            </NavLink>
            <NavLink to='/estimar-receitas' className={`big-button ${location.pathname === '/estimar-receitas' ? 'active' : ''}`}>
              <div className='icons'>
                <SiCashapp />
              </div>
              <div className='title'>
                <h2>Estimar Receitas</h2>
              </div>
              <div className='exclamation-icon' title="Preencha uma estimativa de receitas">
                <FaExclamationCircle />
              </div>
            </NavLink>
            <NavLink to='/estimar-despesas' className={`big-button ${location.pathname === '/estimar-despesas' ? 'active' : ''}`}>
              <div className='icons'>
                <PiChartLineDownBold />
              </div>
              <div className='title'>
                <h2>Estimar Despesas</h2>
              </div>
              <div className='exclamation-icon' title="Tooltip para Estimar Despesas">
                <FaExclamationCircle />
              </div>
            </NavLink>
            <NavLink to='/estimar-investimentos' className={`big-button ${location.pathname === '/estimar-investimentos' ? 'active' : ''}`}>
              <div className='icons'>
                <PiPiggyBankBold />
              </div>
              <div className='title'>
                <h2>Estimar Caixa</h2>
              </div>
              <div className='exclamation-icon' title="Tooltip para Estimar Caixa">
                <FaExclamationCircle />
              </div>
            </NavLink>
            <NavLink to='/fluxo-caixa-projetado' className={`big-button ${location.pathname === '/fluxo-caixa-projetado' ? 'active' : ''}`}>
              <div className='icons'>
                <FaRegChartBar />
              </div>
              <div className='title'>
                <h2>Fluxo de Caixa Projetado</h2>
              </div>
              <div className='exclamation-icon' title="Tooltip para Fluxo de Caixa Projetado">
                <FaExclamationCircle />
              </div>
            </NavLink>
            <NavLink to='/analise-viabilidade' className={`big-button ${location.pathname === '/analise-viabilidade' ? 'active' : ''}`}>
              <div className='icons'>
                <MdStorefront />
              </div>
              <div className='title'>
                <h2>Painel Indicadores ePlano</h2>
              </div>
              <div className='exclamation-icon' title="Tooltip para Estrutura">
                <FaExclamationCircle />
              </div>
            </NavLink>
          </div>
        </div>
      </>
  );
};

export default MeuEplano;
