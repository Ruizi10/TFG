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

#@router.get("/barChart", summary="Obtener estadísticas del nivel de estrés financiero")
#def estat_finantial(db: Session=Depends(get_db)):
#    return {
#        
#    }
#
#@router.get("radioChart", summary="Obtener estadísticas de los factores principales del estudiante")
#def estat_radio(db: Session=Depends(get_db)):
#    return{
#
#    }