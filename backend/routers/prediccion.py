from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class FormularioEstudiante(BaseModel):
    # nombre: str
    # correo: str
    genero: str
    edad: str
    presionAcademica: str
    satisfaccionEstudios: str
    horasEstudio: str
    sueno: str
    alimentacion: str
    suicidio: str
    estresFinanciero: str
    antecedentes: str


@router.post("/predict", summary="Predecir riesgo de depresión", tags=["Predicción"])
async def predecir_estado(formulario: FormularioEstudiante):
    print("📥 Datos recibidos:", formulario.dict())
    # Aquí en el futuro podrías meter la predicción de un modelo ML
    return {"resultado": True}
