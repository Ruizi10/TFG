# 🧠 NeuroStat - Aplicación Web para el bienestar estudiantil

NeuroStat es una aplicación web desarrollada como parte de un Trabajo Fin de Grado en Ingeniería de Computadores, cuyo propósito es facilitar la evaluación inicial de posibles síntomas de depresión en estudiantes universitarios.

El sistema ofrece dos formas de interacción:

- Un formulario anónimo de autoevaluación, dividido en secciones.

- Un chatbot conversacional (Neurix) que recopila la información de forma más natural y empática.

Ambos caminos conducen a un modelo de Machine Learning (regresión logística) que genera una predicción sobre el riesgo de depresión.

---

## Características principales

- ✍️ Formulario anónimo de autoevaluación dividido en secciones (información personal, hábitos, salud mental, etc.).
- 🤖 Chatbot conversacional (Neurix) basado en Ollama + Gemma 2B con prompts personalizados para mantener un tono empático.
- 🧠 Predicción automática mediante un modelo de regresión logística entrenado con datos de estudiantes.
- 📊 Dashboard de estadísticas dinámico, con KPIs y gráficos interactivos (Recharts).
- 💻 Interfaz moderna, accesible y responsive, desarrollada en React + Vite.
- 🧩 Base de datos Supabase (Postgres) para almacenamiento seguro de los registros.
- 🔍 Preparado para integración con APIs externas

---

## Tecnologías utilizadas

- ⚛️ React + Vite (Frontend)
- 🎨 CSS personalizado
- 📡 FastAPI (Backend + integración ML)
- 🧠 scikit-learn (modelo de regresión logística)
- 🗄️ Supabase / PostgreSQL (base de datos en la nube)
- 🤖 Ollama + Gemma 2B (chatbot conversacional)
- 📊 Recharts (visualización de estadísticas y KPIs)
- 🧰 React Hook Form (gestión y validación del formulario)

---


## 🔮 Objetivo del proyecto

El objetivo es detectar de manera preliminar indicios de depresión en estudiantes universitarios mediante factores como:

- Edad, género
- Presión académica y satisfacción con los estudios
- Horas de estudio y hábitos de sueño
- Estrés financiero, pensamientos negativos, antecedentes familiares

⚠️ **Este proyecto no pretende sustituir un diagnóstico clínico profesional.**

Su finalidad es apoyar la detección temprana y concienciar sobre la importancia del cuidado de la salud mental.

---

## 🧪 Cómo probar el proyecto

1. Clona el repositorio:
```bash
git clone https://github.com/Ruizi10/TFG.git
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
5. (Opcional aunque recomendado) Crear un entorno virtual para aislar las dependencias del backend:
(Si ya tienes uno creado, simplemente actívalo)

```
python -m venv venv
# En Windows (PowerShell)
.\venv\Scripts\Activate.ps1
# En Linux/Mac
source venv/bin/activate
```

6. En otra terminal, instala las dependencias del backend:
```
pip install -r backend/requirements.txt
```
7. Inicia el backend con FastAPI:
```
uvicorn backend.main:app --reload
```
---

## 📑 Documentación del Backend

La API está construida con **FastAPI**, lo que permite acceder a la documentación interactiva automáticamente generada con **Swagger UI**.

- Abre en tu navegador: http://localhost:8000/docs


Ahí podrás:
- Probar los endpoints disponibles (formulario, predicción, chatbot, etc.)
- Ver los modelos de datos esperados
- Comprobar las respuestas en tiempo real

---

## 📈 Futuras implementaciones

- Integrar el despliegue en **Docker** para simplificar la ejecución en cualquier equipo.  
- Ampliar el chatbot con modelos de IA más potentes, ya sea mediante **Ollama**, **OpenAI** u otras alternativas.  
- Implementar un sistema de alertas o recomendaciones personalizadas según los resultados.  
- Explorar la integración con APIs de salud mental externas para ofrecer recursos en tiempo real.  


---

## 📬 Contacto

📧 myhealth@neurostat.app

---

## 📘 Licencia

Proyecto académico con fines educativos — 2025.

Adrián Ruiz Serrano
