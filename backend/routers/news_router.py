from fastapi import APIRouter, HTTPException
import requests
import json
from datetime import datetime, timedelta, timezone
from zoneinfo import ZoneInfo  # Para manejar zonas horarias
from translate import Translator #Para traducir las noticias de la API

router = APIRouter()

# def translate_text(text, translator):
#     try:
#         return translator.translate(text)
#     except Exception:
#         return text  

@router.get("/get_news", summary="Recoger información de noticias", tags=["Noticias"])
def get_news():
    url = "https://newsapi.org/v2/everything"
    
    madrid_tz = ZoneInfo("Europe/Madrid")
    yesterday = (datetime.now(madrid_tz) - timedelta(days=30)).strftime("%Y-%m-%d") # Formato YYYY-MM-DD

    params = {
        "q": "Depresión, salud mental",
        "from": yesterday,
        "sortBy": "popularity",
        "apiKey": "1e2f0e0201f5466e9a03035d6ef0457e"
    }

    response = requests.get(url, params=params)
    data = response.json()
    data["articles"] = data.get("articles", [])[:10]

    # translator = Translator(to_lang="es")

    # for article in data.get("articles", []):
    #     article["title"] = translate_text(article.get("title", ""), translator)
    #     article["description"] = translate_text(article.get("description", ""), translator)

    return data


