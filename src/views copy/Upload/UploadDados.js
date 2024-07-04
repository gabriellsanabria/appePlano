// frontend/src/pages/UploadDados.js
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, collection, addDoc, doc, setDoc } from 'firebase/firestore';
import firebaseApp from '../../config/firebaseConfig';
import Layout from '../../components/Layout/layout';
const XLSX = require('xlsx'); // Importação usando sintaxe CommonJS

const UploadDados = () => {
  const [uploadedFile, setUploadedFile] = useState(null);

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];

    // Upload do arquivo para o Storage do Firebase
    const storage = getStorage(firebaseApp);
    const storageRef = ref(storage, `uploads/${file.name}`);
    await uploadBytes(storageRef, file);

    // Obter a URL do arquivo no Storage do Firebase
    const fileUrl = await getDownloadURL(storageRef);

    // Processar o arquivo Excel para extrair dados
    const workbook = XLSX.read(await file.arrayBuffer(), { type: 'array' });
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    const data = XLSX.utils.sheet_to_json(worksheet);

    // Adicionar os dados ao Firestore
    const db = getFirestore(firebaseApp);

    // Para cada linha de dados
    for (const row of data) {
      // Converta o faturamento para número, se existir
      if (row.faturamento_ifood) {
        row.faturamento_ifood = parseFloat(row.faturamento_ifood);
      }

      // Adicionar as colunas necessárias à coleção "sales"
      const salesData = {
        saleId: row.saleId || null,
        appId: row.appId || null,
        restaurantId: row.restaurantId || null,
        organizationId: row.organizationId || null,
        organizationName: row.organizationName || null,
        unitName: row.unitName || null,
        consultorId: row.consultorId || null,
        amount: row.amount || null,
        qtdPedidos: row.qtdPedidos || null,
        timestamp: row.timestamp || new Date().toISOString(),
        ...row, // Adiciona os dados existentes à coleção
      };

      // Adicionar os dados à coleção "sales"
      const salesCollection = collection(db, 'sales');
      await addDoc(salesCollection, salesData);
    }

    setUploadedFile(file);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <Layout>
      <div className='dashboard-page'>
        <div className='dashboard-content'>
          <h1>Meus Dashboards</h1>

          <div {...getRootProps()} style={{ border: '1px dashed #ccc', padding: '20px', marginTop: '20px' }}>
            <input {...getInputProps()} />
            <p>Arraste e solte um arquivo Excel aqui, ou clique para selecionar.</p>
          </div>

          {uploadedFile && (
            <div>
              <p>Arquivo carregado: {uploadedFile.name}</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default UploadDados;
