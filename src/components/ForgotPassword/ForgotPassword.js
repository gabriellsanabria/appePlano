// src/components/Login/ForgotPassword.js
import React, { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { Link } from 'react-router-dom';
import './ForgotPassword.scss'; // Crie este arquivo para estilizar a página

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);
  const [error, setError] = useState(null);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleResetPassword = async () => {
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      setResetSent(true);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="forgot-password ">
      <div className="image-container">
        {/* Imagem do lado esquerdo */}
        <img src="caminho/para/sua/imagem.jpg" alt="Imagem de fundo" />
      </div>
      <div className="form-container">
        {/* Formulário no lado direito */}
        <div className="form-content">
          <div className='logo-login'>
            <img src="https://s3.sa-east-1.amazonaws.com/oboss.com.br/logo_oboss_roxo.webp" alt="Logo da empresa" />
            
          </div>
          <h1>Recupere sua senha</h1>
          {resetSent ? (
                <p>Um email foi enviado para redefinir sua senha. Verifique sua caixa de entrada.</p>
            ) : (
                <div>
                <p>Insira seu email para receber um link de redefinição de senha.</p>
                <input type="email" placeholder="Seu Email" value={email} onChange={handleEmailChange} />
                <button onClick={handleResetPassword}>Enviar Email de Recuperação</button>
                {error && <p>{error}</p>}
                </div>
            )}
            <Link to="/auth">Voltar para página de Login</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
