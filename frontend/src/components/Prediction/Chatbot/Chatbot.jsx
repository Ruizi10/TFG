import { useState } from 'react';
import './ChatBot.css';

function ChatBot() {
  const [mensaje, setMensaje] = useState('');
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const enviarMensaje = async () => {
    if (!mensaje.trim()) return;

    // Añadir mensaje del usuario al chat
    const newChat = [...chat, { sender: 'user', text: mensaje }];
    setChat(newChat);
    setMensaje('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:8000/send_message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mensaje }),
      });

      const data = await res.json();

      setChat([...newChat, { sender: 'bot', text: data }]);
    } catch {
      setChat([...newChat, { sender: 'bot', text: 'Error al contactar con el modelo.' }]);
    }
    setLoading(false);
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-box">
        <img src="/ChatBot.png" alt="Neurix Avatar" className="chatbot-avatar" />
        <h2 className="chatbot-title">Hola, soy <span>Neurix</span></h2>
        <p className="chatbot-subtitle">¡Estoy aquí para ayudarte! Dime como te encuentras.</p>

        <div className="chat-history">
          {chat.map((msg, i) => (
            <div key={i} className={`chat-message ${msg.sender}`}>
              <p>{msg.text}</p>
            </div>
          ))}
          {loading && (
            <div className="chat-message bot">
              <p>Escribiendo...</p>
            </div>
          )}
        </div>

        <div className="chat-input-row">
          <textarea
            className="chatbot-input"
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            placeholder="Escribe tu mensaje aquí..."
          />
          <button className="chatbot-button" onClick={enviarMensaje} disabled={loading}>
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatBot;
