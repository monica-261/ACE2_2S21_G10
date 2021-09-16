CREATE TABLE public.usuario (
	id_usuario SERIAL PRIMARY KEY,
	usuario VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    ubicacion VARCHAR(250) NOT NULL
);

CREATE TABLE public.medicion (
	id_medicion SERIAL PRIMARY KEY,
    id_usuario INTEGER NOT NULL,
    fecha_hora_inicio TIMESTAMP NOT NULL,
    fecha_hora_fin TIMESTAMP NULL,
    CONSTRAINT fk_medicion_usuario FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);

CREATE TABLE public.medicion_detalle (
	id_medicion_detalle SERIAL PRIMARY KEY,
    id_medicion INTEGER NOT NULL,
	peso DECIMAL NOT NULL,
    distancia_respaldo DECIMAL NOT NULL,
    CONSTRAINT fk_medicion_detalle_medicion FOREIGN KEY (id_medicion) REFERENCES medicion(id_medicion)
);

