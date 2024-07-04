import React, { useState, useEffect } from 'react';
import '../../components/Loader/PageLoader'; 

const Autenticando = () => {
  const [loading, setLoading] = useState(true);
  const [dots, setDots] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 100000); // Defina a duração desejada para o loader

    // Efeito para os pontinhos aparecerem um por um a cada 1 segundo
    const dotsTimer = setInterval(() => {
      setDots((prevDots) => (prevDots === 3 ? 0 : prevDots + 1));
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(dotsTimer);
    };
  }, []);

  const renderDots = () => {
    // Renderiza os pontinhos com base no estado local 'dots'
    return Array.from({ length: dots }, (_, index) => <span key={index}>.</span>);
  };

  return (
    <div className={`page-loader ${loading ? 'visible' : ''}`}>
      <div className="loader-content">
        <div>
          <h1>Autenticando a sua conta</h1>
          <img src='https://s3.sa-east-1.amazonaws.com/oboss.com.br/icone_oboss.webp' alt="Logo" />
        </div>
        <p>Aguarde{renderDots()}</p>
      </div>
    </div>
  );
};

export default Autenticando;
