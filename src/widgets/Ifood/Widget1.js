import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import firebaseApp from '../../config/firebaseConfig';
import Spinner from '../../components/Spinner/Spinner';

const Widget1 = ({ width, height }) => {
  const [chartWidth, setChartWidth] = useState(width || 600);
  const [chartHeight, setChartHeight] = useState(height || 300);
  const [ifoodData, setIfoodData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setChartWidth(Math.min(width || 600, 0.9 * (window.innerWidth - 30)));
    setChartHeight(height || 300);

    const fetchIfoodData = async () => {
      try {
        // Verificar a conectividade à Internet
        if (!navigator.onLine) {
          throw new Error('Sem conexão à Internet.');
        }

        const db = getFirestore(firebaseApp);
        const ifoodCollection = collection(db, 'ifood');
        const snapshot = await getDocs(ifoodCollection);
        const data = snapshot.docs.map((doc) => doc.data());

        // Verificar se os dados estão vazios
        if (data.length === 0) {
          throw new Error('Nenhum dado encontrado.');
        }

        setIfoodData(data);
        setReload(false); // Resetar o estado de recarregamento
      } catch (error) {
        setError(error.message);
        setReload(true); // Habilitar o botão de recarregamento
      } finally {
        setLoading(false);
      }
    };

    fetchIfoodData();
  }, [width, height, reload]); // Adicionar reload como dependência

  useEffect(() => {
    const handleResize = () => {
      setChartWidth(Math.min(width || 600, 0.9 * (window.innerWidth - 30)));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [width]);

  const handleReload = () => {
    setLoading(true);
    setError(null);
    setReload(true); // Habilitar o carregamento
  };

  return (
    <div className='palco'>
      {loading && <Spinner />}
      {error && (
        <div className='error-message'>
          {error}
          <button onClick={handleReload}>Recarregar</button>
        </div>
      )}
      {!loading && !error && (
        <div>
          <div className='titulo-grafico'>Faturamento Mensal das Lojas do iFood (R$)</div>
          <BarChart width={chartWidth} height={chartHeight} data={ifoodData}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="loja" />
            <YAxis />
            <Tooltip formatter={(value) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)} />
            <Legend />
            <Bar dataKey="faturamento_ifood" fill="#8884d8" name="Faturamento (R$)" />
          </BarChart>
        </div>
      )}
    </div>
  );
};

export default Widget1;