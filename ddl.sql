CREATE TABLE public.formularioestudiante (
	id text NOT NULL,
	genero text NOT NULL,
	edad int8 NOT NULL,
	presionAcademica int8 NOT NULL,
	satisfaccionEstudios int8 NOT NULL,
	horasEstudio int8 NOT NULL,
	sueno text NOT NULL,
	alimentacion text NOT NULL,
	suicidio bool NOT NULL,
	estresFinanciero int8 NOT NULL,
	antecedentes bool NOT NULL,
	depresion bool NOT NULL,
	CONSTRAINT formularioestudiante_pkey PRIMARY KEY (id)
);