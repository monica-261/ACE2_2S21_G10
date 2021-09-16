CREATE OR REPLACE FUNCTION func_registro_medicion(
	p_peso DECIMAL,
	p_distancia_respaldo DECIMAL,
	p_id_medicion INTEGER
) RETURNS TABLE (
	mensaje TEXT,
	estado INTEGER
)
AS $$
        BEGIN

			INSERT INTO medicion_detalle(id_medicion, peso, distancia_respaldo)
			VALUES(p_id_medicion, p_peso, p_distancia_respaldo);

        	RETURN QUERY SELECT 'Medición Detalle registrada con éxito!' AS mensaje, 200 AS estado;
        END;
$$ LANGUAGE plpgsql;