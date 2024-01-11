import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Menu.scss';

function MenuEstrutura() {
    const [activeMenuItem, setActiveMenuItem] = useState(null);
    const location = useLocation();

    const handleMenuItemClick = (menuItem) => {
        setActiveMenuItem(menuItem);
        // Adiciona rolagem para o topo
        window.scrollTo(0, 0);
    };

    const scrollToAbout = () => {
        const aboutElement = document.getElementById('sobreComp');
    
        if (aboutElement) {
          const distanceToTop = aboutElement.getBoundingClientRect().top;
          const offset = 100; // Ajuste esta distância conforme necessário
          const scrollTo = distanceToTop - offset;
    
          window.scrollTo({
            top: scrollTo,
            behavior: 'smooth',
          });
        }
      };

    return (
        <ul>
            {/* <li>
                <Link to="/" className={location.pathname === '/' ? 'active' : ''} onClick={() => handleMenuItemClick('/')}>
                    Home
                </Link>
            </li> */}
            <li>
                <a href='#' onClick={scrollToAbout} className={location.pathname === '/sobre' ? 'active' : ''}>
                    Sobre nós
                </a>
            </li>
            <li>
                <Link to="/solucao" className={location.pathname === '/solucao' ? 'active' : ''} onClick={() => handleMenuItemClick('/solucao')}>
                    Solução
                </Link>
            </li>
            {/* <li>
                <Link to="/eplano-academy" className={location.pathname === '/eplano-academy' ? 'active' : ''} onClick={() => handleMenuItemClick('/eplano-academy')}>
                    Preços e Planos
                </Link>
            </li> */}
            <li>
                <Link to="/eplano-academy" className={location.pathname === '/eplano-academy' ? 'active' : ''} onClick={() => handleMenuItemClick('/eplano-academy')}>
                    ePLANO Academy
                </Link>
            </li>
            <li>
                <Link to="/contato" className={location.pathname === '/contato' ? 'active' : ''} onClick={() => handleMenuItemClick('/contato')}>
                    Contato
                </Link>
            </li>
        </ul>
    );
}

export default MenuEstrutura;
