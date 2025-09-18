import uuid
from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
from ..models import FormularioEstudiante
from ..database import get_db
import pandas as pd
import joblib

router = APIRouter()

modelo = joblib.load("./backend/modelo_logistico.pkl")

# Modelo de datos para el formulario de estudiante define los campos esperados
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
    print("Datos recibidos:", formulario.model_dump())
    
    data_dict = {
        "genero": formulario.genero,
        "edad": int(formulario.edad),
        "presionAcademica": int(formulario.presionAcademica),
        "satisfaccionEstudios": int(formulario.satisfaccionEstudios),
        "sueno": formulario.sueno,
        "alimentacion": formulario.alimentacion,
        "suicidio": 1 if formulario.suicidio == "Sí" else 0,
        "horasEstudio": int(formulario.horasEstudio),
        "estresFinanciero": int(formulario.estresFinanciero),
        "antecedentes": 1 if formulario.antecedentes == "Sí" else 0,
    }

    # Convertir el diccionario a DataFrame y realizar la predicción
    df = pd.DataFrame([data_dict])
    depresion = bool(predict(df))
    print("Predicción de depresión:", depresion)
    # Crear un nuevo registro en la base de datos   
    nuevo_estudiante = FormularioEstudiante(
        **data_dict,
        depresion=depresion,
        id = str(uuid.uuid4())
    )
    
    db.add(nuevo_estudiante)
    db.commit()
    db.refresh(nuevo_estudiante)

    return {"resultado": depresion, "id_registro": nuevo_estudiante.id}

async def predict_chatbot(df):
    print("Datos para predicción en chatbot:", df)
    depresion = bool(modelo.predict(pd.DataFrame([df])))
    print("Predicción de depresión:", depresion)
    return depresion

def predict(df):
    map_sueno = {
        "7-8 horas": 1,
        "5-6 horas": 2,
        "Más de 8 horas": 3,
        "Menos de 5 horas": 4
    }

    if "sueno" in df.columns:
        if not pd.api.types.is_numeric_dtype(df["sueno"]):
            df["sueno"] = df["sueno"].map(map_sueno).fillna(0)
        else:
            print("La columna 'sueno' ya es numérica.")

    map_alimentacion = {
        "Moderados": 1,
        "Saludables": 2,
        "No saludables": 3
    }

    if "alimentacion" in df.columns:
        df["alimentacion"] = df["alimentacion"].map(map_alimentacion).fillna(0)

    map_genero = {
        "Masculino": 1,
        "Femenino": 2
    }

    if "genero" in df.columns:
        df["genero"] = df["genero"].map(map_genero).fillna(0)

    return modelo.predict(df)