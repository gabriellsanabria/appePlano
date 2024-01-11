import React from 'react';
import './Parceiros.scss'; // Importe os estilos do Banner
import Slider from 'react-slick';

function Parceiros() {
  const images = [
    "https://eplano.s3.sa-east-1.amazonaws.com/logo_connect_serasa.png",
    "https://eplano.s3.sa-east-1.amazonaws.com/logo_coelho_lunar.png",
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 768, // Adicione o breakpoint desejado para dispositivos móveis
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="Parceiros">
        <h1>Nossos Parceiros</h1>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <div className="banner-content">
              <div className="banner-image">
                <img src={image} alt={`Banner ${index + 1}`} />
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Parceiros;
