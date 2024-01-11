import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageLoader from './components/Loader/PageLoader';
import Header from './structure/Header';
import StaticContent from './structure/StaticContent';
import Footer from './structure/Footer';
import CompHelmet from './components/CompHelmet/CompHelmet';

// Importe os componentes das páginas
const Home = lazy(() => import('./pages/Home'));
const Sobre = lazy(() => import('./pages/Sobre'));
const Solucao = lazy(() => import('./pages/Solucao'));
const Planos = lazy(() => import('./pages/Planos'));
const Academy = lazy(() => import('./pages/Academy'));
const Contato = lazy(() => import('./pages/Contato'));

function App() {
  const tituloDaPagina = 'ePlano - Solução Inovadora para Planejamento e Gestão de Micro e Pequenos Negócios.';
  return (
    <Router>
      <Header />
      <CompHelmet pageTitle={tituloDaPagina} />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/sobre"
            element={
              <>
                <CompHelmet pageTitle="ePlano - Sobre nós" />
                <Sobre />
              </>
            }
          />
          <Route
            path="/solucao"
            element={
              <>
                <CompHelmet pageTitle="ePlano - Nossa Solução" />
                <Solucao />
              </>
            }
          />
          <Route
            path="/planos"
            element={
              <>
                <CompHelmet pageTitle="ePlano - Escolha o Seu Plano" />
                <Planos />
              </>
            }
          />
          <Route
            path="/eplano-academy"
            element={
              <>
                <CompHelmet pageTitle="ePlano - Academy" />
                <Academy />
              </>
            }
          />
          <Route
            path="/contato"
            element={
              <>
                <CompHelmet pageTitle="ePlano - Contato" />
                <Contato />
              </>
            }
          />
        </Routes>
      </Suspense>
      <StaticContent />
      <Footer />
    </Router>
  );
}

export default App;
