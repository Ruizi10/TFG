from fastapi import APIRouter
import requests
import json
from pydantic import BaseModel

router = APIRouter()

class MensajeEntrada(BaseModel):
    mensaje: str

estructura = {
    "respuesta": "respuesta en lenguaje natural",
    "formulario": {
        "nombre": "nombre del estudiante",
        "edad": "edad del estudiante"
    }
}

ejemplo = {
    "respuesta": "Gracias por compartir eso. ¿Cuantos años tienes?",
    "formulario": {
        "nombre": "Diego",
        "edad": None
    }
}

system_prompt = (
    "Eres un psicólogo especializado en salud mental estudiantil.\n"
    "Tu tarea es mantener una conversación con el estudiante para identificar su nombre y edad.\n"
    "Debes realizar preguntas útiles y empáticas, pero siempre responder en formato JSON **válido y sin texto adicional fuera del JSON**.\n\n"
    
    "Entrada esperada:\n"
    "- Un mensaje escrito por un estudiante (por ejemplo: \"Me llamo Diego\")\n\n"
    
    "Formato obligatorio de salida (estructura JSON):\n"
    f"{json.dumps(estructura, indent=2)}\n\n"
    
    "Reglas estrictas:\n"
    "- No incluyas saludos ni explicaciones fuera del JSON.\n"
    "- El campo 'respuesta' debe contener un mensaje conversacional y coherente.\n"
    "- El campo 'formulario' debe contener los datos extraídos hasta ese momento.\n"
    "- Si no sabes algún dato, déjalo vacío o como null.\n\n"
    
    "Ejemplo:\n"
    "Si el estudiante dice: \"Me llamo Diego\"\n"
    "Debes responder exactamente así:\n"
    f"{json.dumps(ejemplo, indent=2)}"
)

print(50*"*")
print(system_prompt)
print(50*"*")

conversacion = [
    # { "role": "system", "content": system_prompt }
]


@router.post("/send_message", summary="Enviar mensaje al chatbot", tags=["Chatbot"])
def send_message(user_message: MensajeEntrada):
    url = "http://localhost:11434/api/generate"
    payload = {
        "model": "deepseek-llm:7b-chat",
        "messages": conversacion,
        "prompt": "Recuerda responder solo en JSON.\n" + user_message.mensaje,
        "system": system_prompt,
        "stream": False
    }

    try:
        response = requests.post(url, json=payload)
        response.raise_for_status()
        data = response.json()
        response = data.get("response", "").strip()

        print(50*"-")
        print(data)
        print(50*"-")
        print(response)
        print(50*"-")

        response_json = json.loads(response)

        print(50*"-")
        print(response_json)
        print(50*"-")

        conversacion.append({ "role": "user", "content": user_message.mensaje })
        conversacion.append({ "role": "assistant", "content": response_json.get("respuesta") })

        return response_json.get("respuesta")
    except Exception as e:
        return f"Error al contactar con DeepSeek: {e}"



