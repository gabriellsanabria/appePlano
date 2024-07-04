import React from 'react';
import './HeaderCadastro.scss'; // Certifique-se de criar este arquivo CSS

const HeaderCadastro = () => {
  return (
    <div className="HeaderCadastro">
      <div className="logo-container">
        <img src="https://eplano.s3.sa-east-1.amazonaws.com/logo_eplano.webp" className='logo' alt="Logo da empresa" />
      </div>
      <div className="help-button-container">
        <a href='' className="help-button">Ajuda</a>
      </div>
    </div>
  );
};

export default HeaderCadastro;
