const MentalHealth = ({register, errors}) => {
    return(
        <fieldset>
            <legend>Salud mental</legend>

            <div className="form-input">
                <label>¿Has presentado pensamientos suicidas?</label>
                <div className="radio-group">
                    <label className="radio-option">
                        <input 
                            type="radio"
                            value="Sí"
                            {...register("suicidio", {required: "Campo obligatorio"})}
                        />
                        Sí
                    </label>
                    <label className="radio-option">
                        <input 
                            type="radio"
                            value="No"
                            {...register("suicidio", {required: "Campo obligatorio"})}
                        />
                        No
                    </label>
                </div>
                
                {errors.suicidio && <p className="error">{errors.suicidio.message}</p>}
            </div>

            <div className="form-input">
                <label className="radio-group">Estrés financiero (1-5)</label>
                <input
                    type="range"
                    min="1"
                    max="5"
                    {...register("estresFinanciero", {required: "Campo obligatorio"})}
                />
                {errors.estresFinanciero && <p className="error">{errors.estresFinanciero.message}</p>}
            </div>

            <div className="form-input">
                <label>¿Alguno de tus familiares ha sido diagnosticado con alguna enfermedad mental?</label>
                <div className="radio-group">
                    <label className="radio-option">
                        <input
                            type="radio"
                            value="Sí"
                            {...register("antecedentes", {required: "Campo obligatorio"})}
                        />
                        Sí
                    </label>
                    <label className="radio-option">
                        <input
                            type="radio"
                            value="No"
                            {...register("antecedentes", {required: "Campo obligatorio"})}
                        />
                        No
                    </label>
                </div>
                {errors.antecedentes && <p className="error">{errors.antecedentes.message}</p>}
            </div>
        </fieldset>
    )
}
export default MentalHealth;