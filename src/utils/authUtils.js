// authUtils.js
import {
    getAuth,
    GoogleAuthProvider,
    sendSignInLinkToEmail,
    isSignInWithEmailLink,
    signInWithEmailLink,
    signInWithPopup,
    createUserWithEmailAndPassword,
    updateProfile,
    fetchSignInMethodsForEmail,
  } from 'firebase/auth';
  import { getFirestore, doc, getDoc, setDoc,collection, query, where, getDocs } from 'firebase/firestore';


  import firebaseApp from '../config/firebaseConfig';
  import { logoutUser } from '../helpers/firebaseUtils';
  
  
  const auth = getAuth(firebaseApp);
  const firestore = getFirestore(firebaseApp);
  
  export const verificarSeUsuarioExiste = async (email) => {
    try {
      const firestore = getFirestore();
      const usersCollectionRef = collection(firestore, 'users');
  
      // Consulta para verificar se o email já existe na coleção 'users'
      const existingUserQuery = query(usersCollectionRef, where('emailUsuario', '==', email));
      const existingUserSnapshot = await getDocs(existingUserQuery);
  
      if (!existingUserSnapshot.empty) {
        // O email existe na coleção 'users'
        const userDoc = existingUserSnapshot.docs[0].data();
        
        if (userDoc.firstAccess === 1) {
          // O campo firstAccess é 1, direcione para a complete-profile
          // (substitua 'complete-profile' pelo seu caminho específico)
          window.location.href = '/complete-cadastro';
        } else {
          // O campo firstAccess não é 1, faça algo diferente se necessário
        }
  
        return true; // Retorna true, indicando que o usuário existe e o email está disponível para uso
      } else {
        // O email não existe na coleção 'users'
        return false;
      }
    } catch (error) {
      console.error('Erro ao verificar se o usuário existe:', error);
      // Pode lançar uma exceção ou retornar false, dependendo do seu fluxo de erro
      return false;
    }
  };
  
  export const loginComProvedorGoogle = async (provedor) => {
    try {
      // Implement the logic for logging in with Google provider here
      const resultado = await signInWithPopup(getAuth(firebaseApp), provedor);
      return resultado;
    } catch (error) {
      console.error('Error logging in with Google provider:', error);
      throw error;
    }
  };
  
  export const verificarSeEmailEstaEmUso = async (email) => {
    try {
      const authMethods = await fetchSignInMethodsForEmail(auth, email);
      return authMethods.length > 0;
    } catch (error) {
      console.error('Error checking if email is in use:', error);
      return false;
    }
  };
  
  export const criarUsuarioNoBancoDeDados = async (usuario) => {
    try {
      console.log('Creating user in the database...');
  
      const { uid, email, displayName } = usuario;
      const userId = uid;
      const organizationId = ''; // Coloque a lógica necessária para obter ou definir o organizationId
  
      // Create a reference to the user document using UID as the document ID
      const userDocRef = doc(firestore, 'users', userId);
  
      // Check if the document already exists
      const userDocSnapshot = await getDoc(userDocRef);
  
      if (!userDocSnapshot.exists()) {
        // If the document doesn't exist, create it with user data
        await setDoc(userDocRef, {
          nomeUsuario: displayName,
          emailUsuario: email,
          userId,
          organizationId
          // Adicione outros campos conforme necessário
        });
      }
  
      console.log('User successfully created in the database.');
    } catch (error) {
      console.error('Error creating user in the database:', error);
    }
  };
  
  
  // Add the remaining functions from authUtilsG.js...
  
  // authUtils.js
  export const handleLogin = async (email) => {
    try {
      const auth = getAuth();
      const actionCodeSettings = {
        url: 'http://localhost:3100/login',
        handleCodeInApp: true,
      };
  
      // await sendSignInLinkToEmail(auth, email, actionCodeSettings);
  
      window.localStorage.setItem('emailForSignIn', email);
      console.log('Authentication simulado link sent to', email);
      return true;
    } catch (error) {
      console.error('Error sending authentication link:', error);
      return false;
    }
  };
  
  export const handleSignInWithEmailLink = async (navigate) => {
    try {
      const auth = getAuth();
  
      if (isSignInWithEmailLink(auth, window.location.href)) {
        let email = window.localStorage.getItem('emailForSignIn');
  
        if (email) {
          await signInWithEmailLink(auth, email, window.location.href);
          window.localStorage.removeItem('emailForSignIn');
  
          // Clear session storage on successful login
          window.sessionStorage.clear();
  
          // Obtain information about the authenticated user
          const user = auth.currentUser;
  
          // Create the user in the database
          await criarUsuarioNoBancoDeDados(user);
  
          // Redirect to the dashboard using the navigate function
          navigate('/dashboard');
        }
      }
    } catch (error) {
      console.error('Error processing authentication link:', error);
    }
  };
  
  export const handleGoogleLogin = async (navigate) => {
    try {
      const auth = getAuth();
      const googleProvider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, googleProvider);
  
      if (result.additionalUserInfo.isNewUser) {
        // Implement additional logic if needed
      }
  
      // Clear session storage on successful login
      window.sessionStorage.clear();
  
      console.log('Successful login with Gmail!');
      
    } catch (error) {
      console.error('Error logging in with Google:', error.code, error.message);
      throw error;
    }
  };
  
  export const handleLogout = async () => {
    console.log('Initiating logout process...');
    await logoutUser();
    console.log('Logout successful.');
  };

  export const cadastrarComEmailESenha = async (email, senha) => {
    try {
      console.log('Cadastrando com e-mail e senha...');
      await createUserWithEmailAndPassword(auth, email, senha);
    } catch (error) {
      console.error('Erro ao cadastrar com e-mail e senha:', error);
    }
  };
  
  export const atualizarInformacoesPerfil = async (usuario, nomeExibicao, photoURL) => {
    try {
      console.log('Atualizando perfil do usuário...');
      await updateProfile(usuario, { nomeExibicao, photoURL });
    } catch (error) {
      console.error('Erro ao atualizar perfil do usuário:', error);
    }
  };