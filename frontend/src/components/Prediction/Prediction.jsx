import { Link } from 'react-router-dom';
import './Prediction.css';

const Prediction = () => {
    return (
        <div className="prediction-layout">

            <div className="illustration-section">
                <img src="/AutoEva.png" alt="Asistente virtual" />
            </div>
            <div className="options-section">
                <h2>¿Cómo deseas realizar la evaluación?</h2>
                <p>Selecciona una de las opciones disponibles. Puedes rellenar un formulario o mantener una conversación asistida con <strong>Neurix</strong>, nuestro chat.</p>
                <p>Los datos son confidenciales y en cualquier caso se respestará la privacidad del usuario.</p>
            
                <div className="prediction-buttons">
                    <Link to="/formulario" className="prediction-button">📝 Rellenar formulario</Link>
                    <Link to="/chatbot" className="prediction-button">🤖 Hablar con el asistente</Link>
                </div>
            </div>

        </div>
    );
};

export default Prediction;