// src/components/Login/CadastroStep1.js
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import HeaderCadastro from '../../structure/HeaderCadastro/HeaderCadastro';
import { getFirestore, doc, getDoc, updateDoc, setDoc, collection, addDoc } from 'firebase/firestore';
import useAuth from '../../hooks/useAuth';

import './CompleteCadastro.scss';


const CompleteCadastro = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({
    nome: '',
    whatsapp: '',
    organizacao: '',
    cargo: '',
    setor: 'TI', // Setor padrão, ajuste conforme necessário
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const setoresSugeridos = ['Selecione seu setor', 'TI', 'Vendas', 'Marketing', 'Recursos Humanos', 'Produção', 'Financeiro', 'Outro'];
  const cargosSugeridos = ['Selecione seu cargo', 'Diretor(a)', 'Gerente', 'Coordenador', 'Analista', 'Assistente', 'Freelancer', 'Outro'];

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const firestore = getFirestore();
        const userDocRef = doc(firestore, 'users', user.uid);

        try {
          const userDocSnapshot = await getDoc(userDocRef);

          if (userDocSnapshot.exists()) {
            const userDataFromFirestore = userDocSnapshot.data();
            setUserData(userDataFromFirestore);
          } else {
            console.log('Documento do usuário não encontrado no Firestore');
          }
        } catch (error) {
          console.error('Erro ao buscar dados do usuário:', error);
        }
      }
    };

    fetchUserData();
  }, [user]);

  const handleEditAccount = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (
      user &&
      userData.nomeUsuario.trim() !== '' &&
      !/[^a-zA-Z ]/.test(userData.nomeUsuario) &&
      isNaN(userData.nomeUsuario) &&
      userData.whatsapp.trim() !== '' &&
      /^\d+$/.test(userData.whatsapp)
    ) {
      const firestore = getFirestore();
      const userDocRef = doc(firestore, 'users', user.uid);

      setIsLoading(false);
      try {
        const updatedUserData = {
          nomeUsuario: userData.nomeUsuario,
          // Adicione aqui os campos que deseja atualizar ou manter na coleção 'users'
        };
      
        // Atualiza dados do usuário na coleção 'users'
        await updateDoc(userDocRef, updatedUserData);
      
        if (step === 2) {
          const organizationCollection = collection(firestore, 'organization');
          const organizationDocRef = await addDoc(organizationCollection, {
            userId: user.uid,
            companyName: userData.company,
            urlBase: userData.urlBase,
          });
          
          // Obtém o ID do documento recém-criado
          const organizationId = organizationDocRef.id;
          
          // Atualiza o campo organizationId com o ID do documento
          await updateDoc(organizationDocRef, { organizationId: organizationId });
          
      
          // Adiciona informações à coleção 'profile'
          const profileCollection = collection(firestore, 'profile');
          await addDoc(profileCollection, {
            userId: user.uid,
            organizationId: organizationDocRef.id,
            whatsapp: userData.whatsapp,
            cargo: userData.cargo,
            setor: userData.setor,
            userType: 1, // Indica que o usuário é a conta master da empresa
            status: 1, // Indica que ele está ativo no sistema
          });
      
          // Atualiza o campo 'organizationId' na coleção 'users' com a referência ao documento da 'organization'
          await updateDoc(userDocRef, { organizationId: organizationDocRef.id });
      
          setIsLoading(false);
          console.log('Dados do usuário e da organização editados com sucesso!');
          navigate('/dashboard');
        }
      
        // Limpa os campos após a edição bem-sucedida
        setUserData((prevData) => ({
          ...prevData,
          company: '',
          urlBase: '',
          cargo: 'Selecione',
          setor: 'Selecione',
        }));
      
        // Avança para o próximo passo
        setStep((prevStep) => prevStep + 1);
      } catch (error) {
        console.error('Erro ao editar dados do usuário e da organização:', error);
      }
      
    } else {
      setErrorMessage('Preencha todos os campos corretamente.');
      setIsLoading(false);
    }
  };


  const handleChange = (e) => {
    setErrorMessage('');
    const { name, value, type } = e.target;

    // Converte o valor do campo de rádio para um booleano
    const fieldValue = type === 'checkbox' ? e.target.checked : value;

    setUserData((prevData) => ({
      ...prevData,
      [name]: fieldValue,
      // Gera automaticamente a URL base a partir do nome da empresa
      urlBase: name === 'company' ? value.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '') : prevData.urlBase,
    }));
  };



  return (
    <div>
      <HeaderCadastro />
      <div className="content-container">   
        <div className="minhaconta-page">
      <form onSubmit={handleEditAccount}>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {step === 1 && (
          <>
          <h2>Complete o seu cadastro</h2>
          <p>Antes de criar seus dashs, forneça algumas informações</p>
            <div>
              <input
                  type="text"
                  id="nomeUsuario"
                  name="nomeUsuario"
                  value={userData.nomeUsuario}
                  onChange={(e) => {
                    // Lógica para atualizar userData.nomeUsuario conforme necessário
                  }}
                  disabled={userData.nomeUsuario !== ''}
                />
            </div>
            <div>
              <input
                type="text"
                id="whatsapp"
                name="whatsapp"
                placeholder="Digite seu número de WhatsApp (apenas números)"
                value={userData.whatsapp}
                onChange={handleChange}
              />
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <h2>Informações da Conta</h2>
            <p>Conte um pouco mais sobre a sua empresa</p>
            <div>
              <input
                type="text"
                id="company"
                name="company"
                placeholder="Nome da empresa"
                value={userData.company}
                onChange={handleChange}
              />
            </div>
            <div>
              <select id="cargo" name="cargo" value={userData.cargo} onChange={handleChange}>
                {cargosSugeridos.map((cargo) => (
                  <option key={cargo} value={cargo}>
                    {cargo}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>
                <select id="setor" name="setor" value={userData.setor} onChange={handleChange}>
                  {setoresSugeridos.map((setor) => (
                    <option key={setor} value={setor}>
                      {setor}
                    </option>
                  ))}
                </select>
              </label>
            </div>

          </>
        )}
        <hr />
         <button type="submit" disabled={isLoading}>
          {step === 1 ? 'Avançar' : 'Concluir'}
        </button>
      </form>
    </div>

      </div>
    </div>
  );
};

export default CompleteCadastro;