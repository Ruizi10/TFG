const SubmitButton = ( {isSubmitting} ) => {
    return (
        <div className="form-input">
            <button type="submit" className="boton-enviar">
                <img src= "/formCheck.jpg" alt="Logo cuestionario" className="logo-form"/>
                {isSubmitting ? "Enviando" : "Enviar Respuesta"}
            </button>
        </div>
    )
}
export default SubmitButton;