// frontend/src/index.js
import React from 'react';
import { createRoot } from 'react-dom';
import App from './App';
import './index.css';
import 'typeface-mulish'; // Importe a fonte Mulish
import './assets/scss/global.scss'; // Importe o arquivo SCSS global
import './assets/scss/Buttons.scss'; // Importe o arquivo SCSS global
import './assets/scss/react-modal.scss'; // Importe o arquivo SCSS global
import './assets/scss/Widgets.scss'; // Importe o arquivo SCSS global
import './assets/scss/spinner.scss'; // Importe o arquivo SCSS global

const root = document.getElementById('root');
const reactRoot = createRoot(root);

reactRoot.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
