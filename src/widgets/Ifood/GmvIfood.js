import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
import firebaseApp from '../../config/firebaseConfig';
import Spinner from '../../components/Spinner/Spinner';

const GmvIfood = () => {
  const [totalAmount, setTotalAmount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const fetchTotalAmount = async () => {
      try {
        // Verificar a conectividade à Internet
        if (!navigator.onLine) {
          throw new Error('Sem conexão à Internet.');
        }

        const db = getFirestore(firebaseApp);

        // Consultar total de 'amount' para 'ifood'
        const ifoodCollection = collection(db, 'sales');
        const ifoodQuerySnapshot = await getDocs(query(ifoodCollection, where('appId', '==', 'ifood')));
        const ifoodData = ifoodQuerySnapshot.docs.map((doc) => doc.data());

        // Calcular o total de 'amount' para 'ifood'
        const totalAmount = ifoodData.reduce((acc, curr) => acc + (curr.amount || 0), 0);

        setTotalAmount(totalAmount);
        setReload(false); // Resetar o estado de recarregamento
      } catch (error) {
        setError(error.message);
        setReload(true); // Habilitar o botão de recarregamento
      } finally {
        setLoading(false);
      }
    };

    fetchTotalAmount();
  }, [reload]); // Adicionar reload como dependência

  const handleReload = () => {
    setLoading(true);
    setError(null);
    setReload(true); // Habilitar o carregamento
  };

  return (
    <div>
      {loading && <Spinner />}
      {error && (
        <div className='error-message'>
          {error}
          <button onClick={handleReload}>Recarregar</button>
        </div>
      )}
      {!loading && !error && (
        <div>
          <div className='titulo-resultado'>
            Total de vendas iFood: {totalAmount ? `R$ ${totalAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : 'Nenhum dado encontrado'}
          </div>
        </div>
      )}

    </div>
  );
};

export default GmvIfood;
