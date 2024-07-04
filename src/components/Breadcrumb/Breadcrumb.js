// Breadcrumb.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Breadcrumb.scss'; // Importe o arquivo SCSS aqui

const Breadcrumb = ({ items }) => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        {items.map((item, index) => (
          <li key={index} className={`breadcrumb-item ${index === items.length - 1 ? 'active' : ''}`}>
            {index === items.length - 1 ? (
              item.label
            ) : (
              <>
                <Link to={item.path}>{item.label}</Link>
                <span className="breadcrumb-separator">{'>'}</span> {/* Aqui está o separador */}
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
