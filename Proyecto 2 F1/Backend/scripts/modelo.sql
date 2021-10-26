CREATE TABLE public.medicion (
	id_medicion SERIAL PRIMARY KEY,
	peso DECIMAL NOT NULL,
	distancia_respaldo DECIMAL NOT NULL,
	fecha_hora_inicio TIMESTAMP DEFAULT NOW(),
	fecha_hora_fin TIMESTAMP
);