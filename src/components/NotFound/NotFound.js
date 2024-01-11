// NotFound.js
import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.scss'; // Estilize conforme necessário

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1 className="error-message">Ops! Página não encontrada</h1>
      <img
        src="https://eplano.s3.sa-east-1.amazonaws.com/banner_1.webp"
        alt="Erro 404"
        className="error-image"
      />
      <p>
        Parece que a página que você está procurando não existe. Aqui estão algumas sugestões para ajudá-lo:
      </p>
      <ul>
        <li>
          Volte para a <Link to="/">Dashboard</Link>.
        </li>
      </ul>
      <p>
        Se você ainda não encontrou o que procura, entre em contato conosco em <a href="mailto:contato@eplano.com.br">contato@eplano.com.br</a>
      </p>
    </div>
  );
};

export default NotFound;
