const Lifestyle = ({register, errors}) =>{
    return(
        <fieldset>
            <legend>Estilo de vida</legend>
            
            <div className="form-input">
                <label>
                    Duración del Sueño
                    <select {...register("sueno", { required: "Campo obligatorio" })}>
                        <option value="" hidden>Selecciona una opción</option>
                        <option value="Menos de 5 horas">Menos de 5 horas</option>
                        <option value="5-6 horas">5-6 horas</option>
                        <option value="7-8 horas">7-8 horas</option>
                        <option value="Más de 8 horas">Más de 8 horas</option>
                    </select>
                </label>
                {errors.sueno && <p className="error">{errors.sueno.message}</p>}
            </div>

            <div className="form-input">
                <label>
                    Hábitos alimenticios
                    <select {...register("alimentacion", { required: "Campo obligatorio" })}>
                        <option value="" hidden>Selecciona una opción</option>
                        <option value="Saludables">Saludables</option>
                        <option value="Moderados">Moderados</option>
                        <option value="No saludables">No saludables</option>
                    </select>
                </label>
                {errors.alimentacion && <p className="error">{errors.alimentacion.message}</p>}
            </div>
        </fieldset>
    )
}
export default Lifestyle;