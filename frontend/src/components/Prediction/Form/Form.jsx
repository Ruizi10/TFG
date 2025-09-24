import { useForm } from "react-hook-form";
import { useState } from "react";
import "./Form.css";
import PersonalData from "./PersonalData";
import AcademicHabits from "./AcademicHabits";
import Lifestyle from "./Lifestyle";
import MentalHealth from "./MentalHealth";
import SubmitButton from "./SubmitButton";
import Modal from "../../Modal/Modal";


const Form = () => {

    const {
        register,
        handleSubmit,
        formState:{errors}
    } = useForm();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalTipo, setModalTipo] = useState(null); // "ok" o "riesgo"
    const [registroID, setRegistroID] = useState(null);

    const onSubmit = async (data) => {
        try {
            const mappedData = {
                genero: parseInt(data.genero),
                edad: parseInt(data.edad),
                presionAcademica: parseInt(data.presionAcademica),
                satisfaccionEstudios: parseInt(data.satisfaccionEstudios),
                sueno: parseInt(data.sueno),
                alimentacion: parseInt(data.alimentacion),
                suicidio: parseInt(data.suicidio),
                horasEstudio: parseInt(data.horasEstudio),
                estresFinanciero: parseInt(data.estresFinanciero),
                antecedentes: parseInt(data.antecedentes),
            };

            const response = await fetch("http://localhost:8000/predict", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify(mappedData),
            });
        
            if (!response.ok) { throw new Error("Error en la respuesta del servidor"); }
        
            const result = await response.json();

            setRegistroID(result.id_registro);
            setModalTipo(result.resultado ? "riesgo" : "ok");
            setModalOpen(true);

        } catch (error) {
            console.error("Error al enviar los datos:", error);
            alert("Hubo un error al enviar el formulario. Intenta nuevamente más tarde.");
        } finally {
            setIsSubmitting(false)
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
                <SubmitButton isSubmitting={isSubmitting} />
            </form>
            <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                tipo={modalTipo}
                id={registroID}
            />
        </>
    )
}

export default Form;