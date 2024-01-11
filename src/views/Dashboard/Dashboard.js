// Dashboard.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout/layout';
import TutorialModal from '../../components/TutorialModal/TutorialModal';
import Spinner from "../../components/Spinner/Spinner";
import { getFirestore, collection, addDoc, getDocs, query, where,deleteDoc,doc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid'; // Importando a função v4 do uuid
import useAuth from '../../hooks/useAuth';
import { RiMoreFill } from 'react-icons/ri';
import { FaPlusCircle,FaTimes } from "react-icons/fa";



const ifoodImage = 'https://i.pinimg.com/736x/e6/54/8f/e6548f20067f0fa001e8439668849dab.jpg';
const pizzaPrimeIndaiatuba = 'https://play-lh.googleusercontent.com/57cZ-ubY3GkzK7O8RmP59G1xNSslECC9DnmMTla_odJmI4CIjwP1OHyXIYiOIAWOLmY';
const pizzaPrimeRede = 'https://play-lh.googleusercontent.com/57cZ-ubY3GkzK7O8RmP59G1xNSslECC9DnmMTla_odJmI4CIjwP1OHyXIYiOIAWOLmY';
const ifoodVendasAno = 'https://i.pinimg.com/736x/e6/54/8f/e6548f20067f0fa001e8439668849dab.jpg';
const rappiImage = 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Rappi_backgr_logo.png/800px-Rappi_backgr_logo.png';

const Dashboard = () => {
  const [layout, setLayout] = useState([]);
  const [openWidgets, setOpenWidgets] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDashboardName, setNewDashboardName] = useState('');
  const [dashboards, setDashboards] = useState([]);
  const [isTutorialOpen, setIsTutorialOpen] = useState(true);

  const [selectedCard, setSelectedCard] = useState(null);
  const [dashboardPopovers, setDashboardPopovers] = useState({});

  const { user: authUser } = useAuth();
  const userId = authUser ? authUser.uid : '';
  const [urlBase, setUrlBase] = useState(null);

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [confirmationText, setConfirmationText] = useState('');

  const [isLoadingDashboards, setIsLoadingDashboards] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');



  const availableWidgets = [
    { type: 'IfoodWidget', label: 'Pizza Prime - Rede', image: pizzaPrimeRede, urlDash: '/dashs/company/pizza-prime/rede' },
    { type: 'IfoodWidget', label: 'Pizza Prime - Indaiatuba', image: pizzaPrimeIndaiatuba, urlDash: '/dashs/company/pizza-prime/rede' },
    { type: 'IfoodWidget', label: 'iFood Vendas no Ano', image: ifoodVendasAno, urlDash: '/dashs/company/pizza-prime/rede' },
    { type: 'RappiWidget', label: 'Rappi Vendas no Ano', image: rappiImage, urlDash: '/dashs/company/pizza-prime/rede' },
  ];

  const maxWidgetsPerRow = 5;
  const widgetWidth = 4;
  const widgetHeight = 5;

  const addWidget = (widgetType) => {
    if (openWidgets.length < 10 && !openWidgets.includes(widgetType)) {
      const row = Math.floor(openWidgets.length / maxWidgetsPerRow);
      const col = openWidgets.length % maxWidgetsPerRow;

      const newLayoutItem = {
        i: widgetType + layout.length,
        x: col * widgetWidth,
        y: row * widgetHeight,
        w: widgetWidth,
        h: widgetHeight,
      };

      setLayout([...layout, newLayoutItem]);
      setOpenWidgets([...openWidgets, widgetType]);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleNameChange = (event) => {
    setNewDashboardName(event.target.value);
  };
  
  const createNewDashboard = async () => {
    try {
      // Verifica se o nome do dashboard está vazio ou contém apenas espaços em branco
      if (!newDashboardName.trim()) {
        // Exibe uma mensagem de erro (você pode personalizar conforme necessário)
        alert('Por favor, insira um nome para o dashboard.');
        return;
      }
  
      const firestore = getFirestore();
      const dashboardsCollectionRef = collection(firestore, 'dashboards');
  
      const urlDash = newDashboardName.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
  
      const dashboardId = uuidv4().replace(/[^a-zA-Z0-9]/g, '').substring(0, 6);
  
      // Obtenha o ID da coleção 'organization'
      const organizationDocQuery = query(collection(firestore, 'organization'), where('userId', '==', userId));
      const organizationDocSnapshot = await getDocs(organizationDocQuery);
  
      let organizationId = null;
  
      if (organizationDocSnapshot.docs.length > 0) {
        const organizationDoc = organizationDocSnapshot.docs[0];
        organizationId = organizationDoc.exists() ? organizationDoc.id : null;
      }
  
      // Crie o novo dashboard com o ID da coleção 'organization'
      const newDashboardDocRef = await addDoc(dashboardsCollectionRef, {
        nomeDash: newDashboardName,
        userId: userId,
        urlDash: urlDash,
        dashboardId: dashboardId,
        organizationId: organizationId, // Novo campo organizationId
      });
  
      console.log('New dashboard created with ID:', newDashboardDocRef.id);
  
      setDashboards((prevDashboards) => [
        ...prevDashboards,
        { id: newDashboardDocRef.id, nomeDash: newDashboardName, urlDash: urlDash, dashboardId: dashboardId, organizationId: organizationId },
      ]);
  
      setNewDashboardName('');
      closeModal();
    } catch (error) {
      console.error('Error creating new dashboard:', error);
    }
  };
  


  useEffect(() => {
    const fetchDashboards = async () => {
      try {
        setIsLoadingDashboards(true); // Ativa o spinner
  
console.log('Ativou spinner');  
        const firestore = getFirestore();
  
        // Consulta para obter os dashboards
        const dashboardsCollectionRef = collection(firestore, 'dashboards');
        
        const querySnapshot = await getDocs(
          query(dashboardsCollectionRef, where('userId', '==', userId))
        );
  
        const dashboardsArray = querySnapshot.docs
          .map((doc) => ({ dashboardId: doc.id, ...doc.data() }))
          .sort((a, b) => a.nomeDash.localeCompare(b.nomeDash));
  
        setDashboards(dashboardsArray);
  
        // Consulta para obter o urlBase da coleção organization
        const organizationDocQuery = query(collection(firestore, 'organization'), where('userId', '==', userId));
        const organizationDocSnapshot = await getDocs(organizationDocQuery);
  
        let organizationData = null;
  
        if (organizationDocSnapshot.docs.length > 0) {
          const organizationDoc = organizationDocSnapshot.docs[0];
          organizationData = organizationDoc.exists() ? organizationDoc.data() : null;
        }
  
        if (organizationData) {
          setUrlBase(organizationData.urlBase);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoadingDashboards(false); // Desativa o spinner após o carregamento
        console.log('Desativa o spinner após o carregamento');  
      }
    };
  
    fetchDashboards();
  }, [userId]);

  const handleCloseTutorial = () => {
    setIsTutorialOpen(false);
    // Salva a informação no localStorage para indicar que o tutorial foi visualizado
    localStorage.setItem('tutorialDashViewed', JSON.stringify(true));
  };

  useEffect(() => {
    // Verifica se a chave 'tutorialDashViewed' existe no localStorage
    const tutorialDashViewed = localStorage.getItem('tutorialDashViewed');
    // Se o tutorial já foi visualizado, fecha o tutorial
    if (tutorialDashViewed) {
      setIsTutorialOpen(false);
    }
  }, []);
  
  const handleMenuClick = (dashboardId) => {
    console.log('handleMenuClick triggered with dashboardId:', dashboardId);

    setDashboardPopovers((prev) => ({
      ...prev,
      [dashboardId]: !prev[dashboardId],
    }));
  };


  // Alteração: Função para fechar o popover do dashboard específico
  const handleClosePopover = (dashboardId) => {
    setSelectedCard(null);
    // Atualizar o estado dashboardPopovers apenas para este dashboard
    setDashboardPopovers((prev) => ({ ...prev, [dashboardId]: false }));
  };

  const handleShare = (dashboardId) => {
    // Lógica para compartilhar
    console.log(`Compartilhar o dashboard com ID: ${dashboardId}`);
  };

  const removeDashboard = async (dashboardId) => {
    let dashControllerSnapshot;
  
    try {
      const firestore = getFirestore();
  
      setIsLoadingDelete(true); // Ativa o spinner durante a exclusão
  
      // Delete from dashcontroller collection first
      const dashControllerQuery = query(collection(firestore, 'dashcontroller'), where('dashboardId', '==', dashboardId));
      dashControllerSnapshot = await getDocs(dashControllerQuery);
  
      console.log(`Encontrados ${dashControllerSnapshot.size} documentos na coleção "dashcontroller" associados ao dashboard com ID: ${dashboardId}`);
  
      await Promise.all(dashControllerSnapshot.docs.map(async (doc) => {
        console.log('Tentando excluir documento da coleção "dashcontroller" com ID:', doc.id);
        await deleteDoc(doc.ref);
        console.log('Documento excluído com sucesso da coleção "dashcontroller".');
      }));
  
      // Delete from dashboards collection
      console.log('Tentando excluir dashboard da coleção "dashboards" com ID:', dashboardId);
      const dashboardsQuery = query(collection(firestore, 'dashboards'), where('dashboardId', '==', dashboardId));
      const dashboardsSnapshot = await getDocs(dashboardsQuery);
  
      if (!dashboardsSnapshot.empty) {
        const dashboardRef = dashboardsSnapshot.docs[0].ref;
        await deleteDoc(dashboardRef);
        console.log('Dashboard excluído com sucesso da coleção "dashboards".', dashboardId);
      } else {
        console.log(`Dashboard com ID ${dashboardId} não encontrado na coleção "dashboards".`);
      }
  
      // Update state or perform any other necessary actions
      setDashboards((prevDashboards) => prevDashboards.filter((dashboard) => dashboard.dashboardId !== dashboardId));
      setSelectedCard(null);
  
      console.log(`Dashboard removido com ID: ${dashboardId}`);
    } catch (error) {
      console.error('Erro ao remover dashboard:', error);
    } finally {
      setIsLoadingDelete(false); // Desativa o spinner após a exclusão
    }
  };
  
  
  

  const handleDelete = (dashboardId) => {
    // Close the popover
    setDashboardPopovers((prev) => ({ ...prev, [dashboardId]: false }));
  
    // Toggle the confirmation dialog and set loading state to true
    setIsConfirmationOpen(true);
    setIsLoadingDelete(false); // Set to false initially
    setSelectedCard(dashboardId);
  };

  const confirmDelete = async () => {
    setIsLoadingDelete(true); // Set loading state when the button is clicked

    try {
      // Check if the entered text is 'excluir' (case-insensitive)
      if (confirmationText.trim().toLowerCase() === 'excluir') {
        // Show loader during deletion process
        setIsLoadingDelete(true);
  
        // Proceed with deletion
        await removeDashboard(selectedCard);
  
        // Close the confirmation dialog
        setIsConfirmationOpen(false);
        setConfirmationText('');
      } else {
        // Show an alert or handle the incorrect confirmation text
        alert('Confirmação incorreta. O dashboard não foi excluído.');
      }
    } catch (error) {
      console.error('Erro durante a exclusão:', error);
      // Handle the error as needed
    } finally {
      // Hide loader after deletion process completes (whether successful or not)
      setIsLoadingDelete(false);
    }
  };
  return (
    <Layout>
      {isTutorialOpen && <TutorialModal onClose={handleCloseTutorial} />}
      <div className='dashboard-page' id='dashboard'>
        <div className='dashboard-content'>

          <div className='hd-DashboardPage'>         
            <h1>Meus ePlanos</h1>
            <div className='busca'>              
              <input
                  type='text'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder='Buscar ePlano'
                />
            </div>
          </div>
            
          <section className='section-content'>

            <div onClick={openModal} className='dashboard-box create-new-dashboard'>
              <div class='plusAddDash'>
                <FaPlusCircle />
              </div>
              <div className='dashboard-info'>
                <span className='dashboard-name'>Criar Novo ePlano</span>
                <Link to='' className='ver-dash'>
                  Criar
                </Link>
              </div>
            </div>
            {(isLoadingDashboards) && (
                <div className='loader-dash'>
                  <Spinner />
                </div>
              )}


            {dashboards
              .filter((dashboard) =>
                dashboard.nomeDash.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((dashboard) => (
                <div key={dashboard.id} className='dashboard-box'>
              <div className="card-menu" onClick={() => {
                console.log('Chamando handleMenuClick com dashboard.dashboardId:', dashboard.dashboardId);
                handleMenuClick(dashboard.dashboardId);
              }}>
              <RiMoreFill /> 
            </div>
            
            {dashboardPopovers[dashboard.dashboardId] && (
                  <div>
                    <div className="popover">
                      <ul>
                        <li onClick={() => handleShare(dashboard.dashboardId)}>
                          Compartilhar ePlano
                        </li>
                        <li onClick={() => handleDelete(dashboard.dashboardId)}>
                          Excluir ePlano
                        </li>
                      </ul>
                    </div>
                    <div onClick={() => handleClosePopover(dashboard.dashboardId)} className='overlay'></div>
                  </div>
                )}
                <Link to={`/meu-eplano/${urlBase}/${dashboard.dashboardId}/${dashboard.urlDash}`}>                
                  <img src="https://eplano.s3.sa-east-1.amazonaws.com/banner_1.webp" alt="Imagem de fundo" />
                <div className='dashboard-info'>
                  <span className='dashboard-name'>{dashboard.nomeDash}</span>
                  <Link to={`/meu-eplano/${urlBase}/${dashboard.dashboardId}/${dashboard.urlDash}`} className='ver-dash'>
                    Ver ePlano
                  </Link>
                </div>
                </Link>
              </div>
            ))}
            {isModalOpen && (
              <div>
                <div className='overlay'></div>
                  <div className='modal'>
                    <div className='modal-content'>
                      <span className='close' onClick={closeModal}>
                        <FaTimes />
                      </span>
                      <h2>Criar novo ePlano</h2>
                      <input
                        type='text'
                        value={newDashboardName}
                        onChange={handleNameChange}
                        placeholder='Nome do ePlano'
                      />
<div className='footer-modal'>
  {isLoadingDashboards ? (
    <Spinner />
  ) : (
    <button onClick={() => {
      setIsLoadingDashboards(true);  // Set loading state for dashboard creation
      createNewDashboard();
    }}>Criar ePlano</button>
  )}
</div>



                    </div>
                  </div>
              </div>
            )}
            
            {isConfirmationOpen && (
              <div>
                <div className='overlay'></div>
                <div className='modal'>
                    <span className='close' onClick={() => setIsConfirmationOpen(false)}>
                      <FaTimes />
                    </span>
                  <div className='modal-content'>
                    <h2>Excluir este ePlano?</h2>
                    <p>Todos as suas configurações serão excluídos do ePlano. Isto não poderá ser desfeito.</p>
                   
                    <input
                      type='text'
                      value={confirmationText}
                      onChange={(e) => setConfirmationText(e.target.value)}
                      placeholder='excluir'
                    />
                     <p class='info'>Para confirmar a exclusão do ePlano, digite "excluir" no campo acima</p>
                      <div className='footer-modal'>
                        {isLoadingDelete ? (
                          <Spinner />
                        ) : (
                          <button className='red' onClick={() => {
                            setIsLoadingDelete(true);  // Set loading state
                            confirmDelete();
                          }}>Excluir ePlano</button>
                        )}
                        <Link onClick={() => setIsConfirmationOpen(false)}>Cancelar e voltar</Link>
                      </div>


                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
