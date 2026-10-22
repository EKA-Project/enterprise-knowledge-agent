// main.jsx
// Entry point — mounts the React app into the #root div from index.html

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
// Holds the selected mascot (byte/orbit) for the whole app
import { MascotProvider } from "./context/MascotContext.jsx";

// Variables first so base & layout can use CSS custom properties
import "./styles/variables.css";
import "./styles/base.css";
import "./styles/layout.css";

// TEMPORARY: sets data-theme on <html> until the Appearance settings exist
import "./theme.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <MascotProvider>
        <App />
      </MascotProvider>
    </BrowserRouter>
  </StrictMode>,
);
