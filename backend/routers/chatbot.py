from fastapi import APIRouter
import requests
import json
from pydantic import BaseModel
import re

router = APIRouter()

# Cargar el prompt desde archivo
with open("./backend/prompt.txt", "r", encoding="utf-8") as file:
    system_prompt = file.read()

# Endpoint de la API de Ollama
OLLAMA_URL = "http://localhost:11434/api/generate"

# Historial de conversación
conversacion = [
    # { "role": "system", "content": system_prompt }
]

# Modelo de entrada para el mensaje del usuario
class MensajeEntrada(BaseModel):
    mensaje: str

    
@router.post("/send_message", summary="Enviar mensaje al chatbot", tags=["Chatbot"])
def send_message(user_message: MensajeEntrada):
    # Añadir mensaje del usuario al contexto de conversación
    conversacion.append({ "role": "user", "content": user_message.mensaje })

    payload = {
        # "model": "deepseek-llm:7b-chat",
        "model": "deepseek-r1:8b",
        # "model": "mi-modelo:latest",
        "messages": conversacion,
        "prompt": "Recuerda responder solo en JSON.\n" + user_message.mensaje,
        "system": system_prompt,
        "stream": False
    }

    try:
        response = requests.post(OLLAMA_URL, json=payload)
        response.raise_for_status()
        data = response.json()
        

        # El modelo debería devolver un string con JSON embebido
        respuesta_texto = data.get("response", "").strip()
        print(50*"-")
        print(respuesta_texto)
        # respuesta_texto = respuesta_texto.replace("'", '"')
        respuesta_texto = re.sub(r'<think>.*?</think>', '', respuesta_texto, flags=re.DOTALL)
        # print(respuesta_texto)
        # print(50*"-")

        # Intentamos convertir a JSON
        response_json = json.loads(respuesta_texto.strip())

        # Añadir respuesta del modelo al contexto
        conversacion.append({ "role": "assistant", "content": respuesta_texto })

        return response_json.get("respuesta")  # O retorna directamente `response_json` si quieres más campos

    except json.JSONDecodeError:
        return "Error: la respuesta del modelo no es un JSON válido."

    except requests.RequestException as req_err:
        return f"Error al contactar con Ollama: {req_err}"

    except Exception as e:
        return f"Error inesperado: {e}"



@router.post("/send_message", summary="Enviar mensaje al chatbot", tags=["Chatbot"])
def send_message():
    from openai import OpenAI

    client = OpenAI(
        api_key="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"
    )

    completion = client.chat.completions.create(
        model="gpt-4o-mini",
        store=True,
        messages=[
            {"role": "user", "content": "write a haiku about ai"}
        ]
    )
    res = completion.choices[0].message
    print(completion.choices[0].message)

    return {"respuesta": res}
