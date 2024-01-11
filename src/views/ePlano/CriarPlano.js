// frontend/src/components/Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';

import Layout from '../../components/Layout/layout';
import './CriarPlano.scss'; // Importe ou crie este arquivo para estilizar a página


const CriarPlano = () => {
  return (
    
    <Layout>
      <div className='dashboard-page'>
        <div className='dashboard-content'>
        </div>
      </div>
    </Layout>
  );
};

export default CriarPlano;
