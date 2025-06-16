const AcademicHabits = ({ register, errors}) => {
    return(
        <fieldset>
            <legend>Hábitos académicos</legend>

            <div className="form-input">
                <label>Presión académica (1-5)
                    <input 
                        type="range"
                        min="1"
                        max="5"
                        {...register("presionAcademica",{
                            required: "Campo obligatorio"
                        })}
                    />
                </label>
                {errors.presionAcademica && <p className="error">{errors.presionAcademica.message}</p>}
            </div>
            
            <div className="form-input">
                <label>Satisfacción con los estudios (1-5)
                    <input 
                        type="range"
                        min="1"
                        max="5"
                        {...register("satisfaccionEstudios",{
                            required: "Campo obligatorio"
                        })}
                    />
                </label>
                {errors.presionAcademica && <p className="error">{errors.satisfaccionEstudios.message}</p>}
            </div>

            <div className="form-input">
                <label>Horas de estudio por día
                    <input
                        placeholder="Introduce las horas de estudio"
                        type="number"
                        min="0"
                        max="12"
                        {...register("horasEstudio",{
                            required: "Campo obligatorio"
                        })}
                    />
                </label>
                {errors.horasEstudio && <p className="error">{errors.horasEstudio.message}</p>}
            </div>
        </fieldset>
    )
}
export default AcademicHabits