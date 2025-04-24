from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class FormularioEstudiante(Base):
    __tablename__ = "formularioestudiante"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    genero = Column(String(50))
    edad = Column(Integer)
    presionAcademica = Column(Integer)
    satisfaccionEstudios = Column(Integer)
    horasEstudio = Column(Integer)
    estresFinanciero = Column(Integer)
    sueno = Column(String(50))
    alimentacion = Column(String(50))
    suicidio = Column(Boolean)
    antecedentes = Column(Boolean)
    depresion = Column(Boolean)
