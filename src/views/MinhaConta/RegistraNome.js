import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, updateDoc, setDoc, collection, addDoc } from 'firebase/firestore';
import useAuth from '../../hooks/useAuth';

import './MinhaConta.scss'

const RegistraNome = () => {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({
    nome: '',
    whatsapp: '',
    organizacao: '',
    cargo: '',
    setor: 'TI', // Setor padrão, ajuste conforme necessário
    isFranquia: 'nao', // Valor padrão para "Não", ajuste conforme necessário
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
      userData.nome.trim() !== '' &&
      !/[^a-zA-Z ]/.test(userData.nome) &&
      isNaN(userData.nome) &&
      userData.whatsapp.trim() !== '' &&
      /^\d+$/.test(userData.whatsapp)
    ) {
      const firestore = getFirestore();
      const userDocRef = doc(firestore, 'users', user.uid);

      try {
        const updatedUserData = {
          nome: userData.nome,
        };

        // Adiciona o nome da empresa e a URL base ao objeto de dados atualizado
        if (step === 2) {
          // Não adiciona company e urlBase aqui
        }

        // Atualiza dados do usuário na coleção 'users'
        await updateDoc(userDocRef, updatedUserData);

        if (step === 2) {
          // Adiciona informações à coleção 'organization' apenas no segundo passo
          const organizationCollection = collection(firestore, 'organization');
          const organizationDocRef = await addDoc(organizationCollection, {
            userId: user.uid,
            companyName: userData.company,
            urlBase: userData.urlBase,
            isFranquia: userData.isFranquia,
          });

          // Adiciona informações à coleção 'profile'
          const profileCollection = collection(firestore, 'profile');
          await addDoc(profileCollection, {
            userID: user.uid,
            organizationID: organizationDocRef.id,
            whatsapp: userData.whatsapp,
            cargo: userData.cargo,
            setor: userData.setor,
          });

          console.log('Dados do usuário e da organização editados com sucesso!');
        }

        // Limpa os campos após a edição bem-sucedida
        setUserData((prevData) => ({
          ...prevData,
          company: '',
          urlBase: '',
          cargo: 'Selecione',
          setor: 'Selecione',
          isFranquia: 'sim',
        }));

        // Avança para o próximo passo
        setStep((prevStep) => prevStep + 1);
      } catch (error) {
        console.error('Erro ao editar dados do usuário e da organização:', error);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
          // Recarrega a página ao concluir o segundo passo
          if (step === 2) {
            window.location.reload();
          }
        }, 3000);
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
                id="nome"
                name="nome"
                placeholder="Digite o seu nome completo"
                value={userData.nome}
                onChange={handleChange}
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
              <p>URL Base: {userData.urlBase}</p>
            </div>
            
            <div className='radio'>
              <label>
                É uma franquia?
                <input
                  type="radio"
                  id="isFranquiaSim"
                  name="isFranquia"
                  value="sim"
                  checked={userData.isFranquia === 'sim'}
                  onChange={handleChange}
                />
                <label htmlFor="isFranquiaSim">Sim</label>
                <input
                  type="radio"
                  id="isFranquiaNao"
                  name="isFranquia"
                  value="nao"
                  checked={userData.isFranquia === 'nao'}
                  onChange={handleChange}
                />
                <label htmlFor="isFranquiaNao">Não</label>
              </label>
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
         <button type="submit" disabled={isLoading}>
          {step === 1 ? 'Avançar' : 'Concluir'}
        </button>
      </form>
    </div>
  );
};

export default RegistraNome;
