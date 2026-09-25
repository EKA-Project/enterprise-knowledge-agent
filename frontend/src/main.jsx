// main.jsx
// Entry point — mounts the React app into the #root div from index.html

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './app.jsx';
import './styles/base.css'
import './styles/layout.css'
import './styles/variables.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
