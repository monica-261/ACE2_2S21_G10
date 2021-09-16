const medicion = require('../db_apis/medicion');
const utils = require('../utils/utils')

module.exports.registrarNuevaMedicion = async function(request, response, next){
    try {
        data = {
            id_usuario: request.body.id_usuario,
        }

        const result = await medicion.registrarNuevaMedicion(data)

        response.status(200).json({
            mensaje: result.mensaje,
            estado: result.estado,
            id_medicion: result.id_medicion,
        })

    } catch (error) {
        console.log(error)
        response = utils.formarResponse(response, `Error al registrar medición`, 404)
    }
}

module.exports.registrarMedicionDetalle = async function(request, response, next){
    try {
        data = {
            peso: request.body.peso,
            distancia_respaldo: request.body.distancia_respaldo,
            id_medicion: request.body.id_medicion,
        }

        const result = await medicion.registrarMedicionDetalle(data)

        response.status(200).json({
            mensaje: result.mensaje,
            estado: result.estado,
        })

    } catch (error) {
        console.log(error)
        response = utils.formarResponse(response, `Error al registrar medición detalle`, 404)
    }
}
module.exports.finalizarMedicion = async function(request, response, next){
    try {
        data = {
            id_medicion: request.body.id_medicion,
        }

        const result = await medicion.finalizarMedicion(data)

        response = utils.formarResponse(response, result.mensaje, result.estado)

    } catch (error) {
        console.log(error)
        response = utils.formarResponse(response, `Error al registrar usuario`, 404)
    }
}