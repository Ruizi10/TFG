from fastapi import APIRouter
import requests
import json
from pydantic import BaseModel
import re
from .prediccion import predict

router = APIRouter()

# Endpoint de la API de Ollama
OLLAMA_URL = "http://localhost:11434/api/generate"

# Historial de conversación
conversacion = [
    { "role": "assistant", "content": "Dime tu nombre" }
]

# Modelo de entrada para el mensaje del usuario
class MensajeEntrada(BaseModel):
    mensaje: str

faltantes = ["edad", "genero", "presionAcademica", "satisfaccionEstudios", "horasEstudio", "sueno", "alimentacion", "suicidio", "estresFinanciero", "antecedentes"]
data = {}

def transform_data(data):
    # Ordenar las columnnas según el orden esperado por el modelo
    data_dict = {
        "genero": data["genero"],
        "edad": data["edad"],
        "presionAcademica": data["presionAcademica"],
        "satisfaccionEstudios": data["satisfaccionEstudios"],
        "sueno": data["sueno"],
        "alimentacion": data["alimentacion"],
        "suicidio": data["suicidio"],
        "horasEstudio": data["horasEstudio"],
        "estresFinanciero": data["estresFinanciero"],
        "antecedentes": data["antecedentes"]
    }

    return data_dict

async def get_param(response_json):
    global faltantes, data

    if not isinstance(response_json, dict):
        return None

    for clave in list(response_json.keys()):
        if clave in faltantes:
            data[clave] = response_json[clave]
            faltantes.remove(clave)

    if len(faltantes) == 0:
        print(50*"^*")
        print(data)
        print(50*"^*")
        data = transform_data(data)
        resultado = await predict(data)

        return True, resultado
    return False, faltantes[0]


def limpiar_json_de_backticks(respuesta_texto):
    if respuesta_texto.startswith("```"):
        respuesta_texto = respuesta_texto[7:-3].strip()
    return respuesta_texto

def limpiar_razonamiento_respuesta(texto: str) -> str:
    if "**Recuerda**" in texto or "Recuerda:" in texto:
        texto = re.split(r"\*\*Recuerda[:]\*\*", texto)[0]
    return texto.strip()


@router.post("/send_message", summary="Enviar mensaje al chatbot", tags=["Chatbot"])
async def send_message(user_message: MensajeEntrada):
    payload_analysis = {
        "model": "analytical-agent:latest",
        "prompt": "Pregunta: " + conversacion[-1]['content'] + "\nUsuario: " + user_message.mensaje,
        "stream": False
    }

    conversacion.append({ "role": "user", "content": user_message.mensaje })

    response = requests.post(OLLAMA_URL, json=payload_analysis)
    response.raise_for_status()
    data = response.json()
    respuesta_texto = data.get("response", "").strip()
    print(50*"-")
    print(respuesta_texto)
    print(50*"-")
    respuesta_texto = limpiar_json_de_backticks(respuesta_texto)
    
    response_json = json.loads(respuesta_texto)
    # ---------------------------------------------------------------------
    # response_json = {'edad': 24, 'genero': 1, 'presionAcademica': 1, 'satisfaccionEstudios': 1, 'horasEstudio': 5, 'sueno': 2, 'alimentacion': 3, 'suicidio': 0, 'estresFinanciero': 1, 'antecedentes': 0}
    # ---------------------------------------------------------------------
    fin, arg = await get_param(response_json)
    if fin:
        print("Depresion:", arg.get("resultado"))
        return arg
    
    payload_conversation = {
        "model": "conversational-agent:latest",
        # "messages": conversacion,
        "prompt": f"El usuario ha respondido: {conversacion[-1]['content']}. \nPregunta al usuario sobre: {arg}",
        # "prompt": f"Pregunta al usuario sobre: {param}",
        "stream": False
    }
    try:
        response = requests.post(OLLAMA_URL, json=payload_conversation)
        response.raise_for_status()
        data = response.json()

        respuesta_texto = data.get("response", "").strip()
        print(50*"-")
        print(respuesta_texto)
        print(50*"-")


        respuesta_texto = limpiar_razonamiento_respuesta(respuesta_texto)

        # Añadir respuesta del modelo al contexto
        conversacion.append({ "role": "assistant", "content": respuesta_texto })

        return respuesta_texto  # O retorna directamente response_json si quieres más campos

    except json.JSONDecodeError:
        return "Error: la respuesta del modelo no es un JSON válido."

    except requests.RequestException as req_err:
        return f"Error al contactar con Ollama: {req_err}"

    except Exception as e:
        return f"Error inesperado: {e}"