// frontend/src/components/CadastrarEmpresa.js
import React, { useState, useEffect } from 'react';
import { Link,useParams, useNavigate } from 'react-router-dom';
import { getFirestore, collection, setDoc, getDoc, doc, addDoc, getDocs, query, where, limit,orderBy } from 'firebase/firestore';
import useAuth from '../../hooks/useAuth';
import consultarCNPJ from 'consultar-cnpj';
import './ConsultaCnpj.scss';

const ConsultaCnpj = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [cnpjData, setCnpjData] = useState(null);
  const [cnpjInput, setCnpjInput] = useState('');
  const [cnpjExists, setCnpjExists] = useState(false);
  const [noEmpresasAlert, setNoEmpresasAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { ePlanoId } = useParams();
  const [organizationId, setOrganizationId] = useState(null); // Adicione o estado para armazenar o organizationId


  useEffect(() => {
    const fetchOrganizationId = async () => {
      try {
        const firestore = getFirestore();
        const usersCollection = collection(firestore, 'users');
  
        console.log('user.uid:', user.uid); // Log para verificar user.uid
  
        const userDoc = await getDoc(doc(usersCollection, user.uid));
        
        console.log('userDoc:', userDoc); // Log para verificar o userDoc
  
        if (userDoc.exists()) {
          const userData = userDoc.data();
          const organizationId = userData.organizationId;
  
          console.log('userData:', userData); // Log para verificar userData
          console.log('organizationId:', organizationId);
          
          setOrganizationId(organizationId);
        } else {
          console.warn('Usuário não encontrado na coleção users.');
        }
      } catch (error) {
        console.error('Erro ao buscar o organizationId:', error);
      }
    };
  
    fetchOrganizationId();
  }, [user]);
  
  

  const handleConsultaCNPJ = async () => {
    try {
      const data = await consultarCNPJ(cnpjInput);
      console.log('Dados do CNPJ:', data);
      setCnpjData(data);
      // Resetar o estado de existência do CNPJ ao consultar um novo CNPJ
      setCnpjExists(false);
    } catch (error) {
      console.error('Erro ao consultar CNPJ:', error);
    }
  };

  const handleCadastroEmpresa = async (e) => {
    e.preventDefault();
    setIsLoading(true); 
  
    const firestore = getFirestore();
    const empresasCollection = collection(firestore, 'empresas');
  
    try {
      // Verificar se a empresa já existe com o mesmo CNPJ
      if (cnpjData && cnpjData.estabelecimento && cnpjData.estabelecimento.cnpj) {
        const querySnapshot = await getDocs(
          query(empresasCollection, where('cnpj', '==', cnpjData.estabelecimento.cnpj))
        );
  
        if (querySnapshot.size > 0) {
          console.log('Empresa já cadastrada com o CNPJ:', cnpjData.estabelecimento.cnpj);
          // Configurar o estado para indicar que o CNPJ já existe
          setCnpjExists(true);
          return; // Adicionado para evitar a execução do código de cadastro se o CNPJ já existir
        } else {
          // Encontrar a empresa com a ordem mais alta
          const ordemMaisAltaQuerySnapshot = await getDocs(
            query(empresasCollection, orderBy('ordem', 'desc'), limit(1))
          );
  
          let ordemNovaEmpresa = 1;
  
          if (ordemMaisAltaQuerySnapshot.size > 0) {
            const ordemMaisAltaEmpresa = ordemMaisAltaQuerySnapshot.docs[0].data().ordem;
            // Atribuir a ordem seguinte
            ordemNovaEmpresa = ordemMaisAltaEmpresa + 1;
          }
          
          // Adicionar a empresa ao Firestore com status 1 e a ordem calculada
          const docRef = await addDoc(empresasCollection, {
            cnpj: cnpjData.estabelecimento.cnpj,
            dadosCNPJ: cnpjData,
            usuarioId: user.uid,
            organizationId: organizationId, //Puxar da coleção users do usuário logado
            simples: cnpjData.simples,
            estabelecimento: cnpjData.estabelecimento,
            status: 1, // Status ativo
            ordem: ordemNovaEmpresa, // Ordem calculada
          });
          
          // Adicionar ou atualizar o CNPJ na coleção ePlanosControle
          const ePlanosControleCollection = collection(firestore, 'ePlanosControle');
          const querySnapshot = await getDocs(
            query(ePlanosControleCollection, where('ePlanoId', '==', ePlanoId))
          );

          if (querySnapshot.size > 0) {
            // Se o documento já existir, atualize apenas o CNPJ, sem apagar outros campos
            const docId = querySnapshot.docs[0].id;
            const docData = querySnapshot.docs[0].data();
            await setDoc(doc(ePlanosControleCollection, docId), {
              ...docData,
              cnpjEplano: cnpjData.estabelecimento.cnpj,
              firstAccessEplano: 0,
            });
          } else {
            // Se o documento não existir, crie um novo com o CNPJ
            await addDoc(ePlanosControleCollection, {
              cnpjEplano: cnpjData.estabelecimento.cnpj,
              ePlanoId: ePlanoId, // Assumindo que você tem o ePlanoId disponível como parâmetro
            });
          }

          console.log('Empresa cadastrada com sucesso! Document ID:', docRef.id);
          navigate(-2);
        }
      } else {
        console.warn('CNPJ inválido:', cnpjData);
      }
    } catch (error) {
      console.error('Erro ao cadastrar/verificar a empresa:', error);
    } finally {
      // Use setTimeout to delay setting isLoading to false
      setTimeout(() => {
        setIsLoading(false); // Define isLoading como false após a edição dos dados (seja bem-sucedida ou não)
      }, 2000); // 3000 milliseconds = 3 seconds
    }
  };
  useEffect(() => {
    const checkEmpresas = async () => {
      const firestore = getFirestore();
      const empresasCollection = collection(firestore, 'empresas');

      try {
        const querySnapshot = await getDocs(empresasCollection);

        if (querySnapshot.size === 0) {
          // Não há empresas cadastradas, exibir alerta
          setNoEmpresasAlert(true);
        }
      } catch (error) {
        console.error('Erro ao verificar empresas:', error);
      }
    };

    checkEmpresas();
  }, []);

  return (
    <div>
      <form onSubmit={handleCadastroEmpresa}>
        <div>
          <input
            type="text"
            id="cnpj"
            name="cnpj"
            value={cnpjInput}
            onChange={(e) => setCnpjInput(e.target.value)}
            required
            placeholder='Insira o CNPJ da empresa'
          />
          {!cnpjData && (
            <div>
              <button type="submit" onClick={handleConsultaCNPJ} disabled={isLoading}>
                {isLoading ? 'Buscando...' : 'Avançar'}
              </button>

              <hr />
              <div className='nova-consulta'>
                <Link to='/dashboard'>
                  Iniciar sem cnpj por enquanto
                </Link>
              </div>
            </div>
          )}

        </div>
        {cnpjData && (
          <div>
            <div>
              <p><b>Razão Social:</b> {cnpjData.razao_social}</p>
            </div>
            <div>
              <p>
                <b>Endereço:</b> {cnpjData.estabelecimento.tipo_logradouro}{' '}
                {cnpjData.estabelecimento.logradouro}, {cnpjData.estabelecimento.numero}{' '}
                {cnpjData.estabelecimento.complemento
                  ? '- ' + cnpjData.estabelecimento.complemento
                  : ''}, {cnpjData.estabelecimento.bairro} - CEP {cnpjData.estabelecimento.cep}
              </p>
            </div>

              <button type="submit" disabled={isLoading}>
                {isLoading ? '...' : 'Avançar'}
              </button>
            <hr />
            <div className='nova-consulta'>
              <Link onClick={() => { setCnpjData(null); setCnpjInput(''); }}>
                Nova Consulta
              </Link>
            </div>

          </div>
        )}
      </form>
    </div>
  );
};

export default ConsultaCnpj;
