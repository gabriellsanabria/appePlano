// Dashboard.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout/layout';
import TutorialModal from '../../components/TutorialModal/TutorialModal';
import CreateEPlanoModal from '../../components/CreateEPlanoModal/CreateEPlanoModal';
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
  const [newEPlanoName, setnewEPlanoName] = useState('');
  const [eplanos, seteplanos] = useState([]);
  const [isTutorialOpen, setIsTutorialOpen] = useState(true);

  const [selectedCard, setSelectedCard] = useState(null);
  const [dashboardPopovers, setDashboardPopovers] = useState({});

  const { user: authUser } = useAuth();
  const userId = authUser ? authUser.uid : '';
  const [urlBase, setUrlBase] = useState(null);

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [confirmationText, setConfirmationText] = useState('');

  const [isLoadingeplanos, setIsLoadingeplanos] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');

  const [organization, setOrganization] = useState({});


  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleNameChange = (event) => {
    setnewEPlanoName(event.target.value);
  };
  
  const createNewDashboard = async (newEPlanoName) => {
    try {
      console.log('Novo nome do ePlano:', newEPlanoName);

  
      const firestore = getFirestore();
      const eplanosCollectionRef = collection(firestore, 'eplanos');
  
      const urlEplano = newEPlanoName.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
  
      const ePlanoId = uuidv4().replace(/[^a-zA-Z0-9]/g, '').substring(0, 6);
  
      // Obtenha o ID da coleção 'organization'
      const organizationDocQuery = query(collection(firestore, 'organization'), where('userId', '==', userId));
      const organizationDocSnapshot = await getDocs(organizationDocQuery);
  
      let organizationId = null;
  
      if (organizationDocSnapshot.docs.length > 0) {
        const organizationDoc = organizationDocSnapshot.docs[0];
        organizationId = organizationDoc.exists() ? organizationDoc.id : null;
      }
  
      // Crie o novo dashboard com o ID da coleção 'organization'
      const newDashboardDocRef = await addDoc(eplanosCollectionRef, {
        nomeEplano: newEPlanoName,
        userId: userId,
        urlEplano: urlEplano,
        ePlanoId: ePlanoId,
        statusePlano: 0,
        organizationId: organizationId, // Novo campo organizationId
      });
  
      console.log('New dashboard created with ID:', newDashboardDocRef.id);
  
      seteplanos((preveplanos) => [
        ...preveplanos,
        { id: newDashboardDocRef.id, nomeEplano: newEPlanoName, urlEplano: urlEplano, ePlanoId: ePlanoId, organizationId: organizationId, statusePlano: 0 },
      ]);
  
      const ePlanosControleCollectionRef = collection(firestore, 'ePlanosControle');

      // Adicione um documento à coleção ePlanosControle
      const newEPlanoControleDocRef = await addDoc(ePlanosControleCollectionRef, {
        ePlanoId: ePlanoId, // Certifique-se de ter o ePlanoId disponível no escopo
        organizationId: organizationId, // Certifique-se de ter o organizationId disponível no escopo
        firstAccessEplano: 1, // Defina o valor desejado para firstAccessEplano
      });
      
      console.log('New document added to ePlanosControle with ID:', newEPlanoControleDocRef.id);
  
      setnewEPlanoName('');
      closeModal();
    } catch (error) {
      console.error('Error creating new dashboard:', error);
    }
  };
  
// Função para obter a classe de cor com base no status
const getSignageColor = (status) => {
  switch (status) {
    case 0:
      return 'naoIniciado'; // ou outra classe correspondente à cor para "Não Iniciado"
    case 1:
      return 'emAndamento'; // ou outra classe correspondente à cor para "Em Andamento"
    case 2:
      return 'concluido'; // ou outra classe correspondente à cor para "Concluído"
    default:
      return ''; // Adicione um valor padrão ou lide com outros casos, se necessário
  }
};

// Função para obter o texto do status com base no valor
const getStatusText = (status) => {
  switch (status) {
    case 0:
      return 'Não Iniciado';
    case 1:
      return 'Em Andamento';
    case 2:
      return 'Concluído';
    default:
      return ''; // Adicione um valor padrão ou lide com outros casos, se necessário
  }
};


  useEffect(() => {
    const fetcheplanos = async () => {
      try {
        setIsLoadingeplanos(true); // Ativa o spinner
  
        console.log('Ativou spinner');  
        const firestore = getFirestore();
  
        // Consulta para obter os eplanos
        const eplanosCollectionRef = collection(firestore, 'eplanos');
      
      const querySnapshot = await getDocs(
        query(eplanosCollectionRef, where('userId', '==', userId))
      );

      const eplanosArray = querySnapshot.docs
        .map((doc) => ({ ePlanoId: doc.id, ...doc.data() }))
        .sort((a, b) => a.nomeEplano.localeCompare(b.nomeEplano));

      seteplanos(eplanosArray);

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
        setOrganization(organizationData); // Atualiza o estado com os detalhes da organização
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoadingeplanos(false); // Desativa o spinner após o carregamento
    }
  };

  fetcheplanos();
}, [userId]);
  const tutorialViewed = '001'
  const handleCloseTutorial = () => {
    setIsTutorialOpen(false);
    // Salva a informação no localStorage para indicar que o tutorial foi visualizado
    localStorage.setItem(tutorialViewed, JSON.stringify(true));
  };

  useEffect(() => {
    // Verifica se a chave tutorialViewed existe no localStorage
    const tutorialViewedVar = localStorage.getItem(tutorialViewed);
    // Se o tutorial já foi visualizado, fecha o tutorial
    if (tutorialViewedVar) {
      setIsTutorialOpen(false);
    }
  }, []);
  
  const handleMenuClick = (ePlanoId) => {
    console.log('handleMenuClick triggered with ePlanoId:', ePlanoId);

    setDashboardPopovers((prev) => ({
      ...prev,
      [ePlanoId]: !prev[ePlanoId],
    }));
  };


  // Alteração: Função para fechar o popover do dashboard específico
  const handleClosePopover = (ePlanoId) => {
    setSelectedCard(null);
    // Atualizar o estado dashboardPopovers apenas para este dashboard
    setDashboardPopovers((prev) => ({ ...prev, [ePlanoId]: false }));
  };

  const handleShare = (ePlanoId) => {
    // Lógica para compartilhar
    console.log(`Compartilhar o dashboard com ID: ${ePlanoId}`);
  };

  const removeEplano = async (ePlanoId) => {
    let dashControllerSnapshot;
  
    try {
      const firestore = getFirestore();
  
      setIsLoadingDelete(true); // Ativa o spinner durante a exclusão
  
      // Delete from dashcontroller collection first
      const dashControllerQuery = query(collection(firestore, 'dashcontroller'), where('ePlanoId', '==', ePlanoId));
      dashControllerSnapshot = await getDocs(dashControllerQuery);
  
      console.log(`Encontrados ${dashControllerSnapshot.size} documentos na coleção "dashcontroller" associados ao dashboard com ID: ${ePlanoId}`);
  
      await Promise.all(dashControllerSnapshot.docs.map(async (doc) => {
        console.log('Tentando excluir documento da coleção "dashcontroller" com ID:', doc.id);
        await deleteDoc(doc.ref);
        console.log('Documento excluído com sucesso da coleção "dashcontroller".');
      }));
  
      // Delete from eplanos collection
      console.log('Tentando excluir dashboard da coleção "eplanos" com ID:', ePlanoId);
      const eplanosQuery = query(collection(firestore, 'eplanos'), where('ePlanoId', '==', ePlanoId));
      const eplanosSnapshot = await getDocs(eplanosQuery);
  
      if (!eplanosSnapshot.empty) {
        const dashboardRef = eplanosSnapshot.docs[0].ref;
        await deleteDoc(dashboardRef);
        console.log('Dashboard excluído com sucesso da coleção "eplanos".', ePlanoId);
      } else {
        console.log(`Dashboard com ID ${ePlanoId} não encontrado na coleção "eplanos".`);
      }
  
      // Update state or perform any other necessary actions
      seteplanos((preveplanos) => preveplanos.filter((dashboard) => dashboard.ePlanoId !== ePlanoId));
      setSelectedCard(null);
  
      console.log(`Dashboard removido com ID: ${ePlanoId}`);
    } catch (error) {
      console.error('Erro ao remover dashboard:', error);
    } finally {
      setIsLoadingDelete(false); // Desativa o spinner após a exclusão
    }
  };
  
  
  

  const handleDelete = (ePlanoId) => {
    // Close the popover
    setDashboardPopovers((prev) => ({ ...prev, [ePlanoId]: false }));
  
    // Toggle the confirmation dialog and set loading state to true
    setIsConfirmationOpen(true);
    setIsLoadingDelete(false); // Set to false initially
    setSelectedCard(ePlanoId);
  };

  const confirmDelete = async () => {
    setIsLoadingDelete(true); // Set loading state when the button is clicked

    try {
      // Check if the entered text is 'excluir' (case-insensitive)
      if (confirmationText.trim().toLowerCase() === 'excluir') {
        // Show loader during deletion process
        setIsLoadingDelete(true);
  
        // Proceed with deletion
        await removeEplano(selectedCard);
  
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
            <div className='busca'>              
              <input
                  type='text'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder='Buscar ePlano'
                />
            </div>
            <div className='botao'>              
              <div className='primary-button primary-color' onClick={openModal}>
                + Criar ePlano
              </div>
            </div>
          </div>
            
          <section className='section-content'>

            {/* <div onClick={openModal} className='dashboard-box create-new-dashboard'>
              <div class='plusAddDash'>
                <FaPlusCircle />
              </div>
              <div className='dashboard-info'>
                <span className='dashboard-name'>Criar Novo ePlano</span>
                <Link to='' className='ver-dash'>
                  Criar
                </Link>
              </div>
            </div> */}
            {(isLoadingeplanos) && (
                <div className='loader-dash'>
                  <Spinner />
                </div>
              )}


            {eplanos
              .filter((ePlano) =>
                ePlano.nomeEplano.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((ePlano) => (
                <div key={ePlano.id} className='dashboard-box'>
              <div className="card-menu" onClick={() => {
                console.log('Chamando handleMenuClick com dashboard.ePlanoId:', ePlano.ePlanoId);
                handleMenuClick(ePlano.ePlanoId);
              }}>
              <RiMoreFill /> 
            </div>
            
            {dashboardPopovers[ePlano.ePlanoId] && (
                  <div>
                    <div className="popover">
                      <ul>
                        <li onClick={() => handleShare(ePlano.ePlanoId)}>
                          Compartilhar ePlano
                        </li>
                        <li onClick={() => handleDelete(ePlano.ePlanoId)}>
                          Excluir ePlano
                        </li>
                      </ul>
                    </div>
                    <div onClick={() => handleClosePopover(ePlano.ePlanoId)} className='overlay'></div>
                  </div>
                )}
                <Link to={`/meu-eplano/${urlBase}/${ePlano.ePlanoId}/${ePlano.urlEplano}`}>                
                  
                  <img src="https://eplano.s3.sa-east-1.amazonaws.com/banner_1.webp" alt="Imagem de fundo" />
                  
                  <div className='dashboard-info'>
                    <div className='infos'>                      
                      <div className='logoEmpresa'>
                        <img src='https://eplano.s3.sa-east-1.amazonaws.com/logo_E_eplano.webp' alt="Logo" />
                      </div>

                      <div className='dashboard-name'>
                        <div className='titulo'>
                          {ePlano.nomeEplano}
                        </div>
                        <div className='nomeEmpresa'>
                          {organization.companyName}
                        </div>
                      </div>
                    </div>
                    <hr/>
                    <div className='infos'>
                      <div className='statusEplano'>
                        <span className={`signage ${getSignageColor(ePlano.statusePlano)}`}></span>
                        <div className='signage-text'>{getStatusText(ePlano.statusePlano)}</div>
                      </div>
                    </div>
                    
                  </div>
                </Link>
              </div>
            ))}
            <CreateEPlanoModal isOpen={isModalOpen} onClose={closeModal} onCreate={createNewDashboard} />
            
            
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
