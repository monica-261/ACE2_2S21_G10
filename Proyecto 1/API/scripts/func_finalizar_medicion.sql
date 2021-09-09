CREATE OR REPLACE FUNCTION func_finalizar_medicion(
	p_id_medicion INTEGER
) RETURNS TABLE (
	mensaje TEXT,
	estado INTEGER
)
AS $$
        BEGIN
			IF NOT EXISTS(SELECT 1 FROM medicion WHERE id_medicion = p_id_medicion) THEN
				RETURN QUERY SELECT 'No existe medicion' AS mensaje, 404 AS estado;
				RETURN;
			END IF;

			UPDATE medicion 
			SET
				fecha_hora_fin = NOW()::TIMESTAMP
			WHERE id_medicion = p_id_medicion;

        	RETURN QUERY SELECT 'Medición actualizada con éxito!' AS mensaje, 200 AS estado;
        END;
$$ LANGUAGE plpgsql;