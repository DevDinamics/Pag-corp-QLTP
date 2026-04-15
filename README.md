# 🚀 Qualtop Web App - Plataforma de Transformación Digital

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![FramerMotion](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer&logoColor=blue)
![Threejs](https://img.shields.io/badge/Three.js-black?style=for-the-badge&logo=three.js&logoColor=white)
![Sanity](https://img.shields.io/badge/Sanity.io-F36458?style=for-the-badge&logo=sanity&logoColor=white)

Plataforma corporativa (Single Page Application) desarrollada para **Qualtop**. Diseñada para transmitir innovación y liderazgo en el sector tecnológico mediante una experiencia inmersiva, interfaces 3D, animaciones físicas y un rendimiento de vanguardia.

## ✨ Características Principales (Core Features)

- **Experiencia Inmersiva (UI/UX Avanzada):** Implementación de *Glassmorphism*, layouts dinámicos y transiciones fluidas de página sin recargas.
- **Renderizado 3D de Alto Rendimiento:** Fondos interactivos utilizando `@react-three/fiber` con post-procesamiento (`Bloom`), optimizados para mantener 60 FPS bloqueando el Device Pixel Ratio (DPR).
- **Blog Dinámico (Headless CMS):** Integración completa con **Sanity.io** para la gestión de artículos, con tipografía responsiva milimétrica y cálculo automático de tiempo de lectura.
- **Scroll Físico y Cinemático:** - *Manifesto:* Reproductor de video customizado con "Modo Cine" inteligente y controles flotantes responsivos.
  - *Valores:* Viaje espacial 3D controlado por el scroll del usuario, utilizando posicionamiento radial y máscaras de degradado.
- **SEO Ready:** Gestión de metadatos dinámicos y Open Graph (OG) utilizando `react-helmet-async` para optimizar la visualización al compartir en redes sociales (LinkedIn, X).


## 🛠️ Stack Tecnológico

### Frontend
* **Core:** React.js (v18+)
* **Enrutamiento:** React Router DOM
* **Estilos:** Tailwind CSS (Utility-first framework)
* **Animaciones:** Framer Motion
* **Motor 3D:** React Three Fiber (`@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`)
* **Iconografía:** Lucide React

### Backend / CMS
* **Headless CMS:** Sanity.io
* **Procesamiento de Texto:** `@portabletext/react`


## ⚙️ Estructura del Proyecto

La arquitectura del proyecto está modularizada para facilitar la escalabilidad:

```text
src/
├── assets/          # Imágenes estáticas, videos y recursos locales
├── components/      # Componentes UI reutilizables (Navbar, Footer, Buttons)
├── pages/           # Vistas principales (Home, Blog, Manifesto, Valores)
├── client.js        # Configuración del cliente de conexión con Sanity.io
└── App.js           # Configuración de Rutas (React Router) y Core Layout

🚀 Guía de Inicio Rápido (Local Development)
Sigue estos pasos para levantar el entorno de desarrollo en tu máquina local.
1. Prerrequisitos
Asegúrate de tener instalado:
 * Node.js (v16.0 o superior)
 * npm o yarn
2. Instalación
Clona este repositorio e instala las dependencias:
# Clonar el repositorio
git clone [https://github.com/tu-usuario/qualtop-web.git](https://github.com/tu-usuario/qualtop-web.git)

# Entrar al directorio
cd qualtop-web

# Instalar dependencias
npm install

3. Variables de Entorno (.env)
Crea un archivo .env en la raíz del proyecto y agrega las credenciales necesarias para los servicios de terceros (Sanity, EmailJS, etc.):
VITE_SANITY_PROJECT_ID=tu_project_id_aqui
VITE_SANITY_DATASET=production
# Agregar llaves de EmailJS si aplica

4. Iniciar el Servidor de Desarrollo
Ejecuta el siguiente comando para levantar el servidor con Vite:
npm run dev

La aplicación estará disponible en http://localhost:5173.
🧠 Desafíos Técnicos Resueltos
 * Colisión Tipográfica en Tamaños Grandes: Se implementó un sistema de leading dinámico (ej. lg:leading-[1.35]) en los componentes de PortableText de Sanity para evitar la colisión de trazos ascendentes y descendentes en titulares gigantes.
 * Reflow Constante en Scroll 3D: En la sección "Valores", se cambió de un sistema de anclaje cartesiano (top/left/right absolutos) a un posicionamiento radial dinámico centrado, evitando que las palabras superen los bordes del Viewport al escalar x4. Además, se aplicó un parche de "sangrado de 1px" para evitar glitches de renderizado del navegador entre secciones sticky.
 * Fat-Finger en Dispositivos Móviles: Refactorización profunda de componentes como el <ManifestoSection />, modificando la estructura del DOM en breakpoints móviles (flex-col justify-between y h-[650px]) para separar las zonas de lectura y de interacción (Video Controls).
Desarrollado para la presentación corporativa Qualtop 2026.



