import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../apiConfig';

const DataFetcher = ({ onDataFetched }) => {
  const [loading, setLoading] = useState(true);
  const [produtosServicosData, setProdutosServicosData] = useState(null);
  const [receitasMensaisData, setReceitasMensaisData] = useState(null);  
  const [impostosMensaisData, setImpostosMensaisData] = useState(null);
  const [estruturaData, setEstruturaData] = useState(null);
  const [equipeData, setEquipeData] = useState(null);
  const [insumosData, setInsumosData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response1 = await axios.get(`${API_BASE_URL}/produtos_servicos`);
        const response11 = await axios.get(`${API_BASE_URL}/receitas_mensais_negocio`);  
        const response2 = await axios.get(`${API_BASE_URL}/listar_impostos_mensais`);  
        const response3 = await axios.get(`${API_BASE_URL}/api/despesas/estrutura`);  
        const response4 = await axios.get(`${API_BASE_URL}/api/despesas/equipe`);  
        const response5 = await axios.get(`${API_BASE_URL}/api/despesas/insumos`);
        
        setProdutosServicosData(response1.data);
        setReceitasMensaisData(response11.data);
        setImpostosMensaisData(response2.data);
        setEstruturaData(response3.data);
        setEquipeData(response4.data);
        setInsumosData(response5.data);
        setLoading(false);
        console.log('Resposta de insumos:', response5.data);

        // Chame a função onDataFetched e passe os dados recuperados
        onDataFetched({
          produtosServicosData,
          receitasMensaisData,
          impostosMensaisData,
          estruturaData,
          equipeData,
          insumosData
        });
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
      }
    };
  
    fetchData();
  }, [onDataFetched]);

  return null; // Componente sem renderização visível
};

export default DataFetcher;
