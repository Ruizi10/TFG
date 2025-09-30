from fastapi import APIRouter
import requests
from datetime import datetime, timedelta
from zoneinfo import ZoneInfo  # Para manejar zonas horarias

router = APIRouter()

@router.get("/get_news", summary="Recoger información de noticias", tags=["Noticias"])
def get_news():
    url = "https://newsapi.org/v2/everything"
    
    madrid_tz = ZoneInfo("Europe/Madrid")
    yesterday = (datetime.now(madrid_tz) - timedelta(days=8)).strftime("%Y-%m-%d") # Formato YYYY-MM-DD

    params = {
        "q": "Depresión, salud mental",
        "from": yesterday,
        "sortBy": "popularity",
        "apiKey": "1e2f0e0201f5466e9a03035d6ef0457e"
    }

    response = requests.get(url, params=params)
    data = response.json()
    data["articles"] = data.get("articles", [])[:10]

    return data


