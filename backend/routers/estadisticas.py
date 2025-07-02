from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import FormularioEstudiante

router = APIRouter(
    prefix="/estadisticas",
    tags=["Estadísticas"]
)

@router.get("/pieChart", summary="Obtener estadísticas de depresión")
def estadisticas_depresion(db: Session = Depends(get_db)):
    con_depresion = db.query(FormularioEstudiante).filter_by(depresion=True).count()
    sin_depresion = db.query(FormularioEstudiante).filter_by(depresion=False).count()
    return {
        "depresion": con_depresion,
        "sinDepresion": sin_depresion
    }

@router.get("/barChart", summary="Obtener estadísticas de género y depresión")
def estadisticas_genero(db: Session = Depends(get_db)):
    male_depre = db.query(FormularioEstudiante).filter_by(genero="Masculino", depresion=True).count()
    female_depre = db.query(FormularioEstudiante).filter_by(genero="Femenino", depresion=True).count()
    male_Nodepre = db.query(FormularioEstudiante).filter_by(genero="Masculino", depresion=False).count()
    female_Nodepre = db.query(FormularioEstudiante).filter_by(genero="Femenino", depresion=False).count()
    return {
        "HombresConDepresión": male_depre,
        "HombresSinDepresión": male_Nodepre,
        "MujeresConDepresión": female_depre,
        "MujeresSinDepresión": female_Nodepre,
    }


@router.get("/polarAreaChart", summary="Obtener estadísticas de presión académica")
def estadisticas_presion_academica(db:Session = Depends(get_db)):
    niveles = [1,2,3,4,5]
    data = []

    for nivel in niveles:
        ConDepresion = db.query(FormularioEstudiante).filter_by(presionAcademica=nivel, depresion=True).count()
        SinDepresion = db.query(FormularioEstudiante).filter_by(presionAcademica=nivel, depresion=False).count()
        data.append({
            "nivel": f"{nivel}",
            "ConDepresion" : ConDepresion,
            "SinDepresion" : SinDepresion
        })
    return data

@router.get("/satisfactionChart", summary="Obtener estadísticas de satisfacción con los estudios")
def estadisticas_satisfaccion(db:Session = Depends(get_db)):
    niveles = [1,2,3,4,5]
    data = []
    
    for nivel in niveles:
        ConDepresion = db.query(FormularioEstudiante).filter_by(satisfaccionEstudios=nivel, depresion=True).count()
        SinDepresion = db.query(FormularioEstudiante).filter_by(satisfaccionEstudios=nivel, depresion=False).count()
        data.append({
            "nivel": f"{nivel}",
            "ConDepresion" : ConDepresion,
            "SinDepresion" : SinDepresion
        })
    return data

@router.get("/kpi", summary="Obtener indicadores clave de rendimiento (KPIs)")
def obtener_kpis(db: Session = Depends(get_db)):
    total_usuarios = db.query(FormularioEstudiante).count()
    if total_usuarios == 0:
        return {
            "totalUsuarios": 0,
            "porcentajeDepresion": 0,
            "satisfaccionPromedio": 0,
            "HorasEstudioPromedio": 0,
            "EstresPromedio": 0,
        }
    
    total_depresion = db.query(FormularioEstudiante).filter_by(depresion=True).count()
    promedio_satisfaccion = db.query(FormularioEstudiante.satisfaccionEstudios).all()
    suma_satisfaccion = sum(s.satisfaccionEstudios for s in promedio_satisfaccion)
    promedio = suma_satisfaccion / total_usuarios

    horas_estudio = db.query(FormularioEstudiante.horasEstudio).all()
    estres_financiero = db.query(FormularioEstudiante.estresFinanciero).all()
    promedio_horas_estudio = sum(h.horasEstudio for h in horas_estudio) / total_usuarios
    estres_promedio = sum(e.estresFinanciero for e in estres_financiero) / total_usuarios
    return {
        "totalUsuarios": total_usuarios,
        "porcentajeDepresion": round((total_depresion / total_usuarios) * 100, 2),
        "satisfaccionPromedio": round(promedio, 2),
        "HorasEstudioPromedio": round(promedio_horas_estudio, 2),
        "EstresPromedio": round(estres_promedio, 2),
    }