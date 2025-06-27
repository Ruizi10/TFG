from fastapi import APIRouter
import requests
import json
from pydantic import BaseModel

router = APIRouter()

class MensajeEntrada(BaseModel):
    mensaje: str

# conversacion = [
#     { "role": "system", "content": system_prompt }
# ]
with open("./backend/prompt.txt", "r", encoding="utf-8") as file:
    system_prompt = file.read()

# print(50*"*")
# print(system_prompt)
# print(50*"*")

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



