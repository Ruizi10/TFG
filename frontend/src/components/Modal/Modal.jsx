import "./Modal.css"

const Modal = ({ isOpen, onClose, tipo, id }) => {
    if (!isOpen) return null;

return (
    <div className="modal" onClick={onClose}>
        <div className={`modal-content ${tipo}`} onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={onClose}>×</span>
            <h2 className="modal-header">
                {tipo === "riesgo" ? "🔍 Posible riesgo de depresión" : "✅ Todo en orden"}
            </h2>
            <p>
                {tipo === "riesgo"
                ? `Gracias por completar el formulario. Hemos detectado un posible riesgo. Tu ID de registro es ${id}. Por favor, consulta con un profesional.`
                : `No se detectaron signos de riesgo. Tu ID de registro es ${id}. ¡Sigue cuidándote!`}
            </p>
        </div>
    </div>
    );
};

export default Modal;
