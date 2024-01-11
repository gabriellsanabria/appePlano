// Header.js
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Header.scss';
import getTitle from '../../utils/getTitleUtil';
import useAuth from '../../hooks/useAuth';
import { logoutUser } from '../../helpers/firebaseUtils';
import RegistraNome from '../../views/MinhaConta/RegistraNome';
import { getFirestore, collection, doc, getDoc, query, where, getDocs } from 'firebase/firestore';
import Modal from 'react-modal'; // Importe o componente Modal
import { BsBuilding, BsPerson, BsPeople, BsFileText, BsQuestionCircle, BsPower, BsBell } from 'react-icons/bs';
import { IoMdNotifications } from "react-icons/io";

const Header = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const { user } = useAuth();
  const navigate = useNavigate();
  const [popoverVisible, setPopoverVisible] = useState(false);
  const userName = sessionStorage.getItem('userName') || '';
  const [userEmpresa, setUserEmpresa] = useState(null); // Estado para armazenar dados da empresa do usuário
  const [loading, setLoading] = useState(true);

  const togglePopover = () => {
    setPopoverVisible(!popoverVisible);
  };

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      width:'32%',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  const closePopover = () => {
    setPopoverVisible(false);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = async () => {
    await logoutUser();
    navigate('/auth'); // Substitua history.push por navigate
  };

  

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) {
        return;
      }
  
      const firestore = getFirestore();
      const userDocRef = doc(firestore, 'users', user.uid);
  
      try {
        const userDocSnapshot = await getDoc(userDocRef);
  
        if (!userDocSnapshot.exists()) {
          console.log('Documento do usuário não encontrado no Firestore');
          return;
        }
  
        const userData = userDocSnapshot.data();
        const userNameFromData = userData.nome || '';
  
        if (!userData.nome) {
          navigate('/complete-cadastro');
          console.log('User name from Firestore:', userData.nome);
          return;
        }
  
        // Save the user name in session storage
        sessionStorage.setItem('userName', userNameFromData);
  
        // Verifique se há uma empresa associada a esse user.id na coleção "organization"
        const organizationCollectionRef = collection(firestore, 'organization');
        const organizationQuery = query(organizationCollectionRef, where('userId', '==', user.uid));
  
        const organizationDocs = await getDocs(organizationQuery);
        if (organizationDocs.size === 0) {
          // Se não houver empresa associada, redirecione para '/complete-cadastro'
          navigate('/complete-cadastro');
          return;
        }
  
        // Assumindo que só há uma empresa associada, você pode acessar seus dados assim:
        const organizationData = organizationDocs.docs[0].data();
        console.log('Organization data from Firestore:', organizationData);
  
        // Agora, verifique se há um perfil associado a esse usuário na coleção "profile"
        const profileCollectionRef = collection(firestore, 'profile');
        const profileQuery = query(profileCollectionRef, where('userID', '==', user.uid));
  
        const profileDocs = await getDocs(profileQuery);
        console.log('Number of profile documents:', profileDocs.size);
        
        if (profileDocs.size === 0) {
          console.log('Nenhum perfil encontrado para o usuário.');
          console.log('Nenhum perfil encontrado para o usuário.', 'User ID:', user.uid);
          navigate('/complete-cadastro');
          return;
        }
  
        // Assumindo que só há um perfil associado, você pode acessar seus dados assim:
        const profileData = profileDocs.docs[0].data();
        console.log('Profile data from Firestore:', profileData);
  
        // Agora você tem tanto os dados do usuário quanto da empresa e do perfil
        // Faça o que precisar com esses dados
  
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchUserData();
  }, [user]);
  
  

  const closeModal = () => {
    setIsModalOpen(false);
  };

  function getInitials(name) {
    const initials = name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase();
    return initials || '👤'; // Use '👤' se as iniciais não estiverem disponíveis
  }

  const title = getTitle(pathname);

  return (
    <div className="header">
      <div className="header-content">
        <div className="title">{title}</div>
        <div className="icons">
          <div className="notifications-icon">
            <IoMdNotifications />
          </div>
          <div className='userSession'>
            <div className="avatar" onClick={togglePopover}>
              <div className="user-name">Olá, {userName}</div>
              <div className="user-photo-container">
                {user && user.photoURL ? (
                  <img className="user-photo" src={user.photoURL} alt="Avatar" />
                ) : (
                  <div className="default-avatar">{getInitials(userName)}</div>
                )}
              </div>
              
            </div>
            
          </div>
            {popoverVisible && (
              <div>
              {/* Overlay escuro */}
              <div className="overlay" onClick={closePopover}></div>
            
              {/* Popover com opções */}
              <div className="popover">
                <div className="popover-title">
                  <BsBuilding />Administração</div>
                {userEmpresa && (
                  <div className="popover-option">
                    <BsBuilding />
                    <Link to={`/empresa/${userEmpresa.id}`}>Minha Empresa</Link>
                  </div>
                )}
                <div className="popover-option">
                  <Link to="/minha-conta">Minha Conta</Link>
                </div>
                <div className="popover-option">
                  <Link to="/company">Minha Empresa</Link>
                </div>
                <div className="popover-option">
                  <Link to="/company/usuarios">Gerenciar Colaboradores</Link>
                </div>
                <hr/>
                <div className="popover-title">
                  <BsPeople />Meu Plano</div>
                <div className="popover-option">
                  <Link to="/financeiro">Contratar + ePlanos</Link>
                </div>
                <div className="popover-option">
                  <Link to="/financeiro">Contratar Usuários</Link>
                </div>
                <div className="popover-option">
                  <Link to="/financeiro">Alterar meu plano</Link>
                </div>
                <hr/>
                <div className="popover-title">
                  <BsFileText />Financeiro</div>
                <div className="popover-option">
                  <Link to="/financeiro">Painel Financeiro</Link>
                </div>
                <hr />
                <div className="popover-title">
                  <BsQuestionCircle />
                  Ajuda</div>
                <div className="popover-option">
                  <Link to="/minha-conta">Ajuda e Suporte</Link>
                </div>
                <hr />
                <div className="popover-option" onClick={handleLogout}>
                  <BsPower />
                  <Link to=''>Logout</Link>
                </div>
              </div>
            </div>
            )}
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        style={customStyles}
        contentLabel="Exemplo Modal"
      >
        <div>
          <RegistraNome />
        </div>
      </Modal>
    </div>
  );
};

export default Header;