import React, { useEffect, useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { OrganizacaoProvider } from './helpers/context/OrganizacaoContext';

import useAuth from './hooks/useAuth';
import PageLoader from './components/Loader/PageLoader';
import NotFound from './components/NotFound/NotFound';
import './views/Dashboard/Dashboard.scss';

import Login from './views/Login/Login';
import Cadastro from './views/CadastroSteps/CadastroStep1';
import MeuEplano from './views/Dashboard/MeuEplano';
import Loader from './views/Loader/Loader';
import TutorialModal from './components/TutorialModal/TutorialModal';
import Doc from './components/Doc/Doc';

import Planejador from './views/Planejador/Planejador';
import PlanejadorFluxoCaixa from './views/Planejador/PlanejadorFluxoCaixa/PlanejadorFluxoCaixa';
import Simulador from './views/Simulador/Simulador';
import SimuladorFluxoCaixa from './views/Simulador/SimuladorFluxoCaixa/SimuladorFluxoCaixa';

import EstimarCaixa from './views/Simulador/EstimarCaixa/EstimarCaixa';

import Recharts from './components/Recharts/Recharts';

import ProdutosServicosPlanejador from './views/Planejador/ProdutosServicos/ProdutosServicos';
import ProdutosServicosSimulador from './views/Simulador/ProdutosServicos/ProdutosServicos';

import EstimarReceitasPlanejador from './views/Planejador/EstimarReceitas/EstimarReceitas';
import EstimarReceitasSimulador from './views/Simulador/EstimarReceitas/EstimarReceitas';

import EstimarDespesasPlanejador from './views/Planejador/EstimarDespesas/EstimarDespesas';
import EstimarDespesasSimulador from './views/Simulador/EstimarDespesas/EstimarDespesas';

import EstimarInvestimentos from './views/Planejador/EstimarInvestimentos/EstimarInvestimentos';
import Impostos from './views/Planejador/Impostos/Impostos';



// import EstimarReceitas from './views/ePlano/EstimarReceitas/EstimarReceitas';
// import EstimarDepesas from './views/ePlano/EstimarDepesas/EstimarDepesas';
// import EstimarInvestimentos from './views/ePlano/EstimarInvestimentos/EstimarInvestimentos';
import FluxoDeCaixaProjetado from './views/ePlano/FluxoDeCaixaProjetado/FluxoDeCaixaProjetado';
import AnaliseViabilidadePayback from './views/ePlano/AnaliseViabilidadePayback/AnaliseViabilidadePayback';

const ForgotPassword = lazy(() => import('./components/ForgotPassword/ForgotPassword'));
const MinhaConta = lazy(() => import('./views/MinhaConta/MinhaConta'));
const VerEmpresa = lazy(() => import('./views/MinhasEmpresas/VerEmpresa'));
const CadastrarEmpresa = lazy(() => import('./views/MinhasEmpresas/CadastrarEmpresa'));
const CadastrarEmpresaNova = lazy(() => import('./views/MinhasEmpresas/CadastrarEmpresaNova'));
const Dashboard = lazy(() => import('./views/Dashboard/Dashboard'));
const CriarPlano = lazy(() => import('./views/ePlano/CriarPlano'));
const PainelFinanceiro = lazy(() => import('./views/Financeiro/PainelFinanceiro'));
const Company = lazy(() => import('./views/Company/Company'));
const CompanyUsers = lazy(() => import('./views/Company/CompanyUsers'));
const UsersRegistration = lazy(() => import('./views/Company/UsersRegistration'));
const Integracoes = lazy(() => import('./views/Integracoes/SolicitarIntegracao'));
const CompleteCadastro = lazy(() => import('./views/CompleteCadastro/CompleteCadastro'));



const UploadDados = lazy(() => import('./views/Upload/UploadDados'));
const WidgetsBase = lazy(() => import('./views/RegistroBanco/RegistroBanco'));



const AppRoutes = () => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const [userHasEmpresa, setUserHasEmpresa] = useState(false);

  // useEffect(() => {
  //   const checkUserEmpresas = async () => {
  //     try {
  //       const firestore = getFirestore();
  //       const empresasCollection = collection(firestore, 'empresas');
  //       const q = query(empresasCollection, where('usuarioId', '==', user.uid));
  //       const querySnapshot = await getDocs(q);
  //       const empresasDoUsuario = querySnapshot.docs
  //         .map((doc) => ({
  //           ...doc.data(),
  //           id: doc.id,
  //         }))
  //         .filter((empresa) => empresa.status !== 0);

  //       setUserHasEmpresa(empresasDoUsuario.length > 0);
  //     } catch (error) {
  //       console.error('Erro ao verificar empresas do usuário:', error);
  //     }
  //   };

  //   if (user) {
  //     checkUserEmpresas();
  //   }
  // }, [user]);

  if (loading) {
    return <Loader />;
  }

  const isLoginPage = location.pathname === '/' || location.pathname === '/login';

  if (user && isLoginPage) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
      
        <Route path="/" element={<Login />} />
        <Route path="/doc" element={user ? <Doc /> : <Navigate to="/login" />} />
        
        <Route path="/tutorial" element={user ? <TutorialModal /> : <Navigate to="/login" />} />
        <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/recovery" element={<ForgotPassword />} />
        <Route path="/minha-conta" element={user ? <MinhaConta /> : <Navigate to="/login" />} />
        <Route path="/complete-cadastro" element={user ? <CompleteCadastro /> : <Navigate to="/login" />} />
        <Route
          path="/empresa"
          element={
            user ? (
              userHasEmpresa ? (
                <VerEmpresa />
              ) : (
                <Navigate to="/empresa/cadastro/nova" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/empresa/cadastro/nova/:ePlanoId/:organizationId"
          element={
            user ? (
              userHasEmpresa ? (
                <Navigate to="/empresa" />
              ) : (
                <CadastrarEmpresaNova />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/planejador-financeiro"
          element={user ? <Planejador /> : <Navigate to="/login" />}
        />
        <Route
          path="/planejador-financeiro/produtos"
          element={user ? <ProdutosServicosPlanejador /> : <Navigate to="/login" />}
        />
        <Route
          path="/planejador-financeiro/estimar-receitas"
          element={user ? <EstimarReceitasPlanejador /> : <Navigate to="/login" />}
        />
        <Route
          path="/planejador-financeiro/estimar-despesas"
          element={user ? <EstimarDespesasPlanejador /> : <Navigate to="/login" />}
        />
        <Route
          path="/planejador-financeiro/estimar-investimento"
          element={user ? <EstimarInvestimentos /> : <Navigate to="/login" />}
        />

        <Route
          path="/planejador-financeiro/impostos"
          element={user ? <Impostos /> : <Navigate to="/login" />}
        />
        <Route
          path="/planejador-financeiro/fluxo-caixa"
          element={user ? <PlanejadorFluxoCaixa /> : <Navigate to="/login" />}
        />

        <Route
          path="/simulador-financeiro"
          element={user ? <Simulador /> : <Navigate to="/login" />}
        />

        <Route
          path="/simulador-financeiro"
          element={user ? <Planejador /> : <Navigate to="/login" />}
        />
        <Route
          path="/simulador-financeiro/produtos"
          element={user ? <ProdutosServicosSimulador /> : <Navigate to="/login" />}
        />
        <Route
          path="/simulador-financeiro/estimar-receitas"
          element={user ? <EstimarReceitasSimulador /> : <Navigate to="/login" />}
        />
        <Route
          path="/simulador-financeiro/estimar-despesas"
          element={user ? <EstimarDespesasSimulador /> : <Navigate to="/login" />}
        />
        <Route
          path="/simulador-financeiro/estimar-caixa"
          element={user ? <EstimarCaixa /> : <Navigate to="/login" />}
        />

        <Route
          path="/simulador-financeiro/impostos"
          element={user ? <Impostos /> : <Navigate to="/login" />}
        />
        <Route
          path="/simulador-financeiro/fluxo-caixa"
          element={user ? <SimuladorFluxoCaixa /> : <Navigate to="/login" />}
        />








        
        <Route
          path="/meu-eplano/:urlBase/:ePlanoId/:urlEplano"
          element={user ? <MeuEplano /> : <Navigate to="/login" />}
        />
        {/* <Route
          path="/produtos-servicos"
          element={user ? <ProdutosServicos /> : <Navigate to="/login" />}
        /> */}
        {/* <Route
          path="/estimar-receitas"
          element={user ? <EstimarReceitas /> : <Navigate to="/login" />}
        /> */}
        {/* <Route
          path="/estimar-despesas"
          element={user ? <EstimarDespesas /> : <Navigate to="/login" />}
        /> */}
        <Route
          path="/estimar-investimentos"
          element={user ? <EstimarInvestimentos /> : <Navigate to="/login" />}
        />
        <Route
          path="/fluxo-caixa-projetado"
          element={user ? <FluxoDeCaixaProjetado /> : <Navigate to="/login" />}
        />
        <Route
          path="/analise-viabilidade"
          element={user ? <AnaliseViabilidadePayback /> : <Navigate to="/login" />}
        />

        <Route
          path="/financeiro"
          element={user ? <PainelFinanceiro /> : <Navigate to="/login" />}
        />

        <Route
          path="/company"
          element={user ? <Company /> : <Navigate to="/login" />}
        />

        <Route
          path="/company/usuarios"
          element={user ? <CompanyUsers /> : <Navigate to="/login" />}
        />
        
        
        <Route
          path="/integracoes"
          element={user ? <Integracoes /> : <Navigate to="/login" />}
        />


        <Route
          path="*"
          element={user ? <NotFound /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/upload/dados"
          element={user ? <UploadDados /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/widgetsBase"
          element={user ? <WidgetsBase /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/recharts"
          element={user ? <Recharts /> : <Navigate to="/dashboard" />}
        />


        {/* <Route
          path="/eplano/criar"
          element={
            user ? (
              userHasEmpresa ? (
                <CriarPlano />
              ) : (
                <Navigate to="/empresa/cadastro/nova" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        /> */}
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
