from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from routers.prediccion import router as prediccion_router
from routers.news_router import router as news_router

app = FastAPI(
    title="🧠 NeuroStat API",
    description="API para evaluar el bienestar emocional de estudiantes y detectar indicios de depresión mediante parámetros personales, académicos y emocionales.",
    version="1.0.0",
    contact={
        "name": "NeuroStat Team",
        "email": "contacto@neurostat.app"
    }
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(prediccion_router)
app.include_router(news_router)