import React, { useEffect, useState } from 'react';
import './ScrollToTop.scss'; // Certifique-se de importar o arquivo de estilo

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    // Mostra ou oculta o botão com base na posição de rolagem
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    // Rola suavemente para o topo
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    // Adiciona o evento de rolagem ao montar o componente
    window.addEventListener('scroll', handleScroll);

    // Remove o evento de rolagem ao desmontar o componente
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`scroll-to-top ${isVisible ? 'visible' : ''}`} onClick={scrollToTop}>
      {/* Ícone, texto ou qualquer conteúdo desejado para o botão */}
      <span role="img" aria-label="Topo">&#9650;</span>
    </div>
  );
};

export default ScrollToTop;
