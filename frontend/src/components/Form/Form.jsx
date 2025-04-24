import { useForm } from "react-hook-form";
import "./Form.css";
import PersonalData from "./PersonalData";
import AcademicHabits from "./AcademicHabits";
import Lifestyle from "./Lifestyle";
import MentalHealth from "./MentalHealth";
import SubmitButton from "./SubmitButton";



const Form = () => {

    const {
        register,
        handleSubmit,
        formState:{errors}
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await fetch("http://localhost:8000/predict", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
        
            if (!response.ok) {
                throw new Error("Error en la respuesta del servidor");
            }
        
            const result = await response.json();
            console.log("Respuesta del backend:", result);
            
            const modal = document.getElementById("resultadoModal");
            const titulo = document.getElementById("tituloResultado");
            const mensaje = document.getElementById("mensajeResultado");

            // Personalizar el mensaje
            if (result.resultado) {
                titulo.textContent = "🔍 Posible riesgo de depresión";
                mensaje.textContent = `Gracias por completar el formulario. Hemos detectado un posible riesgo. Tu ID de registro es ${result.id_registro}. Por favor, consulta con un profesional.`;
            } else {
                titulo.textContent = "✅ Todo en orden";
                mensaje.textContent = `No se detectaron signos de riesgo. Tu ID de registro es ${result.id_registro}. ¡Sigue cuidándote!`;
            }

            // Mostrar el modal
            modal.style.display = "block";

            // Cerrar al hacer clic en la X
            document.querySelector(".close").onclick = () => {
            modal.style.display = "none";
            };

            // Cerrar al hacer clic fuera del contenido
            window.onclick = (event) => {
                if (event.target === modal) {
                    modal.style.display = "none";
                }
            };

            // alert("Formulario enviado correctamente. Resultado: " + JSON.stringify(result));
        } catch (error) {
            console.error("Error al enviar los datos:", error);
            alert("Hubo un error al enviar el formulario. Intenta nuevamente más tarde.");
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2>Formulario de Bienestar Estudiantil</h2>
            
                <PersonalData register={register} errors={errors} />
                <AcademicHabits register={register} errors={errors} />
                <Lifestyle register={register} errors={errors} />
                <MentalHealth register={register} errors={errors} />
                <SubmitButton />
            </form>
        
            {/* Modal de resultado */}
            <div id="resultadoModal" className="modal">
                <div className="modal-content">
                    <span className="close">&times;</span>
                    <h2 className="modal-header" id="tituloResultado"></h2>
                    <p id="mensajeResultado"></p>
                </div>
            </div>
        </>
    )

    // return (
        
        
        // <form onSubmit={handleSubmit(onSubmit)}>
        //     <h2>Formulario de Bienestar Estudiantil</h2>

        //     <PersonalData register={register} errors={errors} />
        //     <AcademicHabits register={register} errors={errors} />
        //     <Lifestyle register={register} errors={errors} />
        //     <MentalHealth register={register} errors={errors} />
        //     <SubmitButton />

        // </form> 
        
    // )
}

export default Form