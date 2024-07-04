// SolicitarIntegracao.js

import React, { useState } from 'react';
import Layout from '../../components/Layout/layout';

const SolicitarIntegracao = () => {
  // Estados para armazenar os dados do formulário
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    tipoIntegracao: '',
    mensagem: '',
  });

  // Função para lidar com a alteração nos campos do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    // Adicione lógica para enviar os dados de solicitação ao backend ou realizar ações necessárias
    console.log('Dados de Solicitação de Integração:', formData);
    // Limpar o formulário após o envio, se necessário
    setFormData({
      nome: '',
      email: '',
      tipoIntegracao: '',
      mensagem: '',
    });
  };

  return (
    <Layout>
      <div className='dashboard-page'>
        <div className='dashboard-content'>
          <h2>Solicitar Integração</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Tipo de Integração Desejada:
              <input
                type='text'
                name='tipoIntegracao'
                value={formData.tipoIntegracao}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Mensagem de Solicitação:
              <textarea
                name='mensagem'
                value={formData.mensagem}
                onChange={handleChange}
                required
                rows='5'
              ></textarea>
            </label>
            <button type='submit'>Enviar Solicitação</button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default SolicitarIntegracao;
