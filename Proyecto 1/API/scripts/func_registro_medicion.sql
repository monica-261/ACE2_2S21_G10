CREATE OR REPLACE FUNCTION func_registro_medicion(
	p_peso DECIMAL,
	p_id_usuario INTEGER
) RETURNS TABLE (
	mensaje TEXT,
	estado INTEGER,
	id_medicion INTEGER
)
AS $$
		DECLARE
			r_id_medicion INTEGER;
        BEGIN
			IF NOT EXISTS(SELECT 1 FROM usuario WHERE id_usuario = p_id_usuario) THEN
				RETURN QUERY SELECT 'No existe usuario' AS mensaje, 404 AS estado, 0 AS id_medicion;
				RETURN;
			END IF;

			INSERT INTO medicion(peso, id_usuario, fecha_hora_inicio, fecha_hora_fin)
			VALUES(p_peso, p_id_usuario, NOW()::TIMESTAMP, NULL)
			RETURNING medicion.id_medicion INTO r_id_medicion;

        	RETURN QUERY SELECT 'Medición registrada con éxito!' AS mensaje, 200 AS estado, r_id_medicion AS id_medicion;
        END;
$$ LANGUAGE plpgsql;