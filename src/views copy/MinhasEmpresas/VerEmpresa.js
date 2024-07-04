import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Popover from '@mui/material/Popover';
import { getFirestore, collection, getDocs, query, where, updateDoc, doc } from 'firebase/firestore';
import useAuth from '../../hooks/useAuth';
import Layout from '../../components/Layout/layout';
import './VerEmpresa.scss'; // Importe o arquivo SCSS

const VerEmpresa = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [empresas, setEmpresas] = useState([]);
  const [erro, setErro] = useState(null);
  const navigate = useNavigate();
  const [popoverEmpresa, setPopoverEmpresa] = useState(null);

  const handleOptionsClick = (event, empresa) => {
    setPopoverEmpresa({ empresa, anchorEl: event.currentTarget });
  };

  const handleClosePopover = () => {
    setPopoverEmpresa(null);
  };

  const buscarEmpresasDoUsuario = async () => {
    setLoading(true);

    if (!user) {
      setLoading(false);
      return;
    }

    const firestore = getFirestore();
    const empresasCollection = collection(firestore, 'empresas');

    const q = query(empresasCollection, where('usuarioId', '==', user.uid));

    try {
      const querySnapshot = await getDocs(q);
      const empresasDoUsuario = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setEmpresas(empresasDoUsuario.filter(empresa => empresa.status !== 0));
      setErro(null);
    } catch (error) {
      console.error('Erro ao buscar empresas do usuário:', error);
      setEmpresas([]);
      setErro('Erro ao buscar empresas. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  const handleExcluirEmpresa = async (empresaId) => {
    const firestore = getFirestore();
    const empresaDocRef = doc(firestore, 'empresas', empresaId);

    try {
      await updateDoc(empresaDocRef, {
        status: 0,
      });

      buscarEmpresasDoUsuario();
      window.location.reload();
    } catch (error) {
      console.error('Erro ao excluir empresa:', error);
    }
  };

  const tornarEmpresaPrincipal = async (empresaId) => {
    const firestore = getFirestore();
    const empresaDocRef = doc(firestore, 'empresas', empresaId);

    try {
      const empresasDoUsuario = empresas.map((e) =>
        e.id === empresaId ? { ...e, isPrincipal: true } : { ...e, isPrincipal: false }
      );
      setEmpresas(empresasDoUsuario);

      await updateDoc(empresaDocRef, {
        isPrincipal: true,
      });
    } catch (error) {
      console.error('Erro ao tornar a empresa principal:', error);
    }
  };

  useEffect(() => {
    buscarEmpresasDoUsuario();
  }, [user]);

  return (
    <Layout>
      <div className="ver-empresas-container">
        {loading && <p>Carregando Empresas...</p>}
        {erro && <p>{erro}</p>}
        {!loading && !erro && (
          <div className="empresas-grid">
            {empresas.map((empresa) => (
              <div key={empresa.cnpj} className="empresa-item">
                <div className="options-button" onClick={(event) => handleOptionsClick(event, empresa)}>
                  <span>&#8942;</span>
                </div>
                <strong>Nome:</strong> {empresa.dadosCNPJ.razao_social} | <strong>CNPJ:</strong> {empresa.estabelecimento.cnpj}
                <p>{empresa.isPrincipal ? 'Empresa Principal' : ''}</p>
                <div className="botoes-empresa">
                  <Link to={`/eplano/criar`}>Criar Plano de Negócios</Link>
                </div>
              </div>
            ))}
          </div>
        )}
        {!loading && !erro && (
          <Link to='/empresa/cadastro/nova'>Cadastrar + Empresa</Link>
        )}
        <Popover
          open={Boolean(popoverEmpresa)}
          anchorEl={popoverEmpresa?.anchorEl}
          onClose={handleClosePopover}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <div className="popover-content">
            <Link onClick={() => tornarEmpresaPrincipal(popoverEmpresa?.empresa.id)}>Virar Empresa Principal</Link>
            <Link onClick={() => handleExcluirEmpresa(popoverEmpresa?.empresa.id)}>Deletar Empresa</Link>
          </div>
        </Popover>
      </div>
    </Layout>
  );
};

export default VerEmpresa;
