from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
from ..models import FormularioEstudiante
from ..database import get_db


router = APIRouter()

class FormularioEstudianteCreate(BaseModel):
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

async def predecir_estado(formulario: FormularioEstudianteCreate, db: Session = Depends(get_db)):
    print("📥 Datos recibidos:", formulario.model_dump())

    # FUNCION PARA EL PREDICT
    depresion = False

    nuevo_estudiante = FormularioEstudiante(
        genero=formulario.genero,
        edad=int(formulario.edad),
        presionAcademica=int(formulario.presionAcademica),
        satisfaccionEstudios=int(formulario.satisfaccionEstudios),
        horasEstudio=int(formulario.horasEstudio),
        estresFinanciero=int(formulario.estresFinanciero),
        sueno=formulario.sueno,
        alimentacion=formulario.alimentacion,
        suicidio = True if formulario.suicidio == "Sí" else False,
        antecedentes = True if formulario.antecedentes == "Sí" else False,
        depresion=depresion, # MODIFICAR CON EL VALOR PREDICHO
    )

    db.add(nuevo_estudiante)
    db.commit()
    db.refresh(nuevo_estudiante)

    return {"resultado": depresion, "id_registro": nuevo_estudiante.id}
