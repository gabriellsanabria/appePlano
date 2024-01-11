import React from 'react';
import { Helmet } from 'react-helmet';

const CompHelmet = ({ pageTitle }) => {
  return (
    <div>
      <Helmet>
        <title>{pageTitle}</title>

        {/* Meta tags para descrição */}
        <meta name="description" content="Solução Inovadora para Planejamento e Gestão de Micro e Pequenos Negócios." />

        {/* Meta tags para palavras-chave (keywords) */}
        <meta name="keywords" content="solução inovadora, planejamento, gestão, micro negócios, pequenos negócios" />

        {/* Meta tags para autor */}
        <meta name="author" content="ePlano" />

        {/* Meta tags para idioma */}
        <meta http-equiv="content-language" content="pt-br" />

        {/* Meta tag para viewport (responsividade) */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Meta tags para robots (rastreamento de mecanismos de busca) */}
        <meta name="robots" content="index, follow" />

        {/* Meta tag para Open Graph (Facebook, Twitter, etc.) */}
        <meta property="og:title" content={pageTitle || 'ePlano'} />
        <meta property="og:description" content="Solução Inovadora para Planejamento e Gestão de Micro e Pequenos Negócios." />
        <meta property="og:image" content="https://eplano.s3.sa-east-1.amazonaws.com/logo192.png" />
        <meta property="og:url" content="https://www.eplano.com.br" />
        <meta property="og:type" content="website" />

        {/* Meta tags para Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />  
        <meta name="twitter:title" content={pageTitle || 'ePlano'} />
        <meta name="twitter:description" content="Solução Inovadora para Planejamento e Gestão de Micro e Pequenos Negócios." />
        <meta name="twitter:image" content="https://eplano.s3.sa-east-1.amazonaws.com/logo192.png" />
      </Helmet>
    </div>
  );
};

export default CompHelmet;
