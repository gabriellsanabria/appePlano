import React from 'react';
import './AcademyChamada.scss';

function AcademyChamada() {
  return (
    <section className='section-academyChamada'>
        <div className='box-wrapper'>       
            <div className='box-academyChamada'>
                <img src='https://eplano.s3.sa-east-1.amazonaws.com/img_eplano_academy_1.webp' />
            </div>     
            <div className='box-academyChamada'>
                <h1>ePlano <span className='fonte-laranja'>Academy</span></h1>
                <p>Acreditamos que o conhecimento é a força motriz por trás de qualquer empreendimento bem-sucedido.</p> 
                <p>Nossos cursos são elaborados para fornecer as ferramentas, estratégias e insights necessários para criar planos de negócios robustos e gerenciar projetos de maneira eficaz.</p>
                <p>Estamos empenhados em equipar você com as habilidades e o conhecimento que impulsionarão o crescimento do seu negócio.</p>   
            </div>
        </div>
    </section>
  );
}

export default AcademyChamada;
