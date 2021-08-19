CREATE TABLE public.medicion (
	id_medicion SERIAL PRIMARY KEY,
	velocidad_viento DECIMAL NOT NULL,
	humedad DECIMAL NOT NULL,
	temperatura DECIMAL NOT NULL,
	direccion_viento VARCHAR(15) NOT NULL,
    fecha TIMESTAMP DEFAULT NOW()
);

INSERT INTO public.medicion(velocidad_viento, humedad, temperatura, direccion_viento) VALUES(1.0, 1.0, 1.0, 'N');