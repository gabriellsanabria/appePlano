// src/components/Header/Header.js
import React, { useEffect, useState } from 'react';
import Menu from '../components/Menus/MenuEstrutura'; // Importe o componente Banner
import config from '../config';
import './Header.scss';

function Header() {
  const [isHeaderFixed, setHeaderFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 200) {
        setHeaderFixed(true);
      } else {
        setHeaderFixed(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const headerClass = isHeaderFixed ? 'header fixed' : 'header';

  const handleAcessarClick = () => {
    console.log('Config:', config); // Adicione esta linha_
    window.location.href = `https://${config}`; // Adicione o domínio explicitamente se necessário
    // window.location.href = `${config}`;

  };

  return (
    <header className={headerClass}>
      
      <div className="header-logo">
        <a href='/'>
          <img src="https://eplano.s3.sa-east-1.amazonaws.com/logo_eplano.webp" alt="Logo" />
        </a>
      </div>

      <div className="header-menu">
        
        <nav>
          {/* <Menu /> */}
        </nav>    
      </div>
      

      <div className="header-button">
        {/* <button onClick={handleAcessarClick} className="bt azul">
          Acessar
        </button> */}
      </div>
    </header>
  );
}

export default Header;
