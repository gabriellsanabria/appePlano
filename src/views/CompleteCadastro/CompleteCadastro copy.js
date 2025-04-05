// src/components/Login/CadastroStep1.js
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Select from "react-select";

import HeaderCadastro from '../../structure/HeaderCadastro/HeaderCadastro';
import { getFirestore, doc, getDoc, updateDoc, setDoc, collection, addDoc } from 'firebase/firestore';
import useAuth from '../../hooks/useAuth';

import './CompleteCadastro.scss';


const CompleteCadastro = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  
  const [cnaeList, setCnaeList] = useState([]); // Lista de opções para o select
  const [selectedCnae, setSelectedCnae] = useState(null); // Estado do CNAE selecionado
  const [descricao, setDescricao] = useState(""); // Estado para descrição do CNAE


  const [userData, setUserData] = useState({
    codigo_cnae_principal: '',
    cnpj: "",
    uidUser: "uid_exemplo_firebase",
    nome_empresarial: "",
    nome_fantasia: "",
    natureza_juridica: "",
    porte_empresa: "",
    optante_simples: false,
    optante_mei: false,
    codigo_cnae_principal: "",
    descricao_cnae_principal: "",
    segmento_empresa: "",
    id_faixa_simples_nacional: 1
  });

  const [errors, setErrors] = useState({});
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

  useEffect(() => {
    const fetchCnaes = async () => {
      try {
        const response = await fetch(
          "https://servicodados.ibge.gov.br/api/v2/cnae/classes"
        );
        const data = await response.json();

        if (Array.isArray(data)) {
          // Transformando o JSON no formato esperado pelo react-select
          const formattedCnaes = data.map((cnae) => ({
            value: cnae.id.padStart(7, "0"),
            label: `${cnae.id} - ${cnae.descricao}`,
            descricao: cnae.descricao, // Armazena a descrição completa
          }));

          setCnaeList(formattedCnaes);
          console.log("CNAE List carregado:", formattedCnaes);

        } else {
          console.error("Formato inesperado da API do IBGE", data);
          setCnaeList([]);
        }
      } catch (error) {
        console.error("Erro ao buscar CNAEs:", error);
        setCnaeList([]);
      }
    };

    fetchCnaes();
  }, []);

  // Atualiza a descrição quando o usuário seleciona um CNAE
  const handleChangeCnae = (selectedOption) => {
    setSelectedCnae(selectedOption);
  
    if (selectedOption) {
      setUserData((prevData) => ({
        ...prevData,
        codigo_cnae_principal: selectedOption.value,
        descricao_cnae_principal: selectedOption.descricao,
      }));
      setDescricao(selectedOption.descricao);
    } else {
      setUserData((prevData) => ({
        ...prevData,
        codigo_cnae_principal: "",
        descricao_cnae_principal: "",
      }));
      setDescricao("");
    }
  };
  
  

  const validate = () => {
    let newErrors = {};

    if (!userData.cnpj || userData.cnpj.length !== 14 || !/^\d{14}$/.test(userData.cnpj)) {
      newErrors.cnpj = "CNPJ inválido. Deve conter 14 dígitos numéricos.";
    }
    if (!userData.nome_empresarial) {
      newErrors.nome_empresarial = "Nome empresarial é obrigatório.";
    }
    if (!userData.nome_fantasia) {
      newErrors.nome_fantasia = "Nome fantasia é obrigatório.";
    }
    if (!userData.natureza_juridica) {
      newErrors.natureza_juridica = "Natureza jurídica é obrigatória.";
    }
    if (!userData.porte_empresa) {
      newErrors.porte_empresa = "Porte da empresa é obrigatório.";
    }
    if (!userData.descricao_cnae_principal) {
      newErrors.descricao_cnae_principal = "Descrição do CNAE é obrigatória.";
    }
    if (!userData.segmento_empresa) {
      newErrors.segmento_empresa = "Segmento da empresa é obrigatório.";
    }
    if (!/^\d{7}$/.test(userData.codigo_cnae_principal)) {
      newErrors.codigo_cnae_principal = "Código CNAE deve conter exatamente 7 dígitos numéricos.";
    }
    

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const salvarEmpresa = async () => {
    // if (!validate()) {
    //   return;
    // }

    setIsLoading(true);
    try {
      const dadosParaEnviar = {
        ...userData,
        cnpj: userData.cnpj.replace(/\D/g, "") // sobrescreve só o campo CNPJ
      };
      
      const response = await fetch("http://localhost:5000/api/empresas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dadosParaEnviar)
      });

      if (!response.ok) {
        throw new Error("Erro ao salvar a empresa.");
      }

      navigate("/dashboard");

      setUserData({ ...userData, cnpj: "", nome_empresarial: "", nome_fantasia: "" }); // Resetando alguns campos
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  const formatarCNPJ = (valor) => {
    return valor
      .replace(/\D/g, "") // Remove tudo que não for número
      .replace(/^(\d{2})(\d)/, "$1.$2")
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2")
      .slice(0, 18); // Garante que não passa do limite
  };
  
  const handleChangeCnpj = (e) => {
    const rawValue = e.target.value;
    const onlyNumbers = rawValue.replace(/\D/g, "");
    const formatted = formatarCNPJ(rawValue);
  
    setUserData((prevData) => ({
      ...prevData,
      cnpj: formatted,
      cnpj_puro: onlyNumbers, // opcional: armazena versão "limpa" também
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
          <p>Antes de continuar, forneça-nos algumas informações</p>
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
        {step === 3 && (
          <>
            <h2>Informações da Conta</h2>
            <p>Conte um pouco mais sobre a sua empresa</p>

            <div>
              <label>Nome Empresarial:</label>
              <input
                type="text"
                name="nome_empresarial"
                value={userData.nome_empresarial || ""}
                onChange={(e) => setUserData({ ...userData, nome_empresarial: e.target.value })}
              />
              {errors.nome_empresarial && <p className="error">{errors.nome_empresarial}</p>}
            </div>


            <div>
              <input
                type="text"
                name="cnpj"
                placeholder="CNPJ"
                value={userData.cnpj}
                onChange={handleChangeCnpj}
              />
              {errors.cnpj && <p className="error">{errors.cnpj}</p>}
            </div>


            <div>
              <select
                name="natureza_juridica"
                value={userData.natureza_juridica}
                onChange={(e) => setUserData({ ...userData, natureza_juridica: e.target.value })}
              >
                <option value="">Selecione a Natureza Jurídica</option>
                <option value="MEI">MEI - Microempreendedor Individual</option>
                <option value="EI">EI - Empresário Individual</option>
                <option value="SA">SA - Sociedade Anônima</option>
                <option value="LTDA">LTDA - Sociedade Limitada</option>
                <option value="SLU">SLU - Sociedade Limitada Unipessoal</option>
              </select>
              {errors.natureza_juridica && <p className="error">{errors.natureza_juridica}</p>}
            </div>


            <div>
              <select
                name="porte_empresa"
                value={userData.porte_empresa}
                onChange={(e) =>
                  setUserData({ ...userData, porte_empresa: e.target.value })
                }
              >
                <option value="">Selecione o Porte da Empresa</option>
                <option value="ME">ME - Microempresa</option>
                <option value="EPP">EPP - Empresa de Pequeno Porte</option>
                <option value="DEMAIS">Demais portes</option>
              </select>

              {errors.porte_empresa && <p className="error">{errors.porte_empresa}</p>}
            </div>

            <div>
              <label>Selecione um Código CNAE:</label>
              <Select
                options={cnaeList}
                value={selectedCnae}
                onChange={handleChangeCnae}
                placeholder="Escolha um CNAE..."
                isSearchable
                isClearable
              />
              {errors.codigo_cnae_principal && (
                <p className="error">{errors.codigo_cnae_principal}</p>
              )}

              {descricao && (
                <div style={{ marginTop: "10px", padding: "10px", background: "#f4f4f4", borderRadius: "5px" }}>
                  <strong>Descrição do CNAE:</strong>
                  <p>{descricao}</p>
                </div>
              )}
            </div>


            
            <div>
              <input
                type="text"
                name="descricao_cnae_principal"
                placeholder="Descrição do CNAE"
                value={userData.descricao_cnae_principal}
                readOnly // Impede edição manual
              />
              {errors.descricao_cnae_principal && <p className="error">{errors.descricao_cnae_principal}</p>}
            </div>

            <div>
              <select
                name="segmento_empresa"
                value={userData.segmento_empresa}
                onChange={(e) => setUserData({ ...userData, segmento_empresa: e.target.value })}
              >
                <option value="">Selecione o Segmento da Empresa</option>
                <option value="COMERCIO">Comércio</option>
                <option value="INDUSTRIA">Indústria</option>
                <option value="SERVICOS">Serviços</option>
                <option value="OUTROS">Outros</option>
              </select>
              {errors.segmento_empresa && <p className="error">{errors.segmento_empresa}</p>}
            </div>



            <div>
              <label>
                <input
                  type="checkbox"
                  checked={userData.optante_simples}
                  onChange={() => setUserData({ ...userData, optante_simples: !userData.optante_simples })}
                />
                Optante do Simples Nacional
              </label>

              <label>
                <input
                  type="checkbox"
                  checked={userData.optante_mei}
                  onChange={() => setUserData({ ...userData, optante_mei: !userData.optante_mei })}
                />
                Optante MEI
              </label>
            </div>
          </>
        )}

         <hr />

          <button 
            type="submit" 
            disabled={isLoading} 
            onClick={(e) => {
              e.preventDefault();
              if (step === 1) {
                setStep(2);
              } else if (step === 2) {
                setStep(3);
              } else if (step === 3) {
                salvarEmpresa();
              }
            }}
          >
            {step < 3 ? 'Avançar' : 'Concluir'}
          </button>

    </form>
    </div>

      </div>
    </div>
  );
};

export default CompleteCadastro;