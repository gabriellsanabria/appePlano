// SideNav.js
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';
import Spinner from "../../components/Spinner/Spinner";
import { getFirestore, collection, doc, getDoc, query, where, getDocs } from 'firebase/firestore';
import { logoutUser } from '../../helpers/firebaseUtils';

import { FaChartLine,FaCodeBranch  } from 'react-icons/fa6';
import { RiBuilding4Line } from "react-icons/ri";
import { FiUsers } from "react-icons/fi";
import { FaRegStar } from "react-icons/fa6";
import { MdDashboard , MdKeyboardDoubleArrowLeft } from 'react-icons/md';
import { LuClock, LuUsers } from "react-icons/lu";
import { FaArrowRight,FaPlus} from "react-icons/fa";
import { IoMdArrowDropright } from "react-icons/io";


import './SideNav.scss';

const SideNav = () => {
  const [expanded, setExpanded] = useState(true);
  const [businessMenuExpanded, setBusinessMenuExpanded] = useState(false);
  const [collapsedLogo, setCollapsedLogo] = useState(false);
  const [organizationName, setOrganizationName] = useState('');
  const [userDashboards, setUserDashboards] = useState([]);
  const [meusDashboardsActive, setMeusDashboardsActive] = useState(false);
  const [loadingDashboards, setLoadingDashboards] = useState(false);
  const [urlBase, setUrlBase] = useState(null); 
  const [loadingOrganization, setLoadingOrganization] = useState(false);


  const location = useLocation();
  const navigate = useNavigate();
  const userName = sessionStorage.getItem('userName') || '';
  const { user } = useAuth();


  const fetchUserDashboards = async () => {
    if (user && user.uid) {
      const firestore = getFirestore();
  
      // Consulta para obter os dashboards
      const dashboardsCollectionRef = collection(firestore, 'dashboards');
      const dashboardsQuery = query(dashboardsCollectionRef, where('userId', '==', user.uid));
  
      try {
        setLoadingDashboards(true);
  
        const dashboardsQuerySnapshot = await getDocs(dashboardsQuery);
  
        if (!dashboardsQuerySnapshot.empty) {
          const dashboards = dashboardsQuerySnapshot.docs.map((dashboardDoc) => {
            const dashboardData = dashboardDoc.data();
            console.log('dashboardData:', dashboardData); // Adicione este log
            return {
              dashboardId: dashboardDoc.id,
              urlBase: '', // Você vai preencher isso com a consulta da coleção 'organization'
              ...dashboardData
            };
          });
  
          setUserDashboards(dashboards);
  
          // Consulta para obter o urlBase da coleção organization
          const organizationQuery = query(collection(firestore, 'organization'), where('userId', '==', user.uid));
          const organizationSnapshot = await getDocs(organizationQuery);
  
          if (!organizationSnapshot.empty) {
            const organizationData = organizationSnapshot.docs[0].data();
            const updatedDashboards = dashboards.map(dashboard => ({
              ...dashboard,
              urlBase: organizationData.urlBase
            }));
            setUserDashboards(updatedDashboards);
          }
        } else {
          console.log('Nenhum dashboard encontrado para o usuário');
        }
      } catch (error) {
        console.error('Erro ao buscar dashboards do usuário:', error);
      } finally {
        setLoadingDashboards(false);
      }
    }
  };
  
  
  useEffect(() => {
    const fetchOrganizationData = async () => {
      if (user && user.uid) {
        // Limpar sessionStorage antes de buscar dados da organização
        sessionStorage.removeItem('organizationName');
    
        // Tentar obter organizationName da sessionStorage
        const storedOrganizationName = sessionStorage.getItem('organizationName');
    
        if (storedOrganizationName) {
          // Se organizationName estiver armazenado, definir diretamente no estado
          setOrganizationName(storedOrganizationName);
        } else {
          const firestore = getFirestore();
          const profileCollectionRef = collection(firestore, 'profile');
          const profileQuery = query(profileCollectionRef, where('userId', '==', user.uid));
          
          try {
            setLoadingOrganization(true);
          
            const profileQuerySnapshot = await getDocs(profileQuery);
          
            if (!profileQuerySnapshot.empty) {
              const userProfile = profileQuerySnapshot.docs[0].data();
              const organizationId = userProfile.organizationId;
          
              if (organizationId) {
                const organizationsCollectionRef = collection(firestore, 'organization');
                const organizationDocRef = doc(organizationsCollectionRef, organizationId);
          
                const organizationDocSnapshot = await getDoc(organizationDocRef);
          
                if (organizationDocSnapshot.exists()) {
                  const organizationData = organizationDocSnapshot.data();
                  const organizationName = organizationData.companyName;
          
                  // Armazenar organizationName na sessionStorage
                  sessionStorage.setItem('organizationName', organizationName);
          
                  // Atualizar o estado
                  setOrganizationName(organizationName);
                } else {
                  console.log('Nenhuma organização encontrada com o organizationId associado ao usuário');
                }
              } else {
                console.log('organizationId não encontrado no perfil do usuário');
              }
            } else {
              console.log('Nenhum perfil encontrado para o usuário');
            }
          } catch (error) {
            console.error('Erro ao buscar informações do perfil do usuário:', error);
          } finally {
            setLoadingOrganization(false);
          }
          

        }
      }
    };
    
  
    fetchOrganizationData();
  }, [user]);
  
  const handleMeusDashboardsClick = () => {
    setBusinessMenuExpanded(!businessMenuExpanded);
    setMeusDashboardsActive(true);
  };
  
  useEffect(() => {
    console.log('businessMenuExpanded:', businessMenuExpanded);
    console.log('userDashboards:', userDashboards);
    fetchUserDashboards();
  }, [businessMenuExpanded]);  

  useEffect(() => {
    // Verifica se a URL atual contém "/dashs" e define o estado de "expanded" em conformidade
    setExpanded(!location.pathname.includes('/mydash'));
  }, [location.pathname]);

  const toggleExpand = () => {
    setExpanded(!expanded);
    setCollapsedLogo(!collapsedLogo);
  };

  const toggleBusinessMenu = () => {
    setBusinessMenuExpanded(!businessMenuExpanded);
  };

  const handleSubMenuClick = (event) => {
    event.stopPropagation();
  };

  const handleLogout = async () => {
    await logoutUser();
    navigate('/auth'); // Substitua history.push por navigate
  };

  return (
    <div className={`sidenav ${expanded ? 'expanded' : 'collapsed'}`}>
      <div className='sidenav-header'>
        <div className={`logo ${expanded ? 'large' : 'small'}`}>
          <Link to="/dashboard">
            {collapsedLogo ? (
              <img src="https://s3.sa-east-1.amazonaws.com/oboss.com.br/icone_oboss.webp" alt="Logo recolhida" />
              ) : (
                <img src="https://eplano.s3.sa-east-1.amazonaws.com/logo_eplano_footer.webp" alt="Logo da empresa" />
              )}               
          </Link>
        </div>
        <div className='toggleExpand'>
          <div className='sidenavClose' onClick={toggleExpand}>
            <MdKeyboardDoubleArrowLeft  />
          </div>
        </div>
      </div>
      <div className='organization-profile'>
        <li>
          <Link to="/company" className={location.pathname === '/organization' ? 'active' : ''}>
            <div className='icone'>
            <RiBuilding4Line  />
            </div>
              {expanded && (
              <div className='company'>
                <div className='data-company'>
                  {loadingOrganization ? (
                    <div className='loader'>
                      <Spinner />
                    </div>
                  ) : (
                    <>
                      <div className='label'>
                        {organizationName}
                      </div>
                      <div className='infos-company'>    
                        <div className='qtdusers'>
                          <Link to='/company/unidades'>
                            1 Plano de Negócio
                          </Link>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <div className='arrow-go'>
                  <FaArrowRight />
                </div>
              </div>
            )}
          </Link>
        </li>
      </div>
        <hr />
      <ul>
    <li  className={businessMenuExpanded ? 'with-submenu expanded' : 'with-submenu'}>
      <Link to='/dashboard' className={`${location.pathname === '/dashboard' ? 'active' : ''}`}>
        <div onClick={handleMeusDashboardsClick} className={`arrow-icon ${businessMenuExpanded ? 'expanded' : ''}`}>
          <IoMdArrowDropright />
        </div>
        <div className='icone'>
          <FaChartLine />
        </div>
        {expanded && (
          <div className='label'>
            Meus ePlanos
          </div>
        )}
      </Link>
      {businessMenuExpanded && (
        <ul onClick={handleSubMenuClick}>
          {loadingDashboards ? (
            <div className='loader'>
              <Spinner />
            </div>
          ) : (
            <>
              <li>
                <Link to="" className={`${location.pathname === '' ? 'active' : 'grey'}`}>
                  <div className='icone'>
                    <FaPlus />
                  </div>
                  <div className='label'>
                    Criar ePlano
                  </div>
                </Link>
              </li>
              {/* <li>
                <Link to="/dashboard" className={`${location.pathname === '/dashboard' ? 'active' : ''}`}>
                  <div className='icone'>
                    <MdDashboard />
                  </div>
                  <div className='label'>
                    Meus Dashboards
                  </div>
                </Link>
              </li> */}
              {userDashboards.map((dashboard, index) => (
                <li key={index}>
                  {dashboard.dashboardId && (
                    <Link to={`/mydash/${dashboard.urlBase}/${dashboard.dashboardId}/${dashboard.urlDash}`} className={location.pathname === `/dashboard/${dashboard.dashboardId}` ? 'active' : ''}>
                      <div className='icone'>
                        <MdDashboard />
                      </div>
                      <div className='label'>
                        {dashboard.nomeDash}
                      </div>
                    </Link>
                  )}
                </li>
              ))}
            </>
          )}
          <li>
          <Link to="" className={location.pathname === '/compartilhados-comigo' ? 'active' : ''}>
            <div className='icone'>
            <FiUsers />
            </div>
            {expanded && (
              <div className='label'>
                Compartilhados comigo
              </div>
            )}
          </Link>
        </li>
        <li>
          <Link to="" className={location.pathname === '/compartilhados-comigo' ? 'active' : ''}>
            <div className='icone'>
            <LuClock />
            </div>
            {expanded && (
              <div className='label'>
                Recentes
              </div>
            )}
          </Link>
        </li>
        <li>
          <Link to="" className={location.pathname === '/compartilhados-comigo' ? 'active' : ''}>
            <div className='icone'>
            <FaRegStar  />
            </div>
            {expanded && (
              <div className='label'>
                Favoritos
              </div>
            )}
          </Link>
        </li>
        </ul>
      )}
    </li>
        {/* <li>
          <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''}>
            <div className='icone'>
            <FaChartLine  />
            </div>
            {expanded && (
              <div className='label'>
                Meus Dashboards
              </div>
            )}
          </Link>
        </li> */}
        

        {/* {expanded && (
          <>
            <li onClick={toggleBusinessMenu} className={businessMenuExpanded ? 'with-submenu expanded' : 'with-submenu'}>
              <Link to="#" className={location.pathname === '/meu-negocio' ? 'active' : ''}>
              <div className='icone'>
                <FaChartLine  />
                </div>
                {expanded && (
                  <div className='label'>
                    Meus Dashboards
                  </div>
                )}
                <div className={`arrow-icon ${businessMenuExpanded ? 'expanded' : ''}`}>                 
                  <IoMdArrowDropright />
                 
                </div>
              </Link>
              {businessMenuExpanded && (
                <ul onClick={handleSubMenuClick}>
                  <li>
                    <Link to="/eplano/criar" className={location.pathname === '/eplano/criar' ? 'active' : ''}>
                      <div className='label'>
                        Criar um Dashboard
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link to="/empresa" className={location.pathname === '/empresa' ? 'active' : ''}>
                      <div className='label'>
                        Gerenciar Empresas
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link to="/empresa/cadastro" className={location.pathname === '/empresa/cadastro' ? 'active' : ''}>
                      <div className='label'>
                        Cadastrar Empresa
                      </div>
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          </>
        )} */}

        
        <hr />
        <li>
          <Link to="/integracoes" className={location.pathname === '/integracoes' ? 'active' : ''}>
            <div className='icone'>
              <FaCodeBranch />
            </div>
            {expanded && (
              <div className='label'>
                Integrações
              </div>
            )}
          </Link>
        </li>
        <li>
          <Link to="/integracoes" className={location.pathname === '/integracoes' ? 'active' : ''}>
            <div className='icone'>
              <FaCodeBranch />
            </div>
            {expanded && (
              <div className='label'>
                Produtos Connect S/A
              </div>
            )}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideNav;
