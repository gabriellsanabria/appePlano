// BoxKpi.js

import React from 'react';
import PropTypes from 'prop-types';
import './ResultadosDRE.scss';

const ResultadosDRE = ({ title, value, icon, color }) => {
  return (
    <div className={`box-resultado-dre ${color}`}>
      <div className="resultado-dre-icon">{icon}</div>
      <div className="resultado-dre-content">
        <div className="resultado-dre-title">{title}</div>
        <div className="resultado-dre-value">{value}</div>
      </div>
    </div>
  );
};

ResultadosDRE.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.element.isRequired,
  color: PropTypes.string.isRequired,
};

export default ResultadosDRE;
