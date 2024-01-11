import React from 'react';
import './Home.scss';
import Banner from '../components/Banner/Banner'; // Importe o componente Banner

function Home() {
  return (
    <div className="home">
      <section className="banner">
        <Banner />
      </section>
      <section className='teaser'>
        <div className='boxTeaser'>
          <div className='boxLogo'>
            <img src='https://eplano.s3.sa-east-1.amazonaws.com/logo_E_eplano.webp' />
          </div>
          <div className='boxTexto'>
            <h1>
            O ePlano chegou para revolucionar o planejamento e a administração do seu Negócio; na era digital.
            <br/><br/>Temos um plano para você e para o seu Negócio.
            </h1>
          </div>
        </div>
      </section>
      <section className='destaques'>
        <div className='boxDestaques'>
          <div className="boxDestaques-image">
            <img src="https://eplano.s3.sa-east-1.amazonaws.com/img_inovacao.webp" alt="Banner 1" />
          </div>
          <div className="boxDestaques-txt">
            <h1>Simplicidade</h1>
            <p>
            Simplificamos as principais ferramentas do mercado para planejar e administrar o seu Negócio; com facilidade
            </p>
          </div>
        </div>
        <div className='boxDestaques'>
          <div className="boxDestaques-image">
            <img src="https://eplano.s3.sa-east-1.amazonaws.com/img_agilidade.webp" alt="Banner 1" />
          </div>
          <div className="boxDestaques-txt">
            <h1>Agilidade</h1>
            <p>
            No mundo de muitas mudanças, o seu Negócio precisa de velocidade para entender os contextos e desenhar cenários para tomar melhores decisões; com rapidez.
           </p>
          </div>
        </div>
        <div className='boxDestaques'>
          <div className="boxDestaques-image">
            <img src="https://eplano.s3.sa-east-1.amazonaws.com/img_seguranca.webp" alt="Banner 1" />
          </div>
          <div className="boxDestaques-txt">
            <h1>Segurança</h1>
            <p>
              O ePlano vai te entregar as informações mais importantes para proporcionar a Segurança que todo Empreendedor deseja; o essencial.
            </p>
            </div>
        </div>
        <div className='boxDestaques'>
          <div className="boxDestaques-image">
            <img src="https://eplano.s3.sa-east-1.amazonaws.com/img_simplicidade.webp" alt="Banner 1" />
          </div>
          <div className="boxDestaques-txt">
            <h1>Inovação</h1>
            <p>
              Tudo isso feito de maneira digital; 100% Online.   
            </p>
            </div>
        </div>
      </section>
      <div className='chamadaDestaque'  id='sobreComp'>
        <h1>
        Junte-se a nós! E empreenda de maneira Simples, Ágil, Segura e Inovadora.
        </h1>
      </div>
    </div>
  );
}

export default Home;
