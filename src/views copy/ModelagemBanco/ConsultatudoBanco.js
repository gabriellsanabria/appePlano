// MinhaConta.js
import { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import firebaseApp from '../../config/firebaseConfig';

const MinhaConta = () => {
  const [organizationData, setOrganizationData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtenha uma instância do Firestore
        const db = getFirestore(firebaseApp);

        // Acesse a coleção 'organization'
        const organizationCollection = collection(db, 'organization');

        // Obtenha os documentos da coleção
        const organizationSnapshot = await getDocs(organizationCollection);

        // Mapeie os documentos para um array de dados
        const organizationDataArray = organizationSnapshot.docs.map((doc) => doc.data());

        // Atualize o estado com os dados da coleção
        setOrganizationData(organizationDataArray);
      } catch (error) {
        console.error('Erro ao obter dados da coleção organization:', error);
      }
    };

    // Chame a função fetchData
    fetchData();
  }, []); // O segundo argumento vazio indica que o efeito só deve ser executado uma vez após a montagem do componente.

  return (
    <div>
      <h1>Dados da Coleção 'organization'</h1>
      <ul>
        {organizationData.map((data, index) => (
          <li key={index}>{JSON.stringify(data)}</li>
        ))}
      </ul>
    </div>
  );
};

export default MinhaConta;
