# 🧠 NeuroStat - Evaluación del Bienestar Estudiantil

NeuroStat es una aplicación web desarrollada como parte de un Trabajo de Fin de Grado en Ingeniería de Computadores. Su propósito es permitir la evaluación inicial de indicios de depresión en estudiantes universitarios mediante un formulario interactivo que analiza distintos factores personales, académicos, de estilo de vida y salud mental.

---

## 🚀 Características principales

- ✍️ Formulario anónimo de autoevaluación dividido por secciones (información personal, hábitos, salud mental...)
- 🧠 Predicción basada en modelos de Machine Learning entrenados previamente
- 📊 Visualización de estadísticas simuladas con gráficos interactivos (`Recharts`)
- 💻 Interfaz moderna, accesible y responsive
- 🧩 Arquitectura basada en componentes (`React + Vite`)
- 🔍 Preparado para integración futura con APIs externas (noticias, recursos, etc.)

---

## 🛠 Tecnologías utilizadas

- ⚛️ React (Frontend)
- 🎨 CSS personalizado (tema oscuro)
- 📡 FastAPI (Backend y modelo ML - no incluido en este repo)
- 📊 Recharts (visualización)
- 🧰 React Hook Form (gestión del formulario)

---

## 📂 Estructura del proyecto

```bash
my-app/
├── public/                 # Imágenes, iconos y recursos estáticos
│   └── icons/              # Logos de tecnologías (React, Python...)
├── src/
│   ├── components/         # Componentes reutilizables
│   │   ├── Form/           # Formulario dividido por secciones
│   │   ├── Navbar/         # Navegación principal
│   │   ├── Footer/         # Pie de página
│   │   └── Charts/         # Gráficos de visualización
│   └── App.jsx             # Enrutado principal y layout general
├── README.md
└── package.json
```

---

## 🔮 Objetivo del proyecto

El objetivo es detectar de forma preliminar posibles síntomas de depresión a través de parámetros como:

- Edad, género
- Presión académica y satisfacción con los estudios
- Horas de estudio y hábitos de sueño
- Estrés financiero, pensamientos negativos, antecedentes familiares

⚠️ **Este proyecto no pretende sustituir un diagnóstico clínico profesional.**

---

## 🧪 Cómo probar el proyecto

1. Clona el repositorio:
```bash
git clone https://github.com/tuusuario/neurostat.git
cd neurostat
```
2. Instala las dependencias:
```bash
npm install
```
3. Inicia el servidor de desarrollo:
```bash
npm run dev
```
4. Abre en tu navegador:
```
http://localhost:5173
```

---

## 📬 Contacto

📧 contacto@neurostat.app

---

## 📘 Licencia

Proyecto académico con fines educativos — 2025.