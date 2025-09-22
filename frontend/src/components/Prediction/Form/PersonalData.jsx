const PersonalData = ({register, errors}) => {
    return(
        <fieldset>
            <legend>Información Personal</legend>
            <div className="form-input">
                <label>Género
                    <select {...register("genero", { required: "Campo obligatorio" })}>
                        <option value="" hidden>Selecciona una opción</option>
                        <option value="1">Masculino</option>
                        <option value="2">Femenino</option>
                    </select>
                </label>
                {errors.genero && <p className="error">{errors.genero.message}</p>}
            </div>
            <div className="form-input">
                <label>Edad</label>
                    <input
                        placeholder="Introduce tu edad"
                        type="number"
                        min={"18"}
                        max={"34"}
                        {...register("edad", {
                            required: "Campo obligatorio",
                        })}
                    />
                {errors.edad && <p className="error">{errors.edad.message}</p>}
            </div>
        </fieldset>
    )
}

export default PersonalData