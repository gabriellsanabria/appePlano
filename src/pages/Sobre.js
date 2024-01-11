import React from 'react';
import './Sobre.scss';
import BoxTeam from '../components/BoxTeam/BoxTeam'; // Importe o componente Banner



function Sobre() {
  return (
    <div className="sobre">
      <div className="header-page">
        <div className="header-page-content">
          <div className="header-page-image">
            <img src="https://eplano.s3.sa-east-1.amazonaws.com/img_bnn_sobre.webp" alt="Banner 1" />
          </div>
          <div className="header-page-text-content">
            <h1>
              Sobre nós
            </h1>
            <p>
            Junte-se a nós em nossa missão de simplificar o sucesso  
            <br/>
            <strong>ePlano</strong> é a sua aliada na busca da  excelência em  gerenciamento de negócios e projetos.
            </p>
          </div>
        </div>
      </div>
      
      <section className='destaques'>
        <div className='boxDestaques'>
          <div className="boxDestaques-ttl">
            <h2>
              Com ePlano, você encontrará uma <span className='fonte-laranja'>parceria sólida</span> para aprimorar a gestão do seu negócio
            </h2>
          </div>
          <div className="boxDestaques-txt">
            <p>
              Com mais de 20 anos de experiência no mercado nacional, nossa jornada tem sido moldada pela inovação, excelência e compromisso em oferecer soluções eficazes para nossos clientes.
            </p> 
            <p>
              Somos uma equipe apaixonada de profissionais, combinando experiência prática com conhecimento acadêmico, abrangendo áreas como construção civil, tecnologia da informação, meio ambiente, responsabilidade social e eventos.
            </p> 
            <p>
              Nossa missão é ajudar empresas e profissionais a atingir seus objetivos com eficiêcia e excelência. Mantemos nossa atuação ancorada em valores como ética, transparência, inovação, flexibilidade, responsabilidade social e sustentabilidade.
            </p>  
          </div>
        </div>
        
      </section>
      <h1 className='chamadaDestaque'>
        Nossa missão é ajudar empresas a atingir seus objetivos com eficiência e excelência
      </h1>


      <BoxTeam />


    </div>
  );
}

export default Sobre;
