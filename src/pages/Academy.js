import React from 'react';
import './Academy.scss';

function Academy() {
  return (
    <div className="academy">
      <div className="header-page">
        <div className="header-page-content">
          <div className="header-page-image">
            <img src="https://eplano.s3.sa-east-1.amazonaws.com/img_header_page_academy.webp" alt="Banner 1" />
          </div>
          <div className="header-page-text-content">
            <h1>
              ePlano Academy
            </h1>
            <p>
            Em breve, você terá a oportunidade de aprender com especialistas em nossa ampla gama de cursos que o capacitam para o mercado atual
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Academy;
