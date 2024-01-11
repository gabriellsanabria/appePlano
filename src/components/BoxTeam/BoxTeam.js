import React from 'react';
import './BoxTeam.scss';
import TeamMember from '../../components/TeamMember/TeamMember'; // Importe o componente Banner



function BoxTeam() {
  return (
    <div className="sobre">

      <section className='section-team'>
        <div className='box-team'>
          <h1>Nosso Time</h1>
          <p>
          Por trás do ePlano, somos um Time Forte e Apaixonado pelo Empreendedorismo. Queremos contribuir para o sucesso dos Negócios em nosso país. 
          </p>
          <div className='our-team'>
            <TeamMember />
          </div>
          <span></span>
        </div>        
      </section>


    </div>
  );
}

export default BoxTeam;
