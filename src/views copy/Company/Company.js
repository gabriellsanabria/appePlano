// Company.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { doc, getFirestore, getDoc } from 'firebase/firestore';
import Layout from '../../components/Layout/layout';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import './Company.scss';

const Company = () => {
    // Estados para armazenar dados da empresa
    const [companyData, setCompanyData] = useState({
        companyName: '',  
        urlBase: '',
      });
      
  
    // Função para atualizar dados da empresa
    const updateCompanyData = (field, value) => {
      setCompanyData((prevData) => ({
        ...prevData,
        [field]: value,
      }));
    };
      
  
    // Função para buscar dados da coleção "organization"
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
                const companyName = orgData.companyName || '';
                const urlBase = orgData.urlBase || '';
                updateCompanyData('companyName', companyName);
                updateCompanyData('urlBase', urlBase);
                console.log('Nome da Empresa:', companyName);
                console.log('orgData:', orgData);
                console.log('companyName from orgData:', orgData.companyName);
                
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
  
    useEffect(() => {
      fetchOrganizationData();
    }, []);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Dados da Empresa Atualizados:', companyData);
      // Adicione lógica para enviar os dados ao backend ou fazer atualizações
    };

    return (
      <Layout>
        <div className='dashboard-page' id='Company'>
          <div className='dashboard-content'>
            <div className="minhaconta-page">
              <h2>Minha Empresa</h2>
              <form onSubmit={handleSubmit} className="form-columns">
                <div className="form-controle">
                  <div className='form-column label'>
                    <label>Nome da Empresa</label>
                  </div>
                  <div className='form-column input'>
                    <input
                      type='text'
                      value={companyData.companyName}
                      onChange={(e) => updateCompanyData('companyName', e.target.value)}
                    />
                  </div>
                </div>
  
                <div className="form-controle">
                  <div className='form-column label'>
                    <label>URL da empresa</label>
                  </div>
                  <div className='form-column input'>
                    <Link to={`https://eplano.com.br/${companyData.urlBase}`}>
                      https://eplano.com.br/{companyData.urlBase}
                    </Link>
                  </div>
                </div>
                <hr />
                
                <div className="form-controle">
                  <div className='form-column label'>
                  </div>
                  <div className='form-column input'>
                    <button type="submit">Salvar</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Layout>
    );
  };
  
  export default Company;