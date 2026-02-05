# Rocketbot Web V2 - Experiencia Cinemática

Bienvenido al repositorio de **Rocketbot Web V2**. Este proyecto es una aplicación web de alto rendimiento diseñada para mostrar las capacidades de RPA empresarial de Rocketbot con una estética de "Silicon Valley". La experiencia principal está impulsada por un **Motor de Scrollytelling Cinemático** que trata la ventana gráfica (viewport) como una cámara moviéndose a través de una interfaz 3D.

## 🚀 Guía de Inicio

### Requisitos Previos
- **Node.js**: Versión 18 o superior.
- **Git**: Necesario para el control de versiones.

### Instalación
1.  **Clonar el repositorio** (si aún no lo has hecho):
    ```bash
    git clone https://github.com/mancloud-rocket/web-rocketbot-v2.git
    cd web-rocketbot-v2
    ```
2.  **Instalar dependencias**:
    ```bash
    npm install
    # o
    yarn install
    ```

### Ejecutar el Servidor de Desarrollo
Para iniciar el servidor local con recarga en caliente (hot-reloading):
```bash
npm run dev
```
Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## 🏗️ Arquitectura y Motor de Scroll Cinemático

Este proyecto no utiliza el desplazamiento estándar de páginas web. En su lugar, utiliza un mecanismo personalizado de "Scroll Jacking" para crear un efecto de profundidad 3D.

### Concepto Central: "La Línea de Tiempo"
La aplicación se trata como una línea de tiempo única de "Fases" o "escenas". A medida que el usuario hace scroll, no se mueve hacia abajo en una página, sino que avanza *hacia adelante* a través de una línea de tiempo en el eje Z.

### Tecnologías Clave
- **Next.js 15 (App Router)**: Framework para renderizado y enrutamiento del servidor.
- **Framer Motion**: Maneja todas las animaciones, específicamente los hooks `useScroll` y `useTransform` para mapear la posición del scroll a valores CSS (opacidad, escala, coordenadas x/y).
- **TailwindCSS v4**: Motor de estilos "utility-first".
- **GSAP**: Librería de animación auxiliar para secuencias complejas.

### Cómo Funcionan los "Frames" (Componentes)
Cada sección mayor (ej. Historia, Arquitectura) se construye como un **Componente Fijo** que se superpone a los demás.
1.  **`ScrollyPhase.tsx`**: Este es el componente contenedor ("wrapper"). Rastrea el progreso del scroll relativo al viewport.
2.  **Contexto de Apilamiento (Stacking Context)**: Los componentes utilizan manipulación de `z-index`. Al hacer "scroll down", la escena actual puede desvanecerse o escalar para revelar la siguiente escena detrás de ella, o la siguiente escena puede deslizarse sobre la actual.
3.  **Hidratación**: Todos los componentes interactivos son Client Components (`"use client"`) para acceder a objetos `window` y listeners de scroll.

---

## 🤖 Flujo de Trabajo con Antigravity

Este proyecto está optimizado para el desarrollo con **Antigravity** (Asistente de IA de Google DeepMind). Sigue este flujo para realizar cambios de manera eficiente.

### 1. El Protocolo "Modo Tarea" (Task Mode)
Al pedirle a Antigravity que trabaje, opera en ciclos de "Modo Tarea":
- **Planificación**: Antigravity investiga archivos y propone un plan.
- **Ejecución**: Antigravity edita los archivos.
- **Verificación**: Antigravity verifica si la compilación funciona.

### 2. Realizar Modificaciones (Paso a Paso)
Si deseas modificar una sección, por ejemplo, `HistoryTimeline`:

1.  **Localizar el Archivo**:
    - Todas las secciones están en `src/components/sections/`.
    - Ejemplo: `src/components/sections/HistoryTimeline.tsx`.
2.  **Solicitar el Cambio**:
    - *Usuario*: "Cambia el color de la línea de tiempo a rojo."
    - *Antigravity*: Leerá el archivo -> propondrá el cambio -> aplicará la edición.
3.  **Verificar**:
    - Antigravity comprobará si hay errores.
    - Debes verificar visualmente en `localhost:3000`.

### 3. Crear Nuevas Escenas
Para añadir un nuevo "Slide" o "Escena":
1.  Crea el componente en `src/components/sections/[NuevaEscena].tsx`.
2.  Impórtalo en `src/app/page.tsx`.
3.  Envuélvelo en un `<div className="h-[200vh]">` (o altura similar) para crear "espacio de scroll".
4.  Usa `framer-motion` para definir cómo entra/sale basándote en el `scrollYProgress`.

---

## 📂 Estructura del Proyecto

```text
.
├── .agent/              # Flujos de trabajo y reglas de IA
├── public/              # Activos estáticos (imágenes, fuentes, iconos)
├── src/
│   ├── app/             # Rutas de Next.js (App Router)
│   │   ├── page.tsx     # Punto de entrada principal (El "Director" del show)
│   │   └── layout.tsx   # Envoltorio HTML global
│   ├── components/
│   │   ├── layout/      # Envoltorios de diseño (Nav, Footer, ScrollyPhase)
│   │   ├── sections/    # LAS ESCENAS (Hero, Historia, Pricing, etc.)
│   │   └── ui/          # Átomos reutilizables (Botones, Tarjetas, Iconos)
│   ├── lib/             # Utilidades y funciones auxiliares
│   └── styles/          # CSS global y configuración de Tailwind
├── next.config.ts       # Configuración de Next.js
├── tailwind.config.ts   # Configuración del tema Tailwind
└── package.json         # Dependencias y scripts
```

## 🚢 Despliegue

### Desplegar en Vercel (Recomendado)
Esta es la forma más rápida de llevarlo a producción.
```bash
npx vercel
```
Sigue las instrucciones interactivas. Construirá y desplegará automáticamente.

### Desplegar vía GitHub
1.  Guarda tus cambios (commit):
    ```bash
    git add .
    git commit -m "Actualizar sitio"
    git push origin main
    ```
2.  Conecta tu repositorio de GitHub al panel de control de Vercel. Se desplegará automáticamente con cada "push".

---
*Mantenido por el Equipo de Ingeniería de Rocketbot.*
