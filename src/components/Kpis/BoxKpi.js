// BoxKpi.js

import React from 'react';
import PropTypes from 'prop-types';
import './BoxKpi.scss';

const BoxKpi = ({ title, value, icon, color }) => {
  return (
    <div className={`box-kpi ${color}`}>
      <div className="kpi-icon">{icon}</div>
      <div className="kpi-content">
        <div className="kpi-title">{title}</div>
        <div className="kpi-value">{value}</div>
      </div>
    </div>
  );
};

BoxKpi.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.element.isRequired,
  color: PropTypes.string.isRequired,
};

export default BoxKpi;
