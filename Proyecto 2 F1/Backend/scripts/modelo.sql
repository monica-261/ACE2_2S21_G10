CREATE TABLE public.medicion (
	id_medicion SERIAL PRIMARY KEY,
	fecha_hora_inicio TIMESTAMP DEFAULT NOW(),
	fecha_hora_fin TIMESTAMP
);

CREATE TABLE public.medicion_detalle (
	id_medicion_detalle SERIAL PRIMARY KEY,
	id_medicion INT NOT NULL,
	peso DECIMAL NOT NULL,
	distancia_respaldo DECIMAL NOT NULL,
	fecha_hora TIMESTAMP DEFAULT NOW(),
	FOREIGN KEY (id_medicion) REFERENCES medicion(id_medicion)
);