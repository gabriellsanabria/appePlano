// src/components/Login/CadastroStep1.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import HeaderCadastro from '../../structure/HeaderCadastro/HeaderCadastro';

import ConsultaCnpj from '../../components/ApiCnpj/ConsultaCnpj';

import '../../views/CadastroSteps/CadastroSteps.scss';

const CadastrarEmpresaNova = () => {
  const [mensagemErro, setMensagemErro] = useState('');
  const navigate = useNavigate();

  const handleCadastro = async (e) => {
    e.preventDefault();
    // Restante do código permanece inalterado
  };

  // Função chamada quando o link de autenticação é enviado
  const handleMagicLinkSent = (email) => {
    console.log('Link de autenticação enviado para o e-mail:', email);
  };

  return (
    <div>
      <HeaderCadastro />
      <div className="content-container">
        <h1>Informe o CNPJ</h1>
        <p>Complete o seu cadastro informando o cnpj da sua empresa ou da qual você montará um plano de negócio ePlano.</p>
        
        <ConsultaCnpj />
        
      </div>
    </div>
  );
};

export default CadastrarEmpresaNova;
