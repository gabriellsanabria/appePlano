import React from 'react';
import './StaticContent.scss';

import Categorias from '../components/Categorias/Categorias';
import SobreComp from '../components/SobreComp/SobreComp';
import Parceiros from '../components/Parceiros/Parceiros';
import Funcionalidades from '../components/Funcionalidades/Funcionalidades';
import AcademyChamada from '../components/AcademyChamada/AcademyChamada';
import ContatoComp from '../components/ContatoComp/ContatoComp';

function StaticContent() {
  return (
    <div className="StaticContent">
      <section className='SobreComp'>
        <SobreComp />        
      </section>
      <section className='parceiros'>
        <Parceiros />        
      </section>
      <section className='categorias'>
        <Categorias />
      </section>
      <section className='contatoComp'>
        <ContatoComp />
      </section>
      {/* <section className='funcionalidades'>
        <Funcionalidades />                
      </section>
      <section className='academyChamada'>
        <AcademyChamada />                        
      </section> */}
    </div>
  );
}

export default StaticContent;
