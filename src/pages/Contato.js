import React from 'react';
import FormularioContato from '../components/Formularios/FormularioContato';
import './Contato.scss';

function Contato() {
  return (
    <div className="academy">
      <div className="header-page">
        <div className="header-page-content">
          <div className="header-page-image">
            <img src="https://eplano.s3.sa-east-1.amazonaws.com/img_header_page_contato.webp" alt="Banner 1" />
          </div>
          <div className="header-page-text-content">
            <h1>
              Contato
            </h1>
            <div className='form'>
              <FormularioContato />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contato;
