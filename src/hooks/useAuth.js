// useAuth.js
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Navigate } from 'react-router-dom';
import firebaseApp from '../config/firebaseConfig';

const auth = getAuth(firebaseApp);

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
      setLoading(false);
    });

    return () => {
      console.log('Limpando...');
      unsubscribe();
    };
  }, [auth]);

  console.log('useAuth: User:', user, 'Loading:', loading);

  return { user, loading };
};

export default useAuth;
