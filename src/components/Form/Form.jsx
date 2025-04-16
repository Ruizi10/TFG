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

    const onSubmit = (data) => {
        console.log("Datos enviados:", data);
        alert("Evaluación enviada correctamente.");
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