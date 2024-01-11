// Planos.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../config'; // Importe o arquivo de configuração
import './Planos.scss';

function Plano({ title, subtitle, price, features, labelButton }) {
  const navigate = useNavigate();

  const redirectToCadastro = () => {
    console.log('Config:', config); // Adicione esta linha_
    window.location.href = `https://${config}`; // Adicione o domínio explicitamente se necessário

  };
  return (
    <div className="plano">
      <div className="plano-header">
        <h3>{title}</h3>
        <h3>{price}</h3>
        <p>{subtitle}</p>
      </div>
      <ul>
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
      <button className="bt azul" onClick={redirectToCadastro}>
        {labelButton}
      </button>
    </div>
  );
}


function Planos() {
  const planosData = [
    {
      title: 'Freemium',
      subtitle: 'Experimente 30 dias com todas as funções da versão Enterprise',
      price: 'R$ 0,00',
      features: [
        'Recurso 1',
        'Recurso 2',
        'Recurso 3',
        'Recurso 4',
        'Recurso 5',
        'Recurso 6',
        'Recurso 7',
      ],
      labelButton: 'Começar Agora',
    },
    {
      title: 'Pro',
      price: 'R$ 190/mês',
      subtitle: 'Experimente 30 dias com todas as funções da versão Enterprise',
      features: [
        'Recurso 1',
        'Recurso 2',
        'Recurso 3',
        'Recurso 4',
        'Recurso 5',
        'Recurso 6',
        'Recurso 7',
      ],
      labelButton: 'Selecionar',
    },
    {
      title: 'Enterprise',
      price: 'Entre em Contato',
      subtitle: 'Experimente 30 dias com todas as funções da versão Enterprise',
      features: [
        'Recurso 1',
        'Recurso 2',
        'Recurso 3',
        'Recurso 4',
        'Recurso 5',
        'Recurso 6',
        'Recurso 7',
      ],
      labelButton: 'Fale com o time de  vendas',
    },
  ];

  return (
    <div className="planos-page">
      <h2>Escolha o Seu Plano</h2>
      <div className="planos-table">
        {planosData.map((plano, index) => (
          <Plano key={index} {...plano} />
        ))}
      </div>
    </div>
  );
}

export default Planos;
