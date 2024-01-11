// config.js na raiz do projeto
const isAmplify = process.env.REACT_APP_BASE_URL_AMPLIFY !== undefined;

const baseUrls = {
  local: process.env.REACT_APP_BASE_URL_LOCAL || 'http://localhost:3100',
  amplify: process.env.REACT_APP_BASE_URL_AMPLIFY || 'https://apps.eplano.com.br',
};

// Exporte a URL base diretamente
const baseUrl = isAmplify ? baseUrls.amplify : baseUrls.local;

module.exports = baseUrl;
