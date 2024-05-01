// MeuEplano.js
import React, { useState, useEffect } from 'react';
import {Link, useParams, useNavigate,NavLink } from 'react-router-dom';
import { getFirestore, collection, getDocs, where, query } from 'firebase/firestore';
import Layout from '../../components/Layout/layout';
import GuiaEplano from '../../components/GuiaEplano/GuiaEplano';
import TwoColumnLayout from '../../components/Layout/TwoColumnLayout';
import Organograma from '../../components/OrganogramaComp/Organograma'; // Adicionei a importação do componente Organograma

import './MeuEplano.scss';

const MeuEplano = () => {
  const navigate = useNavigate();
  const { ePlanoId: paramEPlanoId } = useParams();
  const [organizationId, setOrganizationId] = useState(null);
  const [ePlanoId, setEPlanoId] = useState(null);
  const [cnpj, setCnpj] = useState('');
  const [empresasData, setEmpresasData] = useState([]); // Adicionando estado para armazenar dados da coleção empresas

  const employeeHierarchy = {
    label: 'CEO',
    name: 'João Almeida',       
    position: 'Chief Executive Officer',  // Adicione o cargo do CEO
    children: [
      {
        label: 'Diretor 1',
        name: 'Pedro Albuquerque',    
        position: 'COO',  // Adicione o cargo do Diretor 1
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

        // Consultar a coleção empresas para obter os dados
        const empresasCollection = collection(db, 'empresas');
        const empresaQuery = query(empresasCollection, where('ePlanoId', '==', paramEPlanoId));
        const empresaSnapshot = await getDocs(empresaQuery);

        if (!empresaSnapshot.empty) {
          const empresasData = empresaSnapshot.docs.map((doc) => doc.data());
          setEmpresasData(empresasData); // Atualizar o estado com os dados da coleção empresas
          
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
      <div className='dashboard-page'>
        <div className='dashboard-content'>
          <GuiaEplano />

          <TwoColumnLayout>
            {empresasData.map((empresa, index) => (
              <React.Fragment key={index}>
                <div className="left-column" id='profile'>
                  <div className='box-profile'>
                    <div className='logo-avatar'>  
                      <img src='https://eplano.s3.sa-east-1.amazonaws.com/logo_E_eplano.webp'/>
                    </div>
                    <div className='company-name'>
                      <h2>
                        {empresa.estabelecimento.nome_fantasia ? (
                          
                          empresa.estabelecimento.nome_fantasia
                        ) : (
                          empresa.dadosCNPJ.razao_social
                        )}
                      </h2>
                    </div>
                  </div>
                  <div className='box-detalhes'>
                    <div className='header-box-detalhes'>
                      <h4>Detalhes</h4>
                    </div>
                    <hr/>
                    <div className='body-box-detalhes'>
                      <div className='detalhes'>
                        <div className='col-esq'>Website</div>
                        <div className='col-dir'>teste.com.br</div>
                      </div>
                      <div className='detalhes'>
                        <div className='col-esq'>Endereço</div>
                        <div className='col-dir'>R. Pero Valente, 222</div>
                      </div>
                      <div className='detalhes'>
                        <div className='col-esq'>Whatsapp</div>
                        <div className='col-dir'>(11) 98333-2222</div>
                      </div>
                    </div>
                  </div>
                  {/* <div className='box-detalhes'>
                    <div className='header-box-detalhes'>
                      <h4>Organização</h4>
                    </div>
                    <hr/>
                    <div className='organograma'>
                      <Organograma hierarchy={employeeHierarchy} />
                    </div>
                  </div> */}
                </div>
                <div className="right-column">
                  <h2>Elabore o ePlano Financeiro do seu Negócio</h2>
                  <div className="button-row">
                    <NavLink to='/produtos-servicos' className="big-button">
                      Receitas Mensais: Definir os Produtos/Serviços
                    </NavLink>
                    <NavLink to='/estimar-receitas' className="big-button">
                      Estimar Receitas Mensais
                    </NavLink>
                    <NavLink to='/estimar-despesas' className="big-button">
                      Despesas Mensais: Definir a Estrutura de Operação do Negócio
                    </NavLink>
                    <NavLink to='/estimar-investimentos' className="big-button">
                      Definir os Investimentos para Implementar o Negócio
                    </NavLink>
                    
                    <NavLink to='/fluxo-caixa-projetado' className="big-button">Fluxo de Caixa Projetado</NavLink>
                  
                    <NavLink to='/analise-viabilidade' className="big-button">
                    Painel de Indicadores do seu ePlano
                    </NavLink>
                  </div>
                  <p>Elaborar o ePlano Financeiro do seu Negócio, entre outros, tem alguns objetivos:</p>
                  <ul>
                    <li>Aprender mais sobre a sua Ideia ao longo dos meses futuros.
                      </li>
                      <li>
                    Entender se uma ideia de Negócio é Viável Financeiramente.
                    </li>
                      <li>
                    Elaborar um Fluxo de Caixa Projetado.
                    </li>
                      <li>
                    Criar Cenários de Projeção (mais otimista e mais pessimista).
                    </li>
                      <li>
                    Analisar o Risco de Investir na sua Ideia de Negócio.
                    </li>
                      <li>
                    Evitar surpresas ao longo da jornada.
                    </li>

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
          </TwoColumnLayout>

        </div>
      </div>
    </Layout>
  );
};

export default MeuEplano;
