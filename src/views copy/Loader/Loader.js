import React, { useState, useEffect } from 'react';
import '../../components/Loader/PageLoader'; 

const Autenticando = () => {
  const [loading, setLoading] = useState(true);
  const [dots, setDots] = useState(0);

 const [logoUrl, setLogoUrl] = useState('https://eplano.s3.sa-east-1.amazonaws.com/logo_E_eplano.webp');

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
          <h1>Carregando</h1>
          <img src={logoUrl} alt="Logo da empresa" />
        </div>
        <p>Aguarde{renderDots()}</p>
      </div>
    </div>
  );
};

export default Autenticando;
