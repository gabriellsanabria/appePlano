import React from 'react';
import './Solucao.scss';

function Solucao() {
  return (
    <div className="solucao">
      <div className="header-page">
        <div className="header-page-content">
          <div className="header-page-text-content">
            <h1>
              Simples, educativo e eficaz
            </h1>
            <p>
            Junte-se ao ePlano e simplifique sua jornada ao topo
            </p>
          </div>
          <div className="header-page-image">
            <img src="https://eplano.s3.sa-east-1.amazonaws.com/img_header_page_laptop.webp" alt="Banner 1" />
          </div>
        </div>
      </div>
      
      <section className='destaques-solucao'>
        <div className='boxDestaques-solucao'>
          <div className="boxDestaques-img-solucao"> 
            <img src="https://eplano.s3.sa-east-1.amazonaws.com/img_eplano_solucao_destaque.webp" alt="Banner 1" />
          </div>
          <div className="boxDestaques-txt-solucao">
            <h1>
              Crie planos e mapeie processos e projetos 100% online  
            </h1>
            <p>
              Descubra quais são os principais fatores que limitam o seu negócio!
            </p>  
            <p>
            A nossa plataforma também vai simplificar a criação de planos, mapeamento de processos e avaliação de viabilidade
            </p>
          </div>
        </div>
        
      </section>
      <div className='chamadaDestaque'>
        <h1>
          Simplifique as suas operações e impulsione seus resultados com a platafroma ePlano  
        </h1>
        <p>Em breve, você terá acesso a uma plataforma completa que o ajudará a conquistar seus objetivos com confiança</p>
      </div>
      <section className='boxVytb'>
        <div className='vYtb'>
        <iframe
          width="100%"
          height="315"
          src="https://www.youtube.com/embed/SE6jzuj8BxY"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        </div>
      </section>
      
      
      <section className='destaques-func-solucao'>
        <div className='boxDestaques-func-solucao'>
          <div className="boxDestaques-func-txt-solucao">
            <h1>
              Funcionalidades  
            </h1>
            <ul>
              <li>Funcionalidade 1</li>
              <li>Funcionalidade 2</li>
              <li>Funcionalidade 3</li>
              <li>Funcionalidade 4</li>
              <li>Funcionalidade 5</li>
              <li>Funcionalidade 6</li>
              <li>Funcionalidade 7</li>
              <li>Funcionalidade 8</li>
              <li>Funcionalidade 9</li>
              
            </ul>
          </div>
          <div className="boxDestaques-func-img-solucao"> 
            <img src="https://eplano.s3.sa-east-1.amazonaws.com/img_eplano_funcionalidades2.webp" alt="Banner 1" />
          </div>
        </div>
        
      </section>
    </div>
  );
}

export default Solucao;
