// UsersRegistration.js

import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/layout';
import { getFirestore, collection, addDoc, setDoc, doc, query, where, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const UsersRegistration = () => {
  const [userData, setUserData] = useState({
    nome: '',
    email: '',
    cargo: '',
    setor: '',
    whatsapp: '',
  });

  const [organizationId, setOrganizationId] = useState(''); // Você precisa obter o ID da organização correspondente
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
          const organizationId = orgData.organizationId || ''; // Change 'organizationId' to the actual field name in your Firestore document
          
          // Set the organizationId in the component state
          setOrganizationId(organizationId);

          // ... (previous code)
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

  // Efeito para buscar dados da organização ao montar o componente
  useEffect(() => {
    fetchOrganizationData();
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const auth = getAuth();
    const user = auth.currentUser;
  
    if (user) {
      try {
        const firestore = getFirestore();
  
        // Adiciona dados do usuário à coleção 'users'
        const usersCollectionRef = collection(firestore, 'users');
        const newUserRef = await addDoc(usersCollectionRef, {
          nome: userData.nome,
          email: userData.email,
          organizationId: organizationId,
        });
  
        // Adiciona dados do perfil à coleção 'profile' usando o ID do novo usuário como userId
        const profileCollectionRef = collection(firestore, 'profile');
  
        // Imprima o organizationId para verificar se está vindo corretamente
        console.log('organizationId:', organizationId);
  
        await setDoc(doc(profileCollectionRef, newUserRef.id), {
          cargo: userData.cargo,
          setor: userData.setor,
          userId: newUserRef.id, // Usando o ID do novo usuário como userId
          whatsapp: userData.whatsapp,
          organizationId: organizationId, // Adiciona o organizationId à coleção 'profile'
        });
  
        console.log('Usuário cadastrado com sucesso!');
        // Limpa os campos após o cadastro
        setUserData({
          nome: '',
          email: '',
          cargo: '',
          setor: '',
          whatsapp: '',
        });
      } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
      }
    } else {
      console.log('Usuário não está logado.');
    }
  };
  

  return (
    <Layout>
      <div className='dashboard-page'>
        <div className='dashboard-content'>
          <h2>Cadastrar Usuário</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Nome:
              <input
                type='text'
                name='nome'
                value={userData.nome}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Email:
              <input
                type='email'
                name='email'
                value={userData.email}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Cargo:
              <input
                type='text'
                name='cargo'
                value={userData.cargo}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Setor:
              <input
                type='text'
                name='setor'
                value={userData.setor}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Whatsapp:
              <input
                type='text'
                name='whatsapp'
                value={userData.whatsapp}
                onChange={handleChange}
                required
              />
            </label>
            <button type='submit'>Cadastrar Usuário</button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default UsersRegistration;
