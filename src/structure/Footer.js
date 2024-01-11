import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Menu from '../components/Menus/MenuEstrutura'; // Importe o componente Banner
import ScrollToTop from '../components/ScrollToTop';
import './Footer.scss';

function Footer() {
  const [activeMenuItem, setActiveMenuItem] = useState(null);
  const location = useLocation();

  const handleMenuItemClick = (menuItem) => {
      setActiveMenuItem(menuItem);
      // Adiciona rolagem para o topo
      window.scrollTo(0, 0);
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="column">
          <div className='logoFooter'>
            
            <img src="https://eplano.s3.sa-east-1.amazonaws.com/logo_eplano_footer.webp" alt="Logo da Empresa" />
        
          </div>
        </div>
        
        <div className="column">
          <div className='aws-logo'>
            <img src="https://eplano.s3.sa-east-1.amazonaws.com/aws_stamp.webp" alt="Logo da AWS" />
          </div>
        </div>
      </div>
      <ScrollToTop />
    </footer>
  );
}

export default Footer;
