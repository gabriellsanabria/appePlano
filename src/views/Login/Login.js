// src/components/Login/LoginPage.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { handleSignInWithEmailLink, handleGoogleLogin } from '../../utils/authUtils';
import GoogleLoginButton from '../../components/GoogleLoginButton/GoogleLoginButton';
import EmailMagicLinkInput from '../../components/EmailMagicLinkInput/EmailMagicLinkInput';
import Autenticando from '../Loader/Autenticando';
import './Login.scss';

const Login = () => {
  const navigate = useNavigate();
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  // Função chamada quando o link de autenticação é enviado
  const handleMagicLinkSent = (email) => {
    console.log('Link de autenticação enviado para o e-mail:', email);
  };

  useEffect(() => {
    const signInWithEmailLink = async () => {
      setIsAuthenticating(true);
      await handleSignInWithEmailLink(navigate);
      setIsAuthenticating(false);
    };

    signInWithEmailLink();
  }, [navigate]);


  return (
    <div className="login-page">
      {isAuthenticating && <Autenticando />}
      <div className="image-container">
        {/* Imagem do lado esquerdo */}
        <img src="https://eplano.s3.sa-east-1.amazonaws.com/banner_1.webp" alt="Imagem de fundo" />
      </div>
      <div className="form-container">
        {/* Formulário no lado direito */}
        <div className="form-content">
          <div className='logo-login'>
            
          <Link className='thelink' to="">
            <img src="https://eplano.s3.sa-east-1.amazonaws.com/logo_eplano.webp" alt="Logo da empresa" />
           </Link>
          </div>
          <h1>Entrar</h1>
          <p><strong>Gerencie so seu negócio de forma fácil e rápida</strong></p>

          <p>Use o seu e-mail para acessar.</p>
          <EmailMagicLinkInput onLogin={handleMagicLinkSent} />
          <p> Enviaremos um link mágico ao seu email para um login sem senha.</p>

          <div class="separator-with-word">
              <div class="line"></div>
              <div class="word">ou</div>
              <div class="line"></div>
          </div>

          
          
          <div className='google-bt-control'>
            <div className='google-bt-control-center'>
              <GoogleLoginButton onGoogleLogin={handleGoogleLogin} />
            </div>
          </div>

          <Link className='thelink' to="/cadastro">Cadastrar-se</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
