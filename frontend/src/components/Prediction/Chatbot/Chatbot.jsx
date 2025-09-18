import { useState, useEffect, useRef } from 'react';
import './ChatBot.css';
import Modal from "../../Modal/Modal";

function ChatBot() {
  const [mensaje, setMensaje] = useState('');
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState(null);
  const chatEndRef = useRef(null);

    
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTipo, setModalTipo] = useState(null);
  const [registroID, setRegistroID] = useState(null);

  const enviarMensaje = async () => {
    if (!mensaje.trim()) return;

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
      if(data.fin) {
        setRegistroID(data.id_registro);
        setModalTipo(data.resultado ? "riesgo" : "ok");
        setModalOpen(true);
      }

      setChat([...newChat, { sender: 'bot', text: data }]);
    } catch {
      setChat([...newChat, { sender: 'bot', text: 'Error al contactar con el modelo.' }]);
    }

    setLoading(false);
  };

  useEffect(() => {
    const chatHistory = chatEndRef.current?.parentNode;
    if (chatHistory) {
    chatHistory.scrollTop = chatHistory.scrollHeight;
    }
  }, [chat]);


  return (
    <>
      <div className="chatbot-container">
        <div className="chatbot-box">
          <img src="/ChatBot.png" alt="Neurix Avatar" className="chatbot-avatar" />
          <h2 className="chatbot-title">Hola, soy <span>Neurix</span></h2>
          <p className="chatbot-subtitle">¡Estoy aquí para ayudarte! Dime cómo te encuentras.</p>

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
            <div ref={chatEndRef} />
          </div>

          <div className="chat-input-row">
            <textarea
              className="chatbot-input"
              value={mensaje}
              onChange={(e) => {
                setMensaje(e.target.value);
                e.target.style.height = "auto";
                e.target.style.height = e.target.scrollHeight + "px";
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  enviarMensaje(); 
                }
              }}
              placeholder="Escribe tu mensaje aquí..."
              rows={1}
            />
            <button className="chatbot-button" onClick={enviarMensaje} disabled={loading}>
              Enviar
            </button>
          </div>
        </div>
      </div>

      <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          tipo={modalTipo}
          id={registroID}
      />
    </>
  );
}

export default ChatBot;
