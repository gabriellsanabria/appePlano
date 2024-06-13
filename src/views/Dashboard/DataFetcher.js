import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../apiConfig';

const DataFetcher = ({ onDataFetched }) => {
  const [loading, setLoading] = useState(true);
  const [dataFetched, setDataFetched] = useState(false); // Estado para controlar se os dados já foram buscados

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
        
        const response6 = await axios.get(`${API_BASE_URL}/api/caixa/liquido`);
        const response7 = await axios.get(`${API_BASE_URL}/api/caixa/estoque`);
        const response8 = await axios.get(`${API_BASE_URL}/api/caixa/recebiveis`);
        const response9 = await axios.get(`${API_BASE_URL}/api/caixa/contas_pagar`);
        
        setDataFetched(true); // Define que os dados foram buscados com sucesso

        onDataFetched({
          produtosServicosData: response1.data,
          receitasMensaisData: response11.data,
          impostosMensaisData: response2.data,
          estruturaData: response3.data,
          equipeData: response4.data,
          insumosData: response5.data,
          caixaLiquidoData: response6.data,
          caixaEstoqueData: response7.data,
          caixaRecebiveisData: response8.data,
          caixaContasPagarData: response9.data
        });
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
      } finally {
        setLoading(false);
      }
    };
  
    if (!dataFetched) { // Verifica se os dados já foram buscados antes de buscar novamente
      fetchData();
    }
  }, [onDataFetched, dataFetched]);

  return null; // Componente sem renderização visível
};

export default DataFetcher;
