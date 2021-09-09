CREATE OR REPLACE FUNCTION func_registro_usuario(
	p_usuario VARCHAR,
	p_password VARCHAR,
	p_ubicacion VARCHAR
) RETURNS TABLE (
	mensaje TEXT,
	estado INTEGER
)
AS $$
        BEGIN
			IF EXISTS(SELECT 1 FROM usuario WHERE usuario = p_usuario) THEN
				RETURN QUERY SELECT 'Usuario ya existe' AS mensaje, 404 AS estado;
				RETURN;
			END IF;

			INSERT INTO usuario(usuario, password, ubicacion)
			VALUES(p_usuario, p_password, p_ubicacion);

        	RETURN QUERY SELECT 'Usuario registardo con exito!' AS mensaje, 200 AS estado;
        END;
$$ LANGUAGE plpgsql;