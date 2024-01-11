import React from 'react';
import './Categorias.scss';

function Categorias() {
  return (
    <section className='section-categorias'>
        <div className='box-wrapper'>            
            <div className='box-categorias'>
                <h1 className='dstq'>Segmentos de atuação</h1>
                <p>
                Atuando há mais de 20 anos no Mercado, temos larga experiência com (1) Ensino, (2) Empreendedorismo e (3) Elaboração de Estratégicas para diferentes tipos de Empresas e Segmentos da Economia.

                </p>
            </div>
            <div className='box-categorias'>
                <div>ePlano é solução para:</div>
                <div className='coluna-categorias'>                    
                <ul>
                    <li><a href="#">Comércio, em geral</a></li>
                    <li><a href="#">Construção Civil</a></li>
                    <li><a href="#">Odontologia</a></li>
                    <li><a href="#">Veterinária</a></li>
                </ul>
                                
                <ul>
                    <li><a href="#">Bares e Restaurantes</a></li>
                    <li><a href="#">Hotelaria</a></li>
                    <li><a href="#">Clínica de estética</a></li>
                    <li><a href="#">Salão de beleza</a></li>
                </ul>      

                <ul>
                    <li><a href="#">Óticas</a></li>
                    <li><a href="#">Eventos</a></li>
                    <li><a href="#"></a></li>
                </ul>             
                    
                </div>
            </div>
        </div>
    </section>
  );
}

export default Categorias;
