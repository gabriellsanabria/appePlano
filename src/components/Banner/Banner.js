import React from 'react';
import './Banner.scss'; // Importe os estilos do Banner
import Slider from 'react-slick';

function Banner() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // Adiciona o autoplay
    autoplaySpeed: 3000, // Define o intervalo para 2 segundos
  };

  return (
    <div className="banner">
      <Slider {...settings}>
        <div>
          <div className="banner-content">
            <div className="text-content-esq">
              <h1><span className='dstq'>Solução Inovadora</span> para Planejamento e Gestão de Micro e Pequenos Negócios.</h1>
              <p>
              Empreendedor, somos o ePlano, uma Plataforma de Soluções para te ajudar a administrar o seu Negócio.
              </p>
            </div>
            <div className="banner-image-dir">
              <img src="https://eplano.s3.sa-east-1.amazonaws.com/banner_1.webp" alt="Banner 1" />
            </div>
          </div>
        </div>
        <div>
          <div className="banner-content">
            <div className="banner-image-esq">
              <img src="https://eplano.s3.sa-east-1.amazonaws.com/banner_2.webp" alt="Banner 1" />
            </div>
            <div className="text-content-dir">
              <h1>No Brasil, <span className='dstq'>60% das empresas</span> quebram em até 5 anos.</h1>
              <p>
              400 mil empresas quebraram no primeiro trimestre de 2023. Você sabe o principal motivo?
              'Falta de Planejamento' ou 'Planejamento Raso'.
              </p>
            </div>
          </div>
        </div>
        <div>
          <div className="banner-content">
            <div className="text-content-esq">
              <h1>No Brasil, cerca de <span className='dstq'>"50% dos Negócios Formais"</span>, são abertos 'por necessidade'.</h1>
              <p>
              Se você começou o seu Negócio com pouco ou nenhum planejamento, a Plataforma ePlano vai te ajudar a entender e aproveitar as oportunidades no seu segmento de atuação; com o máximo de confiança.
              </p>
            </div>
            <div className="banner-image-dir">
              <img src="https://eplano.s3.sa-east-1.amazonaws.com/banner3.webp" alt="Banner 1" />
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
}

export default Banner;
