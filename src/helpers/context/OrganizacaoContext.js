// OrganizacaoContext.js
import { createContext, useContext, useState } from 'react';

const OrganizacaoContext = createContext();

export const OrganizacaoProvider = ({ children }) => {
  const [organizacaoData, setOrganizacaoData] = useState({
    companyName: '', // Adicione outras propriedades conforme necessário
  });

  return (
    <OrganizacaoContext.Provider value={{ organizacaoData, setOrganizacaoData }}>
      {children}
    </OrganizacaoContext.Provider>
  );
};

export const useOrganizacao = () => {
  const context = useContext(OrganizacaoContext);
  if (!context) {
    throw new Error('useOrganizacao deve ser usado dentro de um OrganizacaoProvider');
  }
  return context;
};
