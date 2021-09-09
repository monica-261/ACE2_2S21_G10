const autenticacion = require('../db_apis/autenticacion');
const utils = require('../utils/utils')

module.exports.iniciarSesion = async function(request, response, next){
    try {
        data = {
            usuario: request.body.usuario,
            password: request.body.password,
        }

        const result = await autenticacion.iniciarSesion(data)

        response.status(200).json({
            mensaje: result.mensaje,
            estado: result.estado,
            id_usuario: result.id_usuario,
        })

    } catch (error) {
        console.log(error)
        response = utils.formarResponse(response, `Error al iniciar sesión`, 404)
    }
}

module.exports.registrarUsuario = async function(request, response, next){
    try {
        data = {
            usuario: request.body.usuario,
            password: request.body.password,
            ubicacion: request.body.ubicacion,
        }

        const result = await autenticacion.registrarUsuario(data)

        response = utils.formarResponse(response, result.mensaje, result.estado)

    } catch (error) {
        console.log(error)
        response = utils.formarResponse(response, `Error al registrar usuario`, 404)
    }
}