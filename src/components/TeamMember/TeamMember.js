import React from 'react';
import './TeamMember.scss'; // Importe os estilos do Banner
import Slider from 'react-slick';

const teamMembers = [
  {
    name: 'Luciano Ramalho',
    role: 'CEO e Co-Fundador',
    image: 'https://eplano.s3.sa-east-1.amazonaws.com/Luciano-Ramalho_ePlano-Site+(1).jpg',
  },
  {
    name: 'Daniel Ramalho',
    role: 'Co-fundador',
    estilo: 'daniel',
    image: 'https://eplano.s3.sa-east-1.amazonaws.com/WhatsApp+Image+2023-12-05+at+11.09.05+(1).jpeg',
  },
  {
    name: 'Gabriel Sanabria',
    role: 'CTO - Chief Technology Officer.',
    image: 'https://eplano.s3.sa-east-1.amazonaws.com/1697274339387.jfif',
  },
];

function TeamMember() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
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
    <div className="team-members">
      <Slider {...settings}>
        {teamMembers.map((member, index) => (
          <div key={index}>
            <div className="member-content">
              <div className="member-image">
                <div className="red-circle">
                  <img src={member.image} className={`${member.estilo}`} />
                </div>
              </div>
              <div className="text-content">
                <h1>{member.name}</h1>
                <p>{member.role}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
      <span></span>
    </div>
  );
}

export default TeamMember;
