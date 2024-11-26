import React from 'react';
import './SobreComp.scss';
import BoxTeam from '../../components/BoxTeam/BoxTeam';


function SobreComp() {
  return (
    <div className="sobreComp">
      <div className="bg-sobreComp">
          <div className="header-page-image">
            <img src="https://eplano.s3.sa-east-1.amazonaws.com/foto_sobre_eplano.webp" alt="Banner 1" />
          </div>
          <div className="header-page-text-content">
            <div className='text-content'>
                <h1>
                Sobre o <span className='dstq'>e</span>Plano
                </h1>
                <p>
                  O ePlano é o seu assistente WEB, que vai te assessorar (ajudar) na Administração do seu Negócio.
                </p>
            </div>
          </div>
      </div>
      
      <div className='chamadaDestaque'>
        <h1>
        Por que <span className='dstq'>e</span>Plano? Porque <span className='dstq'>o seu Negócio é uma ORGANIZAÇÃO VIVA</span>, que está em constante mudança!
        </h1>
      </div>
      <div className='texto-teste'>
        <p>
          Se o desafio é um mundo em constante mudança, onde tudo parece estar mais rápido, as Empresas precisam desenvolver PLANOS mais ÁGEIS!
          E isso só é possível se for feito com SIMPLICIDADE, AGILIDADE E INOVAÇÃO.
        </p>
        <p>
            <strong>PLANOS mais Ágeis = Organização (para Operar melhor o seu Negócio).</strong>
        </p>
        <p>
            Temos que PLANEJAR e REPLANEJAR mais rápido, você concorda?
            E se você nunca estudou, leu e ou fez um Planejamento, FIQUE TRANQUILO; a gente preparou tudo para você.</p>
        <p>
            O ePlano é a solução que desenvolvemos ao longo de 10 anos para facilitar este progresso (processo, crescimento).
            Elaboramos e desenhamos o Planejamento de centenas de Negócios, sempre buscando simplificar as Ferramentas de Planejamento e Gestão.
        </p>
      </div>
      <div className='w-text-content'>
        
        <h2>Somos a primeira Plataforma - Simples, Ágil e 100% online - desenvolvida para Planejar e Administrar Micro e Pequenos Negócios.</h2>
      </div>


      
      <BoxTeam />
      
    </div>
  );
}

export default SobreComp;
