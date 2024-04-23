// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './Routes';
import NotFound from './components/NotFound/NotFound';

const App = () => {
  // Estado de manutenção
  const [manutencao, setManutencao] = useState(false);

  // Função para alternar o estado de manutenção
  const toggleManutencao = () => {
    setManutencao(!manutencao);
  };

  return (
    <Router>
      {!manutencao ? (
        <div>
          <NotFound />
        </div>
      ) : (
        <AppRoutes />
      )}
    </Router>
  );
};

export default App;
