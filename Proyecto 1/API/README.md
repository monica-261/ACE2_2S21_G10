CATALOGOS

ENDPOINT: /api/rol
MÉTODO: GET
RESPONSE:

{
  "registros": [
    {
      "id_rol": 1,
      "descripcion": "Coach"
    },
    {
      "id_rol": 2,
      "descripcion": "Atleta"
    }
  ],
  "status": 200
}

ENDPOINT: /api/tipo_medicion
MÉTODO: GET
RESPONSE:

{
  "registros": [
    {
      "id_tipo_medicion": 1,
      "descripcion": "Ritmo Cardíaco"
    },
    {
      "id_tipo_medicion": 2,
      "descripcion": "Temperatura"
    },
    {
      "id_tipo_medicion": 3,
      "descripcion": "Oxígeno"
    }
  ],
  "status": 200
}

ENDPOINT: /api/registro
MÉTODO: POST
BODY: 

{
    "nombres": "USUARIO",
    "apellidos": "USUARIO",
    "edad": 25,
    "sexo": 1,
    "peso": 99.1,
    "estatura": 120,
    "usuario": "USUARIO",
    "password": "1234",
    "id_rol": 1
}

RESPONSE:

{
    "mensaje": "Usuario Registrado Con éxito!",
    "status": 200
}

*status 404 si exisitio algún error, 200 si noy mensaje siempre viene

ENDPOINT: /api/registro
MÉTODO: POST
BODY: 

{
    "nombres": "USUARIO",
    "apellidos": "USUARIO",
    "edad": 25,
    "sexo": 1,
    "peso": 99.1,
    "estatura": 120,
    "usuario": "USUARIO",
    "password": "1234",
    "id_rol": 1
}

RESPONSE:

{
    "mensaje": "Usuario Registrado Con éxito!",
    "status": 200
}

*status 404 si exisitio algún error, 200 si no y mensaje siempre viene

ENDPOINT: /api/iniciar_sesion
MÉTODO: POST
BODY: 

{
    "usuario": "USUARIO",
    "password": "12345"
}

RESPONSE:

{
    "mensaje": "Bienvenido al sistema!",
    "status": 200
}

*status 404 si exisitio algún error, 200 si no y mensaje siempre viene

ENDPOINT: /api/usuario/perfil
MÉTODO: POST
BODY: 

{
    "id_usuario": "2"
}

RESPONSE:

{
    "registros": [
        {
            "id_usuario": 2,
            "usuario": "USUARIO",
            "nombres": "USUARIO",
            "apellidos": "USUARIO",
            "edad": 25,
            "sexo": 99,
            "peso": "1",
            "estatura": "120",
            "id_coach": null,
            "id_rol": 1
        }
    ],
    "status": 200
}

*status 404 si exisitio algún error, 200 si no y mensaje siempre viene
*registros = [] si no encuentra datos

ENDPOINT: /api/usuario/perfil/actualizar
MÉTODO: POST
BODY: 

{
    "usuario": "USER",
    "nombres": "NOMBRE USER",
    "apellidos": "APELLIDO USER",
    "edad": 100,
    "sexo": 2,
    "peso": 80,
    "estatura": 200,
    "id_rol": 2,
    "id_coach": 99,
    "id_usuario": 2
}

RESPONSE:

{
    "mensaje": "Perfil Actualizado con éxito",
    "status": 200
}

*status 404 si exisitio algún error, 200 si no y mensaje siempre viene

ENDPOINT: /api/usuario/asociar
MÉTODO: POST
BODY: 

{
    "id_coach": 2,
    "id_usuario": 3 
}

RESPONSE:

{
    "mensaje": "Coach asociado con éxito!",
    "status": 200
}

*status 404 si exisitio algún error, 200 si no y mensaje siempre viene

ENDPOINT: /api/usuario/atletas_asociados
MÉTODO: POST
BODY: 

{
    "id_coach": 2
}

RESPONSE:

{
    "registros": [
        {
            "id_usuario": 3,
            "usuario": "USUARIO",
            "nombres": "USUARIO",
            "apellidos": "USUARIO",
            "edad": 25,
            "sexo": 99,
            "peso": "1",
            "estatura": "120",
            "id_coach": 2,
            "id_rol": 1
        }
    ],
    "status": 200
}

*status 404 si exisitio algún error, 200 si no y mensaje siempre viene
*registros = [] si no encuentra datos

ENDPOINT: /api/usuario/medicion
MÉTODO: POST
BODY: 

{
    "id_usuario": 3,
    "id_tipo_medicion": 1,
    "mediciones": [
        {
            "valor": 100
        },
        {
            "valor": 50
        },
        {
            "valor": 80
        },
        {
            "valor": 120
        },
        {
            "valor": 150
        },
        {
            "valor": 120
        }
    ]
}

RESPONSE:

{
    "mensaje": "Medicion guardada",
    "status": 200
}

*status 404 si exisitio algún error, 200 si no y mensaje siempre viene

ENDPOINT: /api/usuario/mediciones/usuario
MÉTODO: POST
BODY: 

{
    "id_usuario": 3
}

RESPONSE:

{
    "registros": [
        {
            "id_medicion": 1,
            "id_tipo_medicion": 1,
            "id_usuario": 3,
            "fecha": "2021-02-13T10:37:00.113Z"
        }
    ],
    "status": 200
}

*status 404 si exisitio algún error, 200 si no y mensaje siempre viene
*registros = [] si no encuentra datos

ENDPOINT: /api/usuario/mediciones
MÉTODO: POST
BODY: 

{
    "id_medicion": 1
}

RESPONSE:

{
    "registros": [
        {
            "id_medicion_detalle": 1,
            "valor": "100",
            "id_medicion": 1
        },
        {
            "id_medicion_detalle": 2,
            "valor": "50",
            "id_medicion": 1
        },
        {
            "id_medicion_detalle": 3,
            "valor": "80",
            "id_medicion": 1
        },
        {
            "id_medicion_detalle": 4,
            "valor": "120",
            "id_medicion": 1
        },
        {
            "id_medicion_detalle": 5,
            "valor": "150",
            "id_medicion": 1
        },
        {
            "id_medicion_detalle": 6,
            "valor": "120",
            "id_medicion": 1
        }
    ],
    "status": 200
}

*status 404 si exisitio algún error, 200 si no y mensaje siempre viene
*registros = [] si no encuentra datos

ENDPOINT:/api/usuario/test
MÉTODO: POST
BODY: 

{
    "id_usuario": 1,
    "mediciones": [
        {
            "velocidad": 20.5,
            "distancia": 2.3
        },
        {
            "velocidad": 20.5,
            "distancia": 2.3
        },
        {
            "velocidad": 20.5,
            "distancia": 2.3
        },
        {
            "velocidad": 20.5,
            "distancia": 2.3
        },
        {
            "velocidad": 20.5,
            "distancia": 2.3
        },
        {
            "velocidad": 20.5,
            "distancia": 2.3
        }
    ]
}

RESPONSE:

{
    "mensaje": "Test guardado",
    "status": 200
}

*status 404 si exisitio algún error, 200 si no y mensaje siempre viene

ENDPOINT: /api/usuario/tests/usuario
MÉTODO: POST
BODY: 

{
    "id_usuario": 3
}

RESPONSE:

{
    "registros": [
        {
            "id_medicion": 1,
            "id_tipo_medicion": 1,
            "id_usuario": 3,
            "fecha": "2021-02-13T10:37:00.113Z"
        }
    ],
    "status": 200
}

*status 404 si exisitio algún error, 200 si no y mensaje siempre viene
*registros = [] si no encuentra datos