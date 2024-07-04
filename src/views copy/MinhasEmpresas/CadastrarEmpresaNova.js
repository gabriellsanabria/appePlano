import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import HeaderCadastro from '../../structure/HeaderCadastro/HeaderCadastro';
import ConsultaCnpj from '../../components/ApiCnpj/ConsultaCnpj';
import '../../views/CadastroSteps/CadastroSteps.scss';

const CadastrarEmpresaNova = () => {
  const [mensagemErro, setMensagemErro] = useState('');
  const navigate = useNavigate();
  const { ePlanoId } = useParams(); // Obtendo o ePlanoId da URL

  // Função para verificar o ePlanoId na coleção
  const verificarEPlanoIdNaColecao = async (ePlanoId) => {
    // Substitua isso pela lógica real de verificação
    // Exemplo fictício - sempre retorna verdadeiro
    return true;
  };

  const handleCadastro = async (e) => {
    e.preventDefault();
    // Restante do código permanece inalterado
  };

  // Função chamada quando o link de autenticação é enviado
  const handleMagicLinkSent = (email) => {
    console.log('Link de autenticação enviado para o e-mail:', email);
  };

  useEffect(() => {
    // Aqui você pode fazer a verificação na coleção ePlanosControle
    // Certifique-se de substituir 'suaFuncaoDeVerificacao' pela lógica real de verificação

    const suaFuncaoDeVerificacao = async () => {
      // Lógica para verificar se o ePlanoId da URL é igual ao ePlanoId da coleção
      // Utilizando a função que acabamos de criar
      const ePlanoIdValido = await verificarEPlanoIdNaColecao(ePlanoId);

      if (ePlanoIdValido) {
        // Se o ePlanoId for válido, emita um alerta com o valor do ePlanoId
        // alert(`ID do ePlano válido! Valor: ${ePlanoId}`);
        // Aqui você pode tomar outras ações necessárias
      } else {
        // setMensagemErro('ID do ePlano inválido');
        // Aqui você pode redirecionar o usuário ou tomar outras ações necessárias
      }
    };

    suaFuncaoDeVerificacao();
  }, [ePlanoId]);

  return (
    <div>
      <HeaderCadastro />
      <div className="content-container">
        <h1>Vamos começar</h1>
        <p>Informe o CNPJ da empresa para criar um plano de negócio ePlano.</p>
        
        <ConsultaCnpj />
        
      </div>
    </div>
  );
};

export default CadastrarEmpresaNova;
