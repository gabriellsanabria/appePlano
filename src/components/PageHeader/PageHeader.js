import React from 'react';
import PropTypes from 'prop-types';
import './PageHeader.scss';

const PageHeader = ({ title, subtitle, icon }) => {
  const IconComponent = icon;  // Componente do ícone dinâmico
  
  return (
    <div className="page-header">
      <div className="header-content">
        <div className="header-icon">
          <IconComponent />  {/* Renderiza o ícone dinâmico */}
        </div>
        <div>
          <h1>{title}</h1>
        </div>
      </div>
      {subtitle && <p className="header-subtitle">{subtitle}</p>}
    </div>
  );
};

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  icon: PropTypes.elementType.isRequired,  // O ícone deve ser um componente React
};

export default PageHeader;
