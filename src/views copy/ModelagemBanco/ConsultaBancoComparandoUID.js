// MinhaConta.js
import { useEffect, useState } from 'react';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import firebaseApp from '../../config/firebaseConfig';

const MinhaConta = () => {
  const [organizationData, setOrganizationData] = useState([]);
  const auth = getAuth();

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const db = getFirestore(firebaseApp);

        // Consulta para obter as empresas onde o userId é igual ao user.uid
        const q = query(collection(db, 'organization'), where('userId', '==', auth.currentUser.uid));

        const organizationSnapshot = await getDocs(q);

        const organizationDataArray = organizationSnapshot.docs.map((doc) => doc.data().companyName);

        setOrganizationData(organizationDataArray);
      } catch (error) {
        console.error('Erro ao obter dados da coleção organization:', error);
      }
    };

    fetchCompany();
  }, [auth.currentUser.uid]); // Adicione auth.currentUser.uid como dependência do useEffect

  return (
    <div>
      <h1>Empresas associadas ao usuário {auth.currentUser.uid}</h1>
      <ul>
        {organizationData.map((companyName, index) => (
          <li key={index}>{companyName}</li>
        ))}
      </ul>
    </div>
  );
};

export default MinhaConta;
