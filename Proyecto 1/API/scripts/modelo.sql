CREATE TABLE public.usuario (
	id_usuario SERIAL PRIMARY KEY,
	usuario VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL,
    ubicacion VARCHAR(250) NOT NULL,
);

CREATE TABLE public.medicion (
	id_medicion SERIAL PRIMARY KEY,
	peso DECIMAL NOT NULL,
    id_usuario INTEGER NOT NULL,
    fecha_hora_inicio TIMESTAMP NOT NULL,
    fecha_hora_fin TIMESTAMP NULL,
    CONSTRAINT fk_medicion_usuario FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);

ALTER TABLE public.usuario ADD CONSTRAINT usuario_un UNIQUE (usuario);