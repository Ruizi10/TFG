const Lifestyle = ({register, errors}) =>{
    return(
        <fieldset>
            <legend>Estilo de vida</legend>
            
            <div className="form-input">
                <label>
                    Duración del Sueño
                    <select {...register("sueno", { required: "Campo obligatorio" })}>
                        <option value="" hidden>Selecciona una opción</option>
                        <option value="4">Menos de 5 horas</option>
                        <option value="2">5-6 horas</option>
                        <option value="1">7-8 horas</option>
                        <option value="3">Más de 8 horas</option>
                    </select>
                </label>
                {errors.sueno && <p className="error">{errors.sueno.message}</p>}
            </div>

            <div className="form-input">
                <label>
                    Hábitos alimenticios
                    <select {...register("alimentacion", { required: "Campo obligatorio" })}>
                        <option value="" hidden>Selecciona una opción</option>
                        <option value="2">Saludables</option>
                        <option value="1">Moderados</option>
                        <option value="3">No saludables</option>
                    </select>
                </label>
                {errors.alimentacion && <p className="error">{errors.alimentacion.message}</p>}
            </div>
        </fieldset>
    )
}
export default Lifestyle;