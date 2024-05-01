// getTitleUtil.js
const getTitle = (pathname) => {
    switch (pathname) {
        case '/dashboard':
            return 'Dashboard';
        case '/eplano/criar':
            return 'Criar ePlano';
        case '/empresa':
            return 'Gerenciar Empresas';
        case '/cursos':
            return 'Cursos';
        case '/financeiro':
            return 'Painel Financeiro';
        case '/minha-conta':
            return 'Minha Conta';
      default:
        return 'ePlano Financeiro';
    }
  };
  
  export default getTitle;
  