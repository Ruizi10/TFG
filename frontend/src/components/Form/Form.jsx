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
            // Poner bonita la respuesta del backend 

            // alert("Formulario enviado correctamente. Resultado: " + JSON.stringify(result));
        } catch (error) {
            console.error("Error al enviar los datos:", error);
            alert("Hubo un error al enviar el formulario. Intenta nuevamente más tarde.");
        }
    };


    return (
    
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Formulario de Bienestar Estudiantil</h2>

            <PersonalData register={register} errors={errors} />
            <AcademicHabits register={register} errors={errors} />
            <Lifestyle register={register} errors={errors} />
            <MentalHealth register={register} errors={errors} />
            <SubmitButton />

        </form> 
    
    )
}

export default Form