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
        "conDepresion": con_depresion,
        "sinDepresion": sin_depresion
    }
