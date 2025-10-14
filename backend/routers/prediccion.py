import uuid
from fastapi import APIRouter
from pydantic import BaseModel
from ..models import FormularioEstudiante
from ..database import get_db
import pandas as pd
import joblib

router = APIRouter()

modelo = joblib.load("./backend/modelo_logistico.pkl")

db = next(get_db())

# Modelo de datos para el formulario de estudiante define los campos esperados
class FormularioEstudianteCreate(BaseModel):
    genero: int
    edad: int
    presionAcademica: int
    satisfaccionEstudios: int
    sueno: int
    alimentacion: int
    suicidio: int
    horasEstudio: int
    estresFinanciero: int
    antecedentes: int

@router.post("/predict", summary="Predecir riesgo de depresión", tags=["Predicción"])
async def predict(formulario: FormularioEstudianteCreate):
    try:
        df = formulario.model_dump()
        print("Formulario convertido a diccionario:")
    except:
        print("Ya es un diccionario")
        df = formulario
        
    print("Datos para predicción:", df)

    df = pd.DataFrame([df])

    depresion = bool(modelo.predict(df))
    print("Predicción de depresión:", depresion)

    nuevo_estudiante_id = save_to_db(df, depresion)

    return {"resultado": depresion, "id_registro": nuevo_estudiante_id}

def save_to_db(df, depresion):
    map_sueno = {
        1: "Más de 8 horas",
        2: "7-8 horas",
        3: "5-6 horas",
        4: "Menos de 5 horas"
    }

    if "sueno" in df.columns:
        df["sueno"] = df["sueno"].map(map_sueno)

    map_alimentacion = {
        1: "Saludables",
        2: "Moderados",
        3: "No saludables"
    }

    if "alimentacion" in df.columns:
        df["alimentacion"] = df["alimentacion"].map(map_alimentacion)

    map_genero = {
        0: "Masculino",
        1: "Femenino"
    }

    if "genero" in df.columns:
        df["genero"] = df["genero"].map(map_genero)

    data_dict = df.iloc[0].to_dict()

    print("Datos para guardar en DB:\n", data_dict)

    nuevo_estudiante = FormularioEstudiante(
        **data_dict,
        depresion=depresion,
        id = str(uuid.uuid4())
    )
    
    db.add(nuevo_estudiante)
    db.commit()
    db.refresh(nuevo_estudiante)

    return nuevo_estudiante.id

