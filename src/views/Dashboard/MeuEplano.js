import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate, NavLink } from 'react-router-dom';
import { getFirestore, collection, getDocs, where, query } from 'firebase/firestore';
import Layout from '../../components/Layout/layout';
import GuiaEplano from '../../components/GuiaEplano/GuiaEplano';
import TwoColumnLayout from '../../components/Layout/TwoColumnLayout';
import Organograma from '../../components/OrganogramaComp/Organograma';
import { SiCashapp } from "react-icons/si";
import { PiChartLineDownBold } from "react-icons/pi";
import { MdStorefront } from "react-icons/md";
import { FaChevronCircleRight, FaExclamationCircle, FaTag } from 'react-icons/fa';
import { PiPiggyBankBold } from "react-icons/pi";
import { FaRegChartBar } from "react-icons/fa";
import { RiGovernmentFill } from "react-icons/ri";
import './MeuEplano.scss';

const MeuEplano = () => {
  const navigate = useNavigate();
  const { ePlanoId: paramEPlanoId } = useParams();
  const [organizationId, setOrganizationId] = useState(null);
  const [ePlanoId, setEPlanoId] = useState(null);
  const [cnpj, setCnpj] = useState('');
  const [empresasData, setEmpresasData] = useState([]);

  const employeeHierarchy = {
    label: 'CEO',
    name: 'João Almeida',
    position: 'Chief Executive Officer',
    children: [
      {
        label: 'Diretor 1',
        name: 'Pedro Albuquerque',
        position: 'COO',
        children: [
          { label: 'Analista 1', name: 'Emerson', position: 'Analista' },
          { label: 'Analista 2', name: 'Ricardo', position: 'Analista' },
        ],
      },
    ],
  };

  useEffect(() => {
    setEPlanoId(paramEPlanoId);

    const checkEPlano = async () => {
      try {
        const db = getFirestore();
        const ePlanosControleCollection = collection(db, 'ePlanosControle');
        const q = query(ePlanosControleCollection, where('ePlanoId', '==', paramEPlanoId));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.size > 0) {
          const ePlanoData = querySnapshot.docs[0].data();

          if (ePlanoData.firstAccessEplano === 1) {
            const organizationIdFromData = ePlanoData.organizationId;
            setOrganizationId(organizationIdFromData);

            navigate(`/empresa/cadastro/nova/${paramEPlanoId}/${organizationIdFromData}`);
          }
        }

        const empresasCollection = collection(db, 'empresas');
        const empresaQuery = query(empresasCollection, where('ePlanoId', '==', paramEPlanoId));
        const empresaSnapshot = await getDocs(empresaQuery);

        if (!empresaSnapshot.empty) {
          const empresasData = empresaSnapshot.docs.map((doc) => doc.data());
          setEmpresasData(empresasData);

          const cnpjs = empresasData.map((empresa) => empresa.cnpj);
          setCnpj(cnpjs);
        }

      } catch (error) {
        console.error('Erro ao verificar ePlano:', error);
      }
    };

    checkEPlano();
  }, [paramEPlanoId, navigate]);

  return (
    <Layout>
      <div className='dashboard-page' id='meuEplano'>
        <div className='dashboard-content'>

          {empresasData.map((empresa, index) => (
            <React.Fragment key={index}>
              <div className="right-column">
                <h1>Elabore o ePlano Financeiro do seu Negócio</h1>
                <p>
                Elaborar o ePlano Financeiro do seu Negócio – do seu Negócio em Operação –, entre outros, tem alguns objetivos.
                </p>
                <ul>
                  <li>Aprender mais sobre o seu Negócio ao longo dos meses futuros.</li>
                  <li>Entender se o seu Negócio é Viável Financeiramente (ao longo dos meses futuros).</li>
                  <li>Elaborar um Fluxo de Caixa Projetado.</li>
                  <li>Criar Cenários de Projeção (mais otimista e mais pessimista).</li>
                  <li>Entender melhor a relação de Receitas e Despesas do seu Negócio.</li>
                  <li>Evitar surpresas ao longo da jornada. </li>
                </ul>
                <p>O Objetivo Principal é Analisar a Viabilidade Financeira do seu Negócio ao longo dos meses.
                Para te ajudar, nós simplificamos este Processo em 5 Botões, são eles: </p>
                <ul>
                  <li>Receitas Mensais: onde você vai listar os Produtos/ Serviços que serão comercializados. </li>
                  <li> Estimar Receitas: onde você vai inserir Preços e Quantidades para cada Produto/Serviço listado anteriormente. </li>
                  <li> Despesas Mensais: onde você vai listar e estimar as Despesas Mensais do seu Negócio. </li>
                  <li> Caixa Real: onde você vai listar os 4 Tipos de Caixas do seu Negócio. </li>
                  <li> Impostos. </li>
                </ul>
                <p>Após inserir as informações nos Botões acima, você terá elaborado uma “Fotografia Financeira”– do seu Negócio – nos outros 2 botões:</p>
                <ul>
                  <li>Fluxo de Caixa Projetado.</li>
                  <li>Painel de Indicadores.</li>
                </ul>
                <p>Vamos iniciar? Comece pela descrição dos Produtos e Serviços. </p>
                <div className="button-row">
                  <h3><FaChevronCircleRight /> Receitas Mensais</h3>
                  <div className="button-section">
                    <NavLink to='/produtos-servicos' className="big-button">
                      <div className='icons'>
                        <FaTag />
                      </div>
                      <div className='title'>
                        <h2>Produtos/Serviços</h2>
                        <p>Cadastre os produtos e serviços do seu negócio</p>
                      </div>
                      <div className='exclamation-icon' title="Preencha os Produtos e Serviços">
                        <FaExclamationCircle />
                      </div>
                    </NavLink>
                    <NavLink to='/estimar-receitas' className="big-button">
                      <div className='icons'>
                        <SiCashapp />
                      </div>
                      <div className='title'>
                        <h2>Estimar Receitas</h2>
                        <p>Calcule as suas receitas médias mensais</p>
                      </div>
                      <div className='exclamation-icon' title="Preencha uma estimativa de receitas">
                        <FaExclamationCircle />
                      </div>
                    </NavLink>
                  </div>
                </div>

                <div className="button-row">
                  <h3><FaChevronCircleRight /> Despesas Mensais</h3>
                  <div className="button-section">
                    {/* <NavLink to='/estimar-investimentos' className="big-button">
                      <div className='icons'>
                        <MdStorefront />
                      </div>
                      <div className='title'>
                        <h2>Estrutura</h2>
                        <p>Defina a Estrutura de Operação do Negócio</p>
                      </div>
                      <div className='exclamation-icon' title="Tooltip para Estrutura">
                        <FaExclamationCircle />
                      </div>
                    </NavLink> */}
                    <NavLink to='/estimar-despesas' className="big-button">
                      <div className='icons'>
                        <PiChartLineDownBold />
                      </div>
                      <div className='title'>
                        <h2>Estimar Despesas</h2>
                        <p>Estimar os Investimento para Implementar o seu Negócio</p>
                      </div>
                      <div className='exclamation-icon' title="Tooltip para Estimar Despesas">
                        <FaExclamationCircle />
                      </div>
                    </NavLink>
                    <NavLink to='/estimar-impostos' className="big-button">
                      <div className='icons'>
                        <RiGovernmentFill />
                      </div>
                      <div className='title'>
                        <h2>Estimar Impostos</h2>
                        <p>Estimar os impostos para Implementar o seu Negócio</p>
                      </div>
                      <div className='exclamation-icon' title="Tooltip para Estimar Impostos">
                        <FaExclamationCircle />
                      </div>
                    </NavLink>
                  </div>
                </div>

                <div className="button-row">
                  <h3><FaChevronCircleRight /> Análise do Negócio</h3>
                  <div className="button-section">
                    
                    <NavLink to='/fluxo-caixa-projetado' className="big-button">
                      <div className='icons'>
                        <FaRegChartBar />
                      </div>
                      <div className='title'>
                        <h2>Fluxo de Caixa Projetado</h2>
                        <p>
                          Analise a Viabilidade da sua Ideia de Negócio.
                        </p>
                      </div>
                      <div className='exclamation-icon' title="Tooltip para Fluxo de Caixa Projetado">
                        <FaExclamationCircle />
                      </div>
                    </NavLink>

                    <NavLink to='/analise-viabilidad' className="big-button">
                      <div className='icons'>
                        <PiPiggyBankBold />
                      </div>
                      <div className='title'>
                        <h2>Painel Indicadores ePlano</h2>
                        <p>
                          Estime o Caixa Real do Negócio
                        </p>
                      </div>
                      <div className='exclamation-icon' title="Tooltip para Estimar Caixa">
                        <FaExclamationCircle />
                      </div>
                    </NavLink>
                   
                  </div>
                </div>                
                <div className="button-row">
                  <h3><FaChevronCircleRight /> Caixa</h3>
                  <div className="button-section">
                    <NavLink to='/caixa-real' className="big-button">
                      <div className='icons'>
                        <PiPiggyBankBold />
                      </div>
                      <div className='title'>
                        <h2>Estimar Caixa</h2>
                        <p>
                          Estime o Caixa Real do Negócio
                        </p>
                      </div>
                      <div className='exclamation-icon' title="Tooltip para Estimar Caixa">
                        <FaExclamationCircle />
                      </div>
                    </NavLink>
                  </div>
                </div>

                <p>Elaborar o ePlano Financeiro do seu Negócio, entre outros, tem alguns objetivos:</p>
                <ul>
                  <li>Aprender mais sobre a sua Ideia ao longo dos meses futuros.</li>
                  <li>Entender se uma ideia de Negócio é Viável Financeiramente.</li>
                  <li>Elaborar um Fluxo de Caixa Projetado.</li>
                  <li>Criar Cenários de Projeção (mais otimista e mais pessimista).</li>
                  <li>Analisar o Risco de Investir na sua Ideia de Negócio.</li>
                  <li>Evitar surpresas ao longo da jornada.</li>
                </ul>
                <p>O Objetivo Principal é Analisar a Viabilidade Financeira da sua Ideia de Negócio.

                  Para te ajudar, nós simplificamos este Processo nos 4 Botões acima, são eles:
                </p>
                <ul>
                  <li>Receitas Mensais: onde você vai listar os Produtos/ Serviços que serão comercializados.</li>
                  <li>Estimar Receitas e Impostos: onde você vai inserir Preços e Quantidades para cada Produto/ Serviço listado anteriormente.</li>
                  <li>Despesas Mensais: onde você vai listar e estimar as Despesas Mensais da sua ideia de Negócio.</li>
                  <li>Investimentos: onde você vai listar e estimar os Investimentos necessários para implementar as sua Ideia de Negócio.</li>
                </ul>

                <p>Após inserir as informações nos 4 Botões acima, você terá elaborado uma “Fotografia Financeira” – da sua Ideia de Negócio – antes de iniciar qualquer atividade nos outros 2 botões</p>
                <ul>
                  <li>Fluxo de Caixa Projetado.</li>
                  <li>
                    Painel de Indicadores.
                  </li>
                </ul>
                <p>Vamos iniciar? Comece pela definição dos <Link to='/produtos-servicos'>Produtos e Serviços</Link></p>
              </div>
            </React.Fragment>
          ))}

        </div>
      </div>
    </Layout>
  );
};

export default MeuEplano;
