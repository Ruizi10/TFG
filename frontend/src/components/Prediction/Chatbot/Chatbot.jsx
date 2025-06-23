import { useState } from 'react';
import './ChatBot.css';

function ChatBot() {
  const [mensaje, setMensaje] = useState('');
  const [respuesta, setRespuesta] = useState('');
  const [loading, setLoading] = useState(false);

  const enviarMensaje = async () => {
    if (!mensaje.trim()) return;
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8000/send_message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mensaje }),
      });

      if (!res.ok) throw new Error('Error al contactar con el servidor');
      const data = await res.json();
      setRespuesta(data);
    } catch {
      setRespuesta('Error al contactar con el modelo.');
    }
    setLoading(false);
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-box">
        
        <img src="/ChatBot.png" alt="Neurix Avatar" className="chatbot-avatar" />
        <h2 className="chatbot-title">Hola, soy <span>Neurix</span></h2>
        <p className="chatbot-subtitle">¡Estoy aquí para ayudarte! Dime como te encuentras.</p>

        <textarea
          className="chatbot-input"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          placeholder="Escribe tu mensaje aquí..."
        />

        <button className="chatbot-button" onClick={enviarMensaje} disabled={loading}>
          {loading ? 'Cargando...' : 'Enviar'}
        </button>

        {respuesta && (
          <div className="chatbot-response">
            <strong>Neurix:</strong>
            <p>{respuesta}</p>
          </div>
        )}

      </div>
    </div>
  );
}

export default ChatBot;
