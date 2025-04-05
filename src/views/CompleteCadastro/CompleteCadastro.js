// src/components/Login/CadastroStep1.js
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import InputMask from 'react-input-mask';
import { API_BASE_URL } from '../../apiConfig';

import Select from "react-select";

import HeaderCadastro from '../../structure/HeaderCadastro/HeaderCadastro';
import { getFirestore, doc, getDoc, updateDoc, setDoc, collection, addDoc } from 'firebase/firestore';
import useAuth from '../../hooks/useAuth';

import './CompleteCadastro.scss';


const CompleteCadastro = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const userId = user ? user.uid : null;
  const [step, setStep] = useState(1);

  const [cnaeList, setCnaeList] = useState([]); // Lista de opções para o select
  const [selectedCnae, setSelectedCnae] = useState(null); // Estado do CNAE selecionado
  const [descricao, setDescricao] = useState(""); // Estado para descrição do CNAE

  
  useEffect(() => {
    if (userId) {
      // Fazer o GET na API usando o userId
      fetch(`${API_BASE_URL}/api/empresas/usuario/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          if (data && data[0]?.uidUser === userId) {
            // Se o uidUser na resposta for igual ao userId, exibe o alerta e redireciona
            alert('Você já possui um cadastro ativo');
            navigate('/minha-empresa');
          }
        })
        .catch((error) => {
          console.error('Erro ao buscar dados da empresa:', error);
        });
    }
  }, [userId, navigate]);
  


  const [userData, setUserData] = useState({
    codigo_cnae_principal: '',
    cnpj: "",
    uidUser: "",
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
  const opcoesNaturezaJuridica = [
    { value: 'MEI', label: 'MEI - Microempreendedor Individual' },
    { value: 'EI', label: 'EI - Empresário Individual' },
    { value: 'SA', label: 'SA - Sociedade Anônima' },
    { value: 'LTDA', label: 'LTDA - Sociedade Limitada' },
    { value: 'SLU', label: 'SLU - Sociedade Limitada Unipessoal' },
  ];
  
  const opcoesPorteEmpresa = [
    { value: 'ME', label: 'ME - Microempresa' },
    { value: 'EPP', label: 'EPP - Empresa de Pequeno Porte' },
    { value: 'DEMAIS', label: 'Demais portes' },
  ];

  const opcoesSegmentoEmpresa = [
    { value: 'COMERCIO', label: 'Comércio' },
    { value: 'INDUSTRIA', label: 'Indústria' },
    { value: 'SERVICOS', label: 'Serviços' },
    { value: 'OUTROS', label: 'Outros' },
  ];
  
  
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

  const isStepValid = () => {
    if (step === 1) {
      const nomeUsuario = userData?.nomeUsuario || '';
      const whatsapp = userData?.whatsapp || '';
  
      return (
        nomeUsuario.trim() !== '' &&
        !/[^a-zA-ZÀ-ú ]/.test(nomeUsuario) &&
        isNaN(nomeUsuario) &&
        whatsapp.trim() !== '' &&
        /^\d+$/.test(whatsapp.replace(/\D/g, ''))
      );
    }
  
    if (step === 2) {
      const company = userData?.company || '';
      const urlBase = userData?.urlBase || '';
      const cargo = userData?.cargo || 'Selecione';
      const setor = userData?.setor || 'Selecione';
  
      return (
        company.trim() !== '' &&
        urlBase.trim() !== '' &&
        cargo !== 'Selecione' &&
        setor !== 'Selecione'
      );
    }
  
    return true;
  };
  
  const handleNextStep = async (e) => {
    e.preventDefault();
  
    if (!isStepValid()) return;
  
    try {
      setIsLoading(true);
  
      if (step === 1) {
        await salvarDadosUsuario(); // salva step 1 no Firestore
      } else if (step === 2) {
        await salvarEmpresaEPerfil(); // salva step 2 no Firestore
      } else if (step === 3) {
        await salvarEmpresa(); // implementa essa função pra enviar os dados da empresa para sua API local
        // redirecionamento ou feedback final aqui, se quiser
      }
  
      if (step < 3) {
        setStep((prevStep) => prevStep + 1);
      }
  
    } catch (error) {
      console.error("Erro ao salvar dados:", error);
      setErrorMessage("Erro ao salvar os dados. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };
  

  const salvarDadosUsuario = async () => {
    if (!user) throw new Error("Usuário não logado");
  
    const firestore = getFirestore();
    const userDocRef = doc(firestore, 'users', user.uid);
  
    const updatedUserData = {
      nomeUsuario: userData.nomeUsuario,
      whatsapp: userData.whatsapp,
    };
  
    await updateDoc(userDocRef, updatedUserData);
    console.log("Usuário atualizado no step 1");
  };

  const salvarEmpresaEPerfil = async () => {
    if (!user) throw new Error("Usuário não logado");
  
    const firestore = getFirestore();
  
    const organizationCollection = collection(firestore, 'organization');
    const organizationDocRef = await addDoc(organizationCollection, {
      userId: user.uid,
      companyName: userData.company,
      urlBase: userData.urlBase,
    });
  
    const organizationId = organizationDocRef.id;
    await updateDoc(organizationDocRef, { organizationId });
    console.log("Organização criada e ID atualizado");
  
    const profileCollection = collection(firestore, 'profile');
    await addDoc(profileCollection, {
      userId: user.uid,
      organizationId,
      whatsapp: userData.whatsapp,
      cargo: userData.cargo,
      setor: userData.setor,
      userType: 1,
      status: 1,
    });
  
    const userDocRef = doc(firestore, 'users', user.uid);
    await updateDoc(userDocRef, { organizationId });
    console.log("Perfil e relação com organização salvos");
  
    // Limpa campos do formulário para o próximo step
    setUserData((prev) => ({
      ...prev,
      company: '',
      urlBase: '',
      cargo: 'Selecione',
      setor: 'Selecione',
    }));
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
      nome_fantasia: name === 'company' ? value : prevData.nome_fantasia,  // Aqui garantimos que 'nome_fantasia' será o mesmo que 'company'
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
        descricao_cnae_principal: selectedOption.label, // <-- Aqui está o ajuste
      }));
      setDescricao(selectedOption.label);
    } else {
      setUserData((prevData) => ({
        ...prevData,
        codigo_cnae_principal: "",
        descricao_cnae_principal: "",
      }));
      setDescricao("");
    }
  };

  const salvarEmpresa = async () => {
    setIsLoading(true);
    try {
      console.log("🧪 userData:", userData); // 👈 Veja o que realmente tem em cada campo
  
      const dadosParaEnviar = {
        ...userData,        
        uidUser: user.uid,
        cnpj: userData.cnpj.replace(/\D/g, ""),
        nome_fantasia: userData.nome_fantasia || "",  // nome_fantasia já está sendo capturado e enviado
        natureza_juridica: userData.natureza_juridica || "",
        porte_empresa: userData.porte_empresa || "",
        codigo_cnae_principal: userData.codigo_cnae_principal || selectedCnae?.value || "",
        descricao_cnae_principal: userData.descricao_cnae_principal || descricao || "",
        segmento_empresa: userData.segmento_empresa || ""
      };
  
      console.log("📦 Enviando para API:", dadosParaEnviar); // 👈 Aqui confirma antes do envio
  
      const response = await fetch(`${API_BASE_URL}/api/empresas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dadosParaEnviar)
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao salvar a empresa.");
      }
  
      navigate("/dashboard");
  
      setUserData({ ...userData, cnpj: "", nome_empresarial: "", nome_fantasia: "" });
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
  console.log("Step atual:", step);

  return (
    <div>
      <HeaderCadastro />
      <div className="content-container">   
        <div className="minhaconta-page">
      <form >
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
            <InputMask
              type='text'
              mask="(99) 99999-9999"
              maskChar={null}
              id="whatsapp"
              name="whatsapp"
              placeholder="Digite seu número de WhatsApp"
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
                placeholder="Nome Fantasia da Empresa"
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
            
            <div className="tributacao-opcoes">
              <label className="label-titulo">Regime de Tributação</label>

              <div className='tributacao-opcoes-botoes'>
                <label className={`tributacao-opcoes-checkbox ${userData.regime_tributario === 'SIMPLES' ? 'checked' : ''}`}>
                  <input
                    type="checkbox"
                    name="regime_tributario"
                    value="0"
                    checked={userData.regime_tributario === 'SIMPLES'}
                    onChange={() => setUserData({ ...userData, regime_tributario: 'SIMPLES' })}
                  />
                  Simples
                </label>

                <label className={`tributacao-opcoes-checkbox ${userData.regime_tributario === 'PRESUMIDO' ? 'checked' : ''}`}>
                  <input
                    type="checkbox"
                    name="regime_tributario"
                    value="1"
                    checked={userData.regime_tributario === 'PRESUMIDO'}
                    onChange={() => setUserData({ ...userData, regime_tributario: 'PRESUMIDO' })}
                  />
                  Presumido
                </label>

                <label className={`tributacao-opcoes-checkbox ${userData.regime_tributario === 'REAL' ? 'checked' : ''}`}>
                  <input
                    type="checkbox"
                    name="regime_tributario"
                    value="2"
                    checked={userData.regime_tributario === 'REAL'}
                    onChange={() => setUserData({ ...userData, regime_tributario: 'REAL' })}
                  />
                  Real
                </label>
              </div>
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
              <input
                placeholder='Razão Social'
                type="text"
                name="nome_empresarial"
                value={userData.nome_empresarial || ""}
                onChange={(e) => setUserData({ ...userData, nome_empresarial: e.target.value })}
              />
              {errors.nome_empresarial && <p className="error">{errors.nome_empresarial}</p>}
            </div>

            <div>
              <Select
                classNamePrefix="react-select"
                options={opcoesNaturezaJuridica}
                value={opcoesNaturezaJuridica.find(opt => opt.value === userData.natureza_juridica)}
                onChange={(selected) =>
                  setUserData({ ...userData, natureza_juridica: selected ? selected.value : '' })
                }
                placeholder="Selecione a Natureza Jurídica"
              />
              {errors.natureza_juridica && <p className="error">{errors.natureza_juridica}</p>}
            </div>

            <div>
              <Select
                classNamePrefix="react-select"
                options={opcoesPorteEmpresa}
                value={opcoesPorteEmpresa.find(opt => opt.value === userData.porte_empresa)}
                onChange={(selected) =>
                  setUserData({ ...userData, porte_empresa: selected ? selected.value : '' })
                }
                placeholder="Selecione o Porte da Empresa"
              />
              {errors.porte_empresa && <p className="error">{errors.porte_empresa}</p>}
            </div>


            <div>
              <Select
                classNamePrefix="react-select"
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

              {/* {descricao && (
                <div style={{ marginTop: "10px", padding: "10px", background: "#f4f4f4", borderRadius: "5px" }}>
                  <strong>Descrição do CNAE:</strong>
                  <p>{descricao}</p>
                </div>
              )} */}
            </div>


            
            <div>
              <input
                type="hidden"
                name="descricao_cnae_principal"
                placeholder="Descrição do CNAE"
                value={userData.descricao_cnae_principal}
                readOnly // Impede edição manual
              />
              {errors.descricao_cnae_principal && <p className="error">{errors.descricao_cnae_principal}</p>}
            </div>

            <div>
              <Select
                classNamePrefix="react-select"
                options={opcoesSegmentoEmpresa}
                value={opcoesSegmentoEmpresa.find(opt => opt.value === userData.segmento_empresa)}
                onChange={(selected) =>
                  setUserData({ ...userData, segmento_empresa: selected ? selected.value : '' })
                }
                placeholder="Selecione o Segmento da Empresa"
              />
              {errors.segmento_empresa && <p className="error">{errors.segmento_empresa}</p>}
            </div>


          </>
        )}

         <hr />

         <div className="flex justify-between gap-4 mt-4">
            <button 
              type="submit"
              disabled={!isStepValid() || isLoading}
              onClick={handleNextStep}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? "Carregando..." : step < 3 ? "Avançar" : "Concluir"}
            </button>

            {step > 1 && (
            
              <div className='footer-action'>
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    setStep(step - 1);
                  }}
                  disabled={isLoading}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 disabled:opacity-50"
                >
                  Voltar
                </a>
              </div>
            )}
          </div>





    </form>
    </div>

      </div>
    </div>
  );
};

export default CompleteCadastro;