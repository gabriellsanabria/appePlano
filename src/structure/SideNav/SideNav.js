// SideNav.js
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaChartSimple, FaChartGantt  } from "react-icons/fa6";
import { SiHackthebox } from "react-icons/si";
import { AiOutlineDollarCircle,AiOutlineDollar  } from "react-icons/ai";
import { PiChartLineDownBold, PiChartLineUpBold } from "react-icons/pi";
import { FaPercentage } from "react-icons/fa";
import { TbPercentage } from "react-icons/tb";
import { PiPercentBold } from "react-icons/pi";


import './SideNav.scss';

const SideNav = () => {
  const location = useLocation();

  const pathname = location.pathname;
  const showMenuKey1 = pathname.startsWith('/planejador-financeiro');
  const showMenuKey2 = pathname.startsWith('/simulador-financeiro');

  const [hoveredMenu, setHoveredMenu] = useState(null);
  const handleMouseEnter = (menu) => {
    setHoveredMenu(menu);
  };
  
  // Função para limpar hoveredMenu quando o mouse sai do item do menu
  const handleMouseLeave = () => {
    setHoveredMenu(null);
  };
  const isActive = (pathname) => location.pathname === pathname;

  return (
    <div className='sidenav'>
      <div className='sidenav-header'>
        <img src='https://eplano.s3.sa-east-1.amazonaws.com/logo_E_eplano.webp' alt='Logo' />
      </div>
      <div className='sidenav-body'>
        {showMenuKey1 && (
          <>
          <div className='menu-key'>
            <ul>
              <li onMouseEnter={() => handleMouseEnter("IndicadoresPlan")} onMouseLeave={handleMouseLeave}>
                <Link to="/planejador-financeiro" className={isActive('/planejador-financeiro') ? 'active' : ''}>
                  <FaChartSimple />
                </Link> 
                {hoveredMenu === "IndicadoresPlan" && <div className="menu-tooltip">Indicadores e Viabilidade do seu Negócio</div>}
              </li>
              <li onMouseEnter={() => handleMouseEnter("FluxoCaixaPlan")} onMouseLeave={handleMouseLeave}>
                <Link to="/planejador-financeiro/fluxo-caixa" className={isActive('/planejador-financeiro/fluxo-caixa') ? 'active' : ''}>
                  <FaChartGantt />
                </Link> 
                {hoveredMenu === "FluxoCaixaPlan" && <div className="menu-tooltip">Fluxo de Caixa Planjeado do seu Negócio</div>}
              </li>
            </ul>
          </div>
          <div className='menu-navigation'>
            <ul>
              
              <li onMouseEnter={() => handleMouseEnter("CadastroProdutosServicos")} onMouseLeave={handleMouseLeave}>
                <Link to="/planejador-financeiro/produtos" className={isActive('/planejador-financeiro/produtos') ? 'active' : ''}>
                  <SiHackthebox />
                </Link> 
                {hoveredMenu === "CadastroProdutosServicos" && <div className="menu-tooltip">Cadastre Produtos e/ou Serviços</div>}
              </li>

              <li onMouseEnter={() => handleMouseEnter("EstimarReceitasMensais")} onMouseLeave={handleMouseLeave}>
              <Link to="/planejador-financeiro/estimar-receitas" className={isActive('/planejador-financeiro/estimar-receitas') ? 'active' : ''}>
                  <PiChartLineUpBold  />
                </Link> 
                {hoveredMenu === "EstimarReceitasMensais" && <div className="menu-tooltip">Estimar Receitas Mensais do negócio</div>}
              </li>

              <li onMouseEnter={() => handleMouseEnter("EstimarDespesasMensais")} onMouseLeave={handleMouseLeave}>
              <Link to="/planejador-financeiro/estimar-despesas" className={isActive('/planejador-financeiro/estimar-despesas') ? 'active' : ''}>
                  <PiChartLineDownBold />
                </Link> 
                {hoveredMenu === "EstimarDespesasMensais" && <div className="menu-tooltip">Estimar Despesas Mensais do negócio</div>}
              </li>

              <li onMouseEnter={() => handleMouseEnter("EstimarImposto")} onMouseLeave={handleMouseLeave}>
                <Link to="/FaChartSimple" className={isActive('/dashboard') ? 'active' : ''}>
                  <PiPercentBold />
                </Link> 
                {hoveredMenu === "EstimarImposto" && <div className="menu-tooltip">Estimar Imposto</div>}
              </li>
              
            </ul>
          </div>
          </>
        )}
        {showMenuKey2 && ( // Renderiza menu-key2 se a URL for '/simulador-financeiro'
          <>
          <div className='menu-key'>
            <ul>
              <li>
                <Link to='' className='active'>
                  <FaChartSimple />
                </Link>
              </li>
              <li>
                <Link to=''>
                  <FaChartGantt />
                </Link>
              </li>
            </ul>
          </div>
          <div className='menu-navigation'>
            <ul>
              
              <li onMouseEnter={() => handleMouseEnter("CadastroProdutosServicos")} onMouseLeave={handleMouseLeave}>
                <Link to="/FaChartSimple" className={isActive('/dashboard') ? 'active' : ''}>
                  <SiHackthebox />
                </Link> 
                {hoveredMenu === "CadastroProdutosServicos" && <div className="menu-tooltip">Cadastre Produtos e/ou Serviços</div>}
              </li>

              <li onMouseEnter={() => handleMouseEnter("EstimarReceitasMensais")} onMouseLeave={handleMouseLeave}>
                <Link to="/FaChartSimple" className={isActive('/dashboard') ? 'active' : ''}>
                  <PiChartLineUpBold  />
                </Link> 
                {hoveredMenu === "EstimarReceitasMensais" && <div className="menu-tooltip">Estimar Receitas Mensais do negócio</div>}
              </li>

              <li onMouseEnter={() => handleMouseEnter("EstimarDespesasMensais")} onMouseLeave={handleMouseLeave}>
                <Link to="/FaChartSimple" className={isActive('/dashboard') ? 'active' : ''}>
                  <PiChartLineDownBold />
                </Link> 
                {hoveredMenu === "EstimarDespesasMensais" && <div className="menu-tooltip">Estimar Despesas Mensais do negócio</div>}
              </li>

              <li onMouseEnter={() => handleMouseEnter("EstimarImposto")} onMouseLeave={handleMouseLeave}>
                <Link to="/FaChartSimple" className={isActive('/dashboard') ? 'active' : ''}>
                  <PiPercentBold />
                </Link> 
                {hoveredMenu === "EstimarImposto" && <div className="menu-tooltip">Estimar Imposto</div>}
              </li>
              
            </ul>
          </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SideNav;
