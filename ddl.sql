CREATE TABLE FormularioEstudiante (
    id INT AUTO_INCREMENT PRIMARY KEY,
    genero VARCHAR(50),
    edad INT,
    presionAcademica INT,
    satisfaccionEstudios INT,
    horasEstudio INT,
    sueno VARCHAR(50),
    alimentacion VARCHAR(50),
    suicidio BOOLEAN,
    estresFinanciero INT,
    antecedentes BOOLEAN,
    depresion BOOLEAN
);