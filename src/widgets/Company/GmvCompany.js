import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import firebaseApp from '../../config/firebaseConfig';
import Spinner from '../../components/Spinner/Spinner';

const GmvCompany = () => {
  const [totalAmount, setTotalAmount] = useState(null);
  const [royaltyAmount, setRoyaltyAmount] = useState(null);
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

        // Consultar todos os documentos da coleção 'sales'
        const salesCollection = collection(db, 'sales');
        const salesQuerySnapshot = await getDocs(salesCollection);

        // Calcular a soma total dos valores do campo 'amount'
        let totalAmount = 0;
        salesQuerySnapshot.forEach((doc) => {
          const data = doc.data();
          const amountValue = parseFloat(data.amount) || 0;
          totalAmount += amountValue;
        });

        // Calcular o royalty de 5%
        const royaltyValue = totalAmount * 0.05;

        setTotalAmount(totalAmount);
        setRoyaltyAmount(royaltyValue);
        setReload(false); // Resetar o estado de recarregamento
      } catch (error) {
        setError(error.message);
        setReload(true); // Habilitar o botão de recarregamento
      } finally {
        setLoading(false);
      }
    };

    fetchTotalAmount();
  }, [reload]);

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
            Total de vendas Todos os canais: {totalAmount ? `R$ ${totalAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : 'Nenhum dado encontrado'}
          </div>
          <div className='titulo-resultado'>
            Royalty (5%): {royaltyAmount ? `R$ ${royaltyAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : 'Nenhum dado encontrado'}
          </div>
        </div>
      )}
    </div>
  );
};

export default GmvCompany;
