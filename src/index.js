// frontend/src/index.js
import React from 'react';
import { createRoot } from 'react-dom';
import App from './App';
import './index.css';
import 'typeface-mulish'; 
import './assets/scss/global.scss';
import './assets/scss/Alertas.scss'; 
import './assets/scss/Buttons.scss'; 
import './assets/scss/react-modal.scss';
import './assets/scss/Widgets.scss'; 
import './assets/scss/spinner.scss'; 
import './assets/scss/Table.scss';
import './assets/scss/SideForm.scss'; 

const root = document.getElementById('root');
const reactRoot = createRoot(root);

reactRoot.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
