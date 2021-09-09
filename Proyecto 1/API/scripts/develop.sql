select * from USUARIO;
select * from medicion m ;

SELECT mensaje, estado, id_usuario FROM func_login('usuario', '12345');

SELECT mensaje, estado FROM func_registro_usuario('user', '12345', 'Desconocida');

SELECT mensaje, estado, id_medicion FROM func_registro_medicion(120, 1);

SELECT mensaje, estado FROM func_finalizar_medicion(5);


