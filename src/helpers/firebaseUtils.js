// firebaseUtils.js
import { getAuth, signOut } from 'firebase/auth';
import firebaseApp from '../config/firebaseConfig';

const auth = getAuth(firebaseApp);

export const logoutUser = async () => {
  try {
    await signOut(auth);
    console.log('Usuário desconectado com sucesso.');
  } catch (error) {
    console.error('Erro ao desconectar o usuário:', error);
  }
};