# PROYECTO: Rocketbot Website Rework 2026
## 📂 Memoria Técnica y Guía de Estilo

Este documento sirve como referencia central para mantener la coherencia visual, técnica y de diseño en todo el desarrollo del sitio web de Rocketbot. Consultar antes de realizar modificaciones importantes.

---

## 🛠️ Tech Stack Core
- **Framework**: Next.js 15+ (App Router)
- **Styling**: Tailwind CSS v4 (Alpha/Beta detected by `@theme`) + CSS Modules (global styles)
- **Animations**: Framer Motion (Library of choice for complex interactions)
- **Icons**: Lucide React
- **Fonts**: 
  - `Mulish` (Display/Headings)
  - `Montserrat` (Body/Text)

---

## 🎨 Design System: "Future Tech Enterprise"

### 1. Paleta de Colores (Rocketbot Brand)
Definida en `src/app/globals.css` como variables CSS y clases de utilidad.
- **Primary**: `Rocket Red` (#BC0017) - Acción principal, identidad de marca.
- **Secondary**: `Neon Cyan` (#00D4FF) - Tecnología, IA, Futuro.
- **Accents**:
  - `Neon Magenta` (#FF00F5) - Creatividad, Suite.
  - `Neon Lime` (#00FF88) - Éxito, Global.
- **Backgrounds**:
  - Light: `#FAFAFA` (Clean, Enterprise)
  - Dark: `#0A0A0F` (Deep Space, Premium)

### 2. Filosofía Visual
- **Glassmorphism**: Uso extensivo de fondos translúcidos (`backdrop-filter: blur()`).
  - Clase utilitaria: `.glass-card` y `.glass-card-premium`.
  - Bordes sutiles: 1px solid con baja opacidad.
- **Lighting & Glow**: Efectos de sombreado de neón para indicar interactividad o estado activo.
- **Data Flow**: Representación visual de datos moviéndose (líneas, partículas, tubos) para simbolizar automatización.
- **Premium Gradients**: Degradados sutiles, nunca colores planos aburridos para fondos grandes.

### 3. Componentes Core UI
- **`GlassCard`**: Contenedor principal para contenido. Soporta variantes `default`, `premium`, `neon-red`, `neon-cyan`.
- **`DataTube`**: Elemento decorativo animado que conecta secciones o tarjetas, simulando tuberías de datos.
- **`ConnectedNetwork`**: Canvas de fondo interactivo con partículas conectadas.
- **`PricingScrollytelling`**: Componente de página completa con secuencias de imágenes sincronizadas, scroll automático interrumpible y estética ejecutiva.
- **`force-dark-page`**: Utilidad CSS en `globals.css` para forzar el modo oscuro en secciones específicas independientemente del tema global.

---

## 🎬 Estándares de Animación
**Principio: "Smooth & Cinematic"**
Todas las animaciones deben sentirse fluidas, "físicas" y premium. Evitar movimientos lineales bruscos.

- **Curva de Bezier Estándar**: `ease: [0.16, 1, 0.3, 1]` (Sensación de peso y frenado suave).
- **Entradas (Entrance)**:
  - `y: 20` -> `y: 0`
  - `opacity: 0` -> `opacity: 1`
  - `duration: 0.8s`
- **Scrollytelling**: Uso de `useScroll` y `useTransform` para que la UI reaccione al scroll del usuario (ej. `HistoryTimeline`).
- **Micro-interacciones**:
  - Hover en tarjetas: `scale: 1.01` o `1.02`.
  - Botones: Feedback visual inmediato pero elegante.

---

## 🏗️ Estructura del Proyecto
- **`src/app`**: Rutas y layouts. `page.tsx` compone las secciones.
- **`src/components/sections`**: Bloques de página completos (Hero, Architecture, History). Cada uno debe ser autocontenido pero coherente.
- **`src/components/ui`**: Componentes atómicos/moleculares reutilizables (Botones, Inputs, Cards).

## ✅ Buenas Prácticas de Código
1.  **Componentes Pequeños**: Si una `section` crece demasiado, extraer sub-componentes al mismo archivo o a `ui` si son reutilizables.
2.  **`'use client'`**: Utilizar solo cuando sea necesario (interactividad, hooks). Mantener Server Components donde sea posible para SEO/Performance.
3.  **Accesibilidad**: Asegurar contrastes suficientes, etiquetas `aria` donde aplique, y HTML semántico.
4.  **Tipado Estricto**: TypeScript siempre. Definir interfaces para props.

---

## 📝 Lista de Verificación para Nueva Funcionalidad
1.  ¿Usa los colores oficiales de Rocketbot?
2.  ¿Tiene modo Light y Dark?
3.  ¿La animación es consistente con el resto del sitio (suave, non-linear)?
4.  ¿El diseño es "Wow" a primera vista?
