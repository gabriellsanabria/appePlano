import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from './useAuth';

const RotaProtegida = ({ children }) => {
  const { user } = useAuth();

  console.log('RotaProtegida: User:', user);

  if (!user) {
    console.log('Usuário não autenticado. Redirecionando para /login.');
    return <Navigate to="/login" />;
  }

  console.log('Usuário autenticado. Renderizando componentes filhos.');
  return <>{children}</>;
};

export default RotaProtegida;
