import React from 'react'
import { hydrateRoot, createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { HelmetProvider } from 'react-helmet-async';

const rootElement = document.getElementById('root');

// Empaquetamos tu App con sus providers exactos
const appContent = (
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);

// La magia del SEO:
if (rootElement.hasChildNodes()) {
  // Si el HTML ya viene construido (Producción/Pre-render), lo "hidratamos"
  hydrateRoot(rootElement, appContent);
} else {
  // Si está vacío (Localhost), lo creamos desde cero normal
  const root = createRoot(rootElement);
  root.render(appContent);
}