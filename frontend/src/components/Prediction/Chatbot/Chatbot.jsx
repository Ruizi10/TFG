import { useState } from 'react';

export default function ChatBot() {
  const [mensaje, setMensaje] = useState('');
  const [respuesta, setRespuesta] = useState('');
  const [loading, setLoading] = useState(false);

  const enviarMensaje = async () => {
    if (!mensaje.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('http://localhost:8000/send_message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mensaje }),
      });

      if (!res.ok) {
        throw new Error('Error al contactar con el servidor');
      }

      const data = await res.json();
      setRespuesta(data);
    } catch (error) {
      setRespuesta('Error al contactar con el modelo.');
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 500, margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <div>
        <h2><strong>Neurix</strong></h2>
        <img src="/ChatBot.png" alt="Neurix" />
      </div>
      <textarea
        value={mensaje}
        onChange={(e) => setMensaje(e.target.value)}
        rows="4"
        style={{ width: '100%', marginBottom: '1rem' }}
        placeholder="Escribe tu mensaje aquí..."
      />
      <button onClick={enviarMensaje} disabled={loading}>
        {loading ? 'Cargando...' : 'Enviar'}
      </button>
      {respuesta && (
        <div style={{ marginTop: '1rem', whiteSpace: 'pre-wrap' }}>
          <strong>Respuesta:</strong>
          <p>{respuesta}</p>
        </div>
      )}
    </div>
  );
}
