import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, getAuth, signInWithRedirect, getRedirectResult } from 'firebase/auth';
import firebaseApp from '../../config/firebaseConfig';
import BtGoogle from '../../components/BtGoogle/BtGoogle';
import { logoutUser } from '../../helpers/firebaseUtils';
import Loader from '../../components/Loader/PageLoader';
import {
  verificarSeUsuarioExiste,
  verificarSeEmailEstaEmUso,
  criarUsuarioNoBancoDeDados,
  cadastrarComEmailESenha,
  atualizarInformacoesPerfil,
  loginComProvedorGoogle
} from '../../utils/authUtils';

const auth = getAuth(firebaseApp);

const GoogleLoginButton = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const signInWithGoogle = async () => {
    if (user) {
      // alert('Usuário já autentiscado. Navegando para a dashboard...');
      navigate('/dashboard');
      return;
    }

    try {
      // alert('Iniciando processo de login com o Google...');
      const usuarioGoogle = await loginComProvedorGoogle(new GoogleAuthProvider());

      const { user } = usuarioGoogle;
      const { email, displayName } = user;

      try {
        // alert('Verificando se o usuário já existe no banco de dados...');
        const usuarioExiste = await verificarSeUsuarioExiste(email);

        if (!usuarioExiste) {
          // alert('Usuário não encontrado. Criando conta e atualizando perfil...');
          // alert('aqui deve aparecer loader');
          <Loader/>
          const { uid, photoURL } = user;

          try {
            // alert('Cadastrando no banco de dados...');
            await criarUsuarioNoBancoDeDados(user);
            // alert('Cadastro no banco de dados realizado com sucesso.');
            await cadastrarComEmailESenha(email, 'senha-aleatoria');
            await atualizarInformacoesPerfil(auth.currentUser, { displayName, photoURL });
            navigate('/complete-cadastro')
          } catch (error) {
            alert('Erro ao cadastrar no banco de dados:', error);
          }

        }else{
          // alert('Login bem-sucedido. Navegando para a dashboard...');
          navigate('/dashboard');
        }
      } catch (error) {
        console.error('Erro ao verificar a existência do usuário:', error);
      }
    } catch (error) {
      console.error('Erro ao fazer login com o Google:', error);
    }
  };


  const handleLogout = async () => {
    console.log('Iniciando processo de logout...');
    await logoutUser();
    console.log('Logout bem-sucedido.');
  };

  return (
    <div>
      {user ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <>
          <BtGoogle onGoogleClick={signInWithGoogle} />
          {loading && <Loader />} {/* Renderiza o Loader enquanto loading for true */}
        </>
      )}
    </div>
  );
};

export default GoogleLoginButton;
