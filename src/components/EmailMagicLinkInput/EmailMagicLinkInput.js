// src/components/Login/EmailMagicLinkInput.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getFirestore, collection, setDoc, doc } from 'firebase/firestore';
import { getAuth, isSignInWithEmailLink, signInWithEmailLink, sendSignInLinkToEmail  } from 'firebase/auth';

import { FaGoogle, FaWindows, FaYahoo } from 'react-icons/fa';

const EmailMagicLinkInput = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [mensagemErro, setMensagemErro] = useState('');
  const [emailSent, setEmailSent] = useState(false); // Novo estado
  const [isLoading, setIsLoading] = useState(false); // Alterado para false inicialmente

 const handleMagicLogin = async (e) => {
  e.preventDefault();

  try {
    setIsLoading(true); // Set isLoading to true before sending the email

    const auth = getAuth();

    // Configuração do link de autenticação
    const actionCodeSettings = {
      url: 'http://localhost:3100/login', // URL para redirecionamento após a autenticação
      handleCodeInApp: true,
    };

    // Enviar link de autenticação para o e-mail do usuário
    await sendSignInLinkToEmail(auth, email, actionCodeSettings);

    console.log('Authentication real link sent to', email);

    // Salvar o e-mail para ser usado no manuseio do link
    window.localStorage.setItem('emailForSignIn', email);

    setEmailSent(true);

    // Exibir mensagem para o usuário informando que o link foi enviado
    console.log('Link de autenticação enviado para o e-mail:', email);

    // Chame a função fornecida pelo componente pai
    onLogin(email);
  } catch (error) {
    console.error('Erro ao enviar link de autenticação:', error);
    setMensagemErro('Erro ao enviar link de autenticação. Por favor, tente novamente.');
  } finally {
    // Use setTimeout to delay setting isLoading to false
    setTimeout(() => {
      setIsLoading(false); // Define isLoading como false após a edição dos dados (seja bem-sucedida ou não)
    }, 3000); // 3000 milliseconds = 3 seconds
  }
};


  // Função para verificar e processar o link de autenticação
  useEffect(() => {
    const handleSignInWithEmailLink = async () => {
      try {
        console.log('Verificando link de autenticação...');
        const auth = getAuth();
  
        // Verificar se o e-mail e o código estão presentes no URL
        if (isSignInWithEmailLink(auth, window.location.href)) {
          console.log('Link de autenticação detectado.');
  
          let email = window.localStorage.getItem('emailForSignIn');
  
          // Se o e-mail estiver presente, solicitar a confirmação da autenticação
          if (email) {
            console.log('E-mail presente. Iniciando autenticação...');
  
            await signInWithEmailLink(auth, email, window.location.href);
  
            // Limpar dados temporários do localStorage
            window.localStorage.removeItem('emailForSignIn');
  
            setTimeout(async () => {
              const user = auth.currentUser;
  
              // Verificar se o usuário está autenticado
              if (user) {
                console.log('Usuário autenticado:', user);
  
                // Log dos dados que serão armazenados na coleção "users"
                const userDataToBeStored = {
                  email: user.email,
                  nome: user.displayName || '',
                };
                console.log('Dados a serem armazenados na coleção "users":', userDataToBeStored);
  
                // Aqui você pode adicionar o código para cadastrar o email e o nome na coleção "users"
                const db = getFirestore();
                const usersCollection = collection(db, 'users');
  
                // Adicione um documento com o ID sendo o UID do usuário
                await setDoc(doc(usersCollection, user.uid), userDataToBeStored);
  
                console.log('Usuário cadastrado com sucesso na coleção "users"');
              }
            }, 1000); // Aguarde 1 segundo (ajuste conforme necessário)
          }
        }
      } catch (error) {
        console.error('Erro ao processar o link de autenticação:', error);
  
        // Trate outros erros, se necessário
        setMensagemErro('Erro ao processar o link de autenticação. Por favor, tente novamente.');
      }
    };
  
    // Chame a função de verificação ao carregar a página
    console.log('Iniciando verificação de link de autenticação...');
    handleSignInWithEmailLink();
  }, []); // Chame apenas uma vez no carregamento do componente
  

  return (
    <div>
      <form onSubmit={handleMagicLogin}>
        <input
          type="text"
          placeholder="E-mail"
          id="username"
          name="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {mensagemErro && <p className="erro-message">{mensagemErro}</p>}
        <button type="submit" disabled={isLoading} className='primary-button primary-color'>
          {isLoading ? 'Enviando e-mail...' : 'Receber Link'}
        </button>
        {emailSent && 
          <div className="message">
            <p>
              Acesse a sua caixa de mensagens, enviamos um e-mail com um link mágico para login.
            </p>
            {/* <br/>
            <p><strong>Não recebeu o e-mail?</strong></p>
            <br/>
            <p>
              Verifique se você digitou o endereço de e-mail correto e verifique sua pasta de spam.
            </p> */}
              <div className="email-icons">
                <Link to='http://www.gmail.com' target='_blank'>
                  <FaGoogle className="email-icon" title="Gmail" />
                </Link>
                <Link to='http://outlook.live.com' target='_blank'>
                  <FaWindows className="email-icon" title="Hotmail" />
                </Link>
                <Link to='http://mail.yahoo.com' target='_blank'>
                  <FaYahoo className="email-icon" title="Yahoo" />
                </Link>
              </div>
          </div>
        }
      </form>
    </div>
  );
};

export default EmailMagicLinkInput;
