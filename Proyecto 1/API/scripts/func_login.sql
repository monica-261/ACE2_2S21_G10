CREATE OR REPLACE FUNCTION func_login(
	p_usuario VARCHAR,
	p_password VARCHAR
) RETURNS TABLE (
	mensaje TEXT,
	estado INTEGER,
	id_usuario INTEGER
)
AS $$
	declare
		pass VARCHAR;
	begin
	        
	       
	        SELECT u.password INTO pass FROM usuario u WHERE usuario = p_usuario;

            IF pass IS NULL THEN
                RETURN QUERY SELECT 'No existe usuario' AS mensaje, 404 AS estado, 0 AS id_usuario;
				RETURN;
            END IF;
	        
            IF pass = p_password THEN
                RETURN QUERY SELECT 'Bienvenido al Sistema' AS mensaje, 200 AS estado, u.id_usuario AS id_usuario FROM usuario u WHERE u.usuario = p_usuario;
				RETURN;
            END IF;

            RETURN QUERY SELECT 'Contraseña incorrecta' AS mensaje, 404 AS estado, 0 AS id_usuario;
            RETURN;
        END;
$$ LANGUAGE plpgsql;