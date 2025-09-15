pip install -r backend/requirements.txt

ollama create conversational-agent -f Modelfile_Conversational
ollama create analytical-agent -f Modelfile_Analytical

cd frontend;npm run dev & cd ../backend;uvicorn main:app --reload

