// src/components/Login/CadastroStep1.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderCadastro from '../../structure/HeaderCadastro/HeaderCadastro';
import GoogleLoginButton from '../../components/GoogleLoginButton/GoogleLoginButton';
import EmailMagicLinkInput from '../../components/EmailMagicLinkInput/EmailMagicLinkInput'; // Importa o novo componente

import './CadastroSteps.scss';

const CadastroStep1 = () => {
  const [mensagemErro, setMensagemErro] = useState('');
  const navigate = useNavigate();

  const handleCadastro = async (e) => {
    e.preventDefault();
    // Restante do código permanece inalterado
  };

  // Função chamada quando o link de autenticação é enviado
  const handleMagicLinkSent = (email) => {
    console.log('Link de autenticação enviado para o e-mail:', email);
  };

  return (
    <div>
      <HeaderCadastro />
      <div className="content-container">
        <h1>Falta Pouco</h1>
        <p>Insira o seu e-mail profissional para começar. Enviaremos um link mágico ao seu e-mail para concluir o seu cadastro</p>
        
        <EmailMagicLinkInput onLogin={handleMagicLinkSent} />

        <hr />
        <div className="loginSocial">
          <p>ou use o seu e-mail para iniciar</p>
          <div className="btSocial">
            <GoogleLoginButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CadastroStep1;
