// main.jsx
// Entry point — mounts the React app into the #root div from index.html

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';

// Variables first so base & layout can use CSS custom properties
import './styles/variables.css';
import './styles/base.css';
import './styles/layout.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
