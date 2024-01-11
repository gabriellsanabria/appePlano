import React from 'react';
import './Funcionalidades.scss';

function Funcionalidades() {
  return (
    <section className='section-funcionalidades'>
        <div className='box-wrapper'>            
            <div className='box-funcionalidades-txt'>
                <h2>Potencialize os resultados do seu negócio ou projeto com as funcionalidades e ferramentas da plataforma ePlano</h2>
                <p>
                    Estamos comprometidos em simplificar a gestão de negócios e projetos, tornando-a mais eficiente e acessível
                </p>
                <p>Nossos principais recursos estão sendo cuidadosamente projetados para potencializar o sucesso dos nossos clientes, e em breve você poderá utilizar essa poderosa solução</p>
            </div>
            <div className='box-funcionalidades-img'>
                <img src='https://eplano.s3.sa-east-1.amazonaws.com/img_eplano_funcionalidades.webp' />
            </div>
        </div>
    </section>
  );
}

export default Funcionalidades;
