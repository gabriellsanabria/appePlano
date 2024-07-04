// Company.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { doc, getFirestore, getDoc } from 'firebase/firestore';
import Layout from '../../components/Layout/layout';
import { addDoc, collection, query, where, getDocs, updateDoc} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { RiMoreFill } from 'react-icons/ri';
import { FaPlusCircle,FaTimes } from "react-icons/fa";
import './CompanyUsers.scss';

const CompanyUsers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [organizationId, setOrganizationId] = useState(null);
  const [usersList, setUsersList] = useState([]);
  const [totalUsersAllowed, setTotalUsersAllowed] = useState(0);
  const [adminuserId, setAdminuserId] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(1); // Estado para controlar o status selecionado

  const handleChangeStatus = (e) => {
    setSelectedStatus(parseInt(e.target.value, 10)); // Converte o valor para número
  };
  
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

    // Estados para armazenar dados da empresa
    const [companyData, setCompanyData] = useState({
        companyName: '',  
        urlBase: '',
      });
      
  
    // Função para atualizar dados da empresa
const updateCompanyData = (field, value) => {
  if (field === 'whatsapp') {
    // Formata o WhatsApp removendo caracteres não numéricos e aplicando a máscara (xx)xxxxx-xxxx
    const formattedWhatsApp = value.replace(/\D/g, '').replace(/(\d{2})(\d{5})(\d{4})/, '($1)$2-$3');
    setCompanyData((prevData) => ({
      ...prevData,
      [field]: formattedWhatsApp,
    }));
  } else {
    setCompanyData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  }
};
  
    // Função para buscar dados da coleção "organization"
    const fetchOrganizationData = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
  
      if (user) {
        const firestore = getFirestore();
        const organizationsCollectionRef = collection(firestore, 'organization');
        const organizationsQuery = query(organizationsCollectionRef, where('userId', '==', user.uid));
  
        try {
          const organizationsSnapshot = await getDocs(organizationsQuery);
  
          if (organizationsSnapshot.docs.length > 0) {
            const orgData = organizationsSnapshot.docs[0].data();
            const companyName = orgData.companyName || '';
            const urlBase = orgData.urlBase || '';
            const organizationId = organizationsSnapshot.docs[0].id; // Obtenha o ID do documento
            
            setOrganizationId(organizationId); // Atualize o estado com o ID da organização
  
            updateCompanyData('companyName', companyName);
            updateCompanyData('urlBase', urlBase);
            console.log('Nome da Empresa:', companyName);
            console.log('orgData:', orgData);
            console.log('companyName from orgData:', orgData.companyName);
            console.log('Organization ID:', organizationId);
            setTotalUsersAllowed(orgData.totalUsersAllowed || 0);
            setAdminuserId(orgData.adminuserId || null); // Atualize o estado com o ID do usuário admin
            console.log('Admin User ID:', adminuserId);
          } else {
            console.log('Nenhuma organização encontrada para o usuário no Firestore');
          }
        } catch (error) {
          console.error('Erro ao buscar dados da organização:', error);
        }
      } else {
        console.log('Usuário não está logado.');
      }
    };
    
  
    useEffect(() => {
      fetchOrganizationData();
    }, []);

    useEffect(() => {
      fetchOrganizationData();
    }, []);

    const handleSubmit = async (e) => {
      e.preventDefault();
    
      try {
        const auth = getAuth();
        const user = auth.currentUser;
    
        if (!user) {
          console.log('Usuário não está logado.');
          return;
        }
    
        const firestore = getFirestore();
        const usersCollectionRef = collection(firestore, 'users');
        const profileCollectionRef = collection(firestore, 'profile');
    
        // Verifica se o e-mail já existe na coleção 'users'
        const existingUserQuery = query(usersCollectionRef, where('emailUsuario', '==', companyData.emailUsuario));
        const existingUserSnapshot = await getDocs(existingUserQuery);
    
        if (!existingUserSnapshot.empty) {
          // Emite um alerta se o e-mail já existir
          alert('Esse usuário já está cadastrado em uma conta de outra empresa! Tente outro e-mail');
          return;
        }
    
        // Crie um documento na coleção "users" com nome, email e organizationId
        const userDocRef = await addDoc(usersCollectionRef, {
          nomeUsuario: companyData.nomeUsuario,
          emailUsuario: companyData.emailUsuario,
          firstAccess: 1,
          organizationId: organizationId,
        });
    
        // Obtenha o ID do documento recém-criado na coleção 'users'
        const newuserId = userDocRef.id;
    
        // Atualize o documento na coleção 'users' com o UID
        await updateDoc(doc(firestore, 'users', newuserId), {
          userId: newuserId,
        });
    
        // Crie um documento na coleção "profile" com os dados adicionais, incluindo o WhatsApp formatado
        await addDoc(profileCollectionRef, {
          organizationId: organizationId,
          status: 3,
          userId: newuserId,
          userType: 2,
        });
    
        console.log('Usuário cadastrado com sucesso!');
        // Fecha o modal após cadastrar um novo usuário
        closeModal();
    
        // Atualiza a lista de usuários com o novo usuário cadastrado após um pequeno atraso
        setTimeout(() => {
          fetchUsersList();
        }, 300); // Ajuste o valor do tempo de atraso conforme necessário
      } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
      }
    };

    const fetchUsersList = async () => {
      try {
        const firestore = getFirestore();
        const profileCollectionRef = collection(firestore, 'profile');
        const usersQuery = query(profileCollectionRef, where('organizationId', '==', organizationId));
    
        const usersSnapshot = await getDocs(usersQuery);
    
        if (usersSnapshot.docs.length > 0) {
          const userListData = await Promise.all(usersSnapshot.docs.map(async (doc) => {
            const userData = await getUserDataByUID(doc.data().userId);
            const userTypeLabel = getUserTypeLabel(doc.data().userType);
    
    
            return {
              id: doc.id,
              ...doc.data(),
              nomeUsuario: userData.nomeUsuario,
              emailUsuario: userData.emailUsuario,
              status: getRoleByStatus(doc.data().status),
              userType: userTypeLabel,
            };
          }));

            // Adiciona a classe fadeIn ao novo usuário
            const newUserIndex = userListData.findIndex(user => !usersList.some(existingUser => existingUser.id === user.id));
            if (newUserIndex !== -1) {
              userListData[newUserIndex].fadeIn = true;
            }

            setUsersList(userListData);
          } else {
            console.log('Nenhum usuário encontrado para esta organização.');
          }
      } catch (error) {
        console.error('Erro ao buscar a lista de usuários:', error);
      }
    };
    
    const getUserTypeLabel = (userType) => {
      console.log('Valor de userType recebido:', userType); // Adicionando o console.log
    
      // Ajuste essa lógica conforme necessário
      return userType === 1 ? 'Admin' : (userType === 2 ? 'Colaborador' : 'Tipo de Usuário Não Definido');
    };
    
    
    const getUserDataByUID = async (userId) => {
      const firestore = getFirestore();
      const usersCollectionRef = collection(firestore, 'users');
      const userDoc = await getDoc(doc(usersCollectionRef, userId));
    
      if (userDoc.exists()) {
        return userDoc.data();
      } else {
        console.log('Usuário não encontrado na coleção "users" com o UID:', userId);
        return {};
      }
    };
    
    const getRoleByStatus = (status) => {
      // Ajuste essa lógica conforme necessário
      return status === 1 ? 'Ativo' : status === 0 ? 'Desativado' : 'Status Não Definido';
    };
    
    // Restante do seu código permanece o mesmo
    

    useEffect(() => {
      fetchUsersList();
    }, [organizationId]);

 // Renderização da tabela de usuários
 const renderUsersTable = () => {
  const sortedUsersList = [...usersList].sort((a, b) => {
    if (a.userType === 'Admin') {
      return -1;
    } else if (b.userType === 'Admin') {
      return 1;
    }
    return 0;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Nome Completo</th>
          <th>E-mail</th>
          <th>Status</th>
          <th>Tipo de Usuário</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {sortedUsersList.map((user) => (
          <tr key={user.id} className={user.fadeIn ? 'fadeIn' : ''} style={{ backgroundColor: user.userType === 'Admin' ? 'lightblue' : 'white' }}>
            <td>{user.nomeUsuario}</td>
            <td>{user.emailUsuario}</td>
            {/* <td>{renderStatusSelect(user.id, user.status, user.userType)}</td> */}
            <td>{user.status}</td>
            <td>{user.userType}</td>
            <td>{renderStatusButtons(user.id, user.status, user.userType)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// Renderização do botão na tabela de usuários
const renderStatusButtons = (userId, status, userType) => {
  if (userType === 'Admin') {
    return <span>-</span>; // Se for Admin, apenas exibe um marcador
  }

  const handleActivate = () => {
    handleUpdateStatus(userId, 1);
  };

  const handleDeactivate = () => {
    handleUpdateStatus(userId, 0);
  };

  return (
    <div>
      {status === 'Desativado' ? (
        <button className='actions' onClick={handleActivate} disabled={status === 1}>
          Ativar
        </button>
      ) : (
        <button className='actions red' onClick={handleDeactivate} disabled={status === 0}>
          Desativar
        </button>
      )}
    </div>
  );
};


const handleUpdateStatus = async (userId, newStatus) => {
  try {
    const firestore = getFirestore();
    const profileDocRef = doc(firestore, 'profile', userId);

    await updateDoc(profileDocRef, {
      status: Number(newStatus),
    });

    // Atualiza a lista de usuários após a atualização do status
    fetchUsersList();
  } catch (error) {
    console.error('Erro ao atualizar status:', error);
  }
};
    return (
      <Layout>
        <div className='dashboard-page' id='CompanyUsers'>
          <div className='dashboard-content'>
            <div className="page">
              <h2>Gerenciar usuários</h2>

            
              <div className='hd-dashboard'>
                <div className='botao_add_widget'>
                  <div className='primary-button primary-color' onClick={openModal}>
                    + Adicionar Usuários
                  </div>
                </div>
              </div>

<div>

<p>
                Total de usuários cadastrados: {usersList.length}
              </p>
              <p>
                Total de usuários permitidos: {totalUsersAllowed}
              </p>
</div>
              
              {renderUsersTable()}


              {isModalOpen && (
              <div>
              <div className='overlay' onClick={closeModal}></div>
                <div className='modal'>
                    <span className='close' onClick={closeModal}>
                      <FaTimes />
                    </span>
                  <div className='modal-content'>
                    <h2>Criar novo usuário</h2>                    
                    <form onSubmit={handleSubmit} className="form-columns">
                        <div className="form-controle">
                          <div className='form-column label'>
                            <label>Nome completo</label>
                          </div>
                          <div className='form-column input'>
                            <input
                              type='text'
                              value={companyData.nomeUsuario}
                              onChange={(e) => updateCompanyData('nomeUsuario', e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="form-controle">
                          <div className='form-column label'>
                            <label>E-mail</label>
                          </div>
                          <div className='form-column input'>
                            <input
                              type='email'
                              value={companyData.emailUsuario} 
                              onChange={(e) => updateCompanyData('emailUsuario', e.target.value)}
                            />
                          </div>
                        </div>
                        
                        <hr />
                        <div className="form-controle">
                          <button type="submit">Salvar</button>
                        </div>
                      </form>
                   
                    <div className='footer-modal'>                      
                      
                    </div>
                  </div>
                </div>
              </div>
              )}
            </div>
          </div>
        </div>
      </Layout>
    );
  };
  
  export default CompanyUsers;