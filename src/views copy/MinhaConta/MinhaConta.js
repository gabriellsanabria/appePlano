import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getFirestore, doc, getDoc, updateDoc, query, collection, where, getDocs} from 'firebase/firestore';
import firebaseApp from '../../config/firebaseConfig';

import Layout from '../../components/Layout/layout';
import useAuth from '../../hooks/useAuth';
import './MinhaConta.scss';

const EditarConta = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({
    nomeUsuario: '',
    emailUsuario: '',
    emailAdicional: '',
    // Adicione outros campos conforme necessário
  });

  const [organizationData, setOrganizationData] = useState([]);
  const auth = user;

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const db = getFirestore(firebaseApp);

        // Consulta para obter as empresas onde o userId é igual ao user.uid
        const q = query(collection(db, 'organization'), where('userId', '==', user.uid));

        const organizationSnapshot = await getDocs(q);

        console.log('organizationSnapshot:', organizationSnapshot.docs);

        const organizationDataArray = organizationSnapshot.docs.map((doc) => doc.data().companyName);
        console.log('organizationDataArray:', organizationDataArray);
        
        setOrganizationData(organizationDataArray);
      } catch (error) {
        console.error('Erro ao obter dados da coleção organization:', error);
      }
    };

    fetchCompany();
  }, [user]);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
  
      if (user) {
        const firestore = getFirestore();
        const userDocRef = doc(firestore, 'users', user.uid);
  
        try {
          const userDocSnapshot = await getDoc(userDocRef);
  
          if (userDocSnapshot.exists()) {
            const userDataFromFirestore = userDocSnapshot.data();
            setUserData(userDataFromFirestore);
  
            // Se a organização estiver armazenada no documento do usuário
            if (userDataFromFirestore.organizacao) {
              console.log('Organização associada:', userDataFromFirestore.organizacao);
            } else {
              console.log('Organização não encontrada nos dados do usuário');
            }
          } else {
            console.log('Documento do usuário não encontrado no Firestore');
          }
        } catch (error) {
          console.error('Erro ao buscar dados do usuário:', error);
        } finally {
          setLoading(false);
        }
      }
    };
  
    fetchUserData();
  }, [user]);

  const handleEditAccount = async (e) => {
    e.preventDefault();

    // Implemente a lógica para enviar os dados atualizados para o Firestore
    if (user) {
      const firestore = getFirestore();
      const userDocRef = doc(firestore, 'users', user.uid);

      try {
        // Certifique-se de que userData.emailAdicional seja definido antes de passá-lo
        const updatedData = {
          nomeUsuario: userData.nomeUsuario,
          emailUsuario: userData.emailUsuario,
          emailAdicional: userData.emailAdicional || null, // Use null se não estiver definido
          // Atualize outros campos conforme necessário
        };

        await updateDoc(userDocRef, updatedData);

        console.log('Dados do usuário editados com sucesso!');
      } catch (error) {
        console.error('Erro ao editar dados do usuário:', error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Layout>
    <div className='dashboard-page' id='MinhaConta'>
  <div className='dashboard-content'>
    <div className="minhaconta-page">
      <h2>Minha Conta</h2>
      {loading && <p>Carregando...</p>}
      {!loading && (
        <form onSubmit={handleEditAccount} className="form-columns">
          <div className="form-controle">
            <div className='form-column label'>
                <label>Nome completo</label>
            </div>
            <div className='form-column input'>
              <input
                type="text"
                id="nome"
                name="nome"
                value={userData.nomeUsuario}
                onChange={handleChange}
              />           
            </div>        
          </div>
          
          <div className="form-controle">
            <div className='form-column label'>
                <label>E-mail Master</label>
            </div>
            <div className='form-column input'>
              <input
                type="email"
                value={userData.emailUsuario}
                disabled
              />
            </div>            
          </div>
          <div className="form-controle">
            <div className='form-column label'>
                <label>Minha Empresa</label>
            </div>
            <div className='form-column input'>
            <Link to='/company'>
              {organizationData.join(', ') || ''}
            </Link>
            </div>        
          </div>
          <hr/>
          <div className="form-controle">
            <div className='form-column label'>
            </div>
            <div className='form-column input'>
              <button type="submit">Salvar</button>
            </div>            
          </div>
          <div className='delAccount'>
            <p>Após excluir sua conta, você receberá um e-mail confirmando que removemos todos os seus dados do nosso servidor.</p>
            <Link to=''>Deletar minha conta</Link>
          </div>   
        </form>
      )}
    </div>
  </div>
</div>

    </Layout>
  );
};

export default EditarConta;
