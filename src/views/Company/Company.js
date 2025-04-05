import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../../components/Layout/layout';
import './Company.scss';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';

import useAuth from '../../hooks/useAuth';
import { API_BASE_URL } from '../../apiConfig';

const Company = () => {
  const [companyData, setCompanyData] = useState(null);
  const [loading, setLoading] = useState(true);  // Para controlar o estado de carregamento
  const [error, setError] = useState(null);  // Para capturar erros
    
  const { user } = useAuth();
  const userId = user ? user.uid : null;

  useEffect(() => {
    
      // Verifica se o userId está disponível antes de fazer a requisição
    if (!userId) {
      setLoading(false);
      return; // Se o userId não estiver disponível, não faça a requisição
    }
    
    const fetchCompanyData = async () => {
      try {
        console.log("Iniciando a requisição para a empresa...");
  
        const response = await axios.get(`${API_BASE_URL}/api/empresas/usuario/${userId}`);
        
        // Log da resposta da API
        console.log("Resposta da API:", response);
  
        // Estrutura o retorno no formato de payload
        const payload = {
          success: true,
          data: response.data,  // Aqui armazenamos os dados reais da resposta
          message: 'Dados da empresa carregados com sucesso',
        };
  
        // Log do payload que será armazenado no estado
        console.log("Payload gerado:", payload);
  
        setCompanyData(payload);
      } catch (error) {
        setError('Erro ao buscar dados da empresa');
        console.error("Erro ao buscar dados da empresa:", error);
      } finally {
        setLoading(false);
        console.log("Carregamento finalizado");
      }
    };
  
    fetchCompanyData();
  }, [userId]);
  
  
  // Exemplo de itens de breadcrumb
  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Minha Empresa', path: '/dashboard' },
  ];

  return (
    <Layout>
      <Breadcrumb items={breadcrumbItems} />
      <div className='dashboard-page' id='Company'>
        <div className='dashboard-content'>
          <div className="minhaconta-page">
            <h2>Minha Empresa</h2>
            {loading ? (
              <p>Carregando dados da empresa...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              companyData && companyData.success && (
                <div>
                  <form className="form-columns">
                    

                  <div className="form-controle">
                      <div className='form-column label'>
                        <label>CNPJ</label>
                      </div>
                      <div className='form-column input'>
                        <input
                          type='text'
                          value={companyData.data[0].cnpj}
                          readOnly
                        />
                      </div>
                    </div>

                    <div className="form-controle">
                      <div className='form-column label'>
                        <label>Nome Empresarial</label>
                      </div>
                      <div className='form-column input'>
                        <input
                          type='text'
                          value={companyData.data[0].nome_empresarial}  // Acessando o primeiro item do array 'data'
                          readOnly
                        />
                      </div>
                    </div>

                    {/* <div className="form-controle">
                      <div className='form-column label'>
                        <label>Nome Fantasia</label>
                      </div>
                      <div className='form-column input'>
                        <input
                          type='text'
                          value={companyData.data[0].nome_fantasia}
                          readOnly
                        />
                      </div>
                    </div> */}

                    <div className="form-controle">
                      <div className='form-column label'>
                        <label>Código CNAE Principal</label>
                      </div>
                      <div className='form-column input'>
                        <input
                          type='text'
                          value={companyData.data[0].codigo_cnae_principal}
                          readOnly
                        />
                      </div>
                    </div>

                    <div className="form-controle">
                      <div className='form-column label'>
                        <label>Descrição CNAE Principal</label>
                      </div>
                      <div className='form-column input'>
                        <input
                          type='text'
                          value={companyData.data[0].descricao_cnae_principal}
                          readOnly
                        />
                      </div>
                    </div>

                    <div className="form-controle">
                      <div className='form-column label'>
                        <label>Natureza Jurídica</label>
                      </div>
                      <div className='form-column input'>
                        <input
                          type='text'
                          value={companyData.data[0].natureza_juridica}
                          readOnly
                        />
                      </div>
                    </div>

                    <div className="form-controle">
                      <div className='form-column label'>
                        <label>Regime de Tributação</label>
                      </div>
                      <div className='form-column input'>
                        <input
                          type='text'
                          value={
                            companyData.data[0].regime_tributario === 0 ? 'Simples' :
                            companyData.data[0].regime_tributario === 1 ? 'Presumido' :
                            companyData.data[0].regime_tributario === 2 ? 'Real' : 'Não Definido'
                          }
                          readOnly
                        />
                      </div>
                    </div>


                    <div className="form-controle">
                      <div className='form-column label'>
                        <label>Porte da Empresa</label>
                      </div>
                      <div className='form-column input'>
                        <input
                          type='text'
                          value={companyData.data[0].porte_empresa}
                          readOnly
                        />
                      </div>
                    </div>

                    <div className="form-controle">
                      <div className='form-column label'>
                        <label>Segmento da Empresa</label>
                      </div>
                      <div className='form-column input'>
                        <input
                          type='text'
                          value={companyData.data[0].segmento_empresa}
                          readOnly
                        />
                      </div>
                    </div>

                    <hr />
                    
                    <div className="form-controle">
                      <div className='form-column label'>
                      </div>
                      <div className='form-column input'>
                        <button type="button" disabled>Salvar</button>
                      </div>
                    </div>
                  </form>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Company;
