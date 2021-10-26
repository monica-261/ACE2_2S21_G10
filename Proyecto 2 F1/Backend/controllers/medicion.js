const medicion = require('../db_apis/medicion');
const utils = require('../utils/utils')

module.exports.registrarInicio = async function (request, response, next) {
    try {
        
        const data = {
            peso: request.body.peso,
            distancia_respaldo: request.body.distancia_respaldo,
        }

        const result = await medicion.registrarInicio(data)

        if(result.rowCount == 0) response = utils.formarResponse(response, 'Error al insertar consulta. Campos invalidos', 404)
        else response = utils.formarResponse(response, 'Medicion guardada', 200)

    } catch (error) {
        console.log(error)
        response = utils.formarResponse(response, 'Error al obtener registros.', 404)
    }
}

module.exports.registrarFin = async function (request, response, next) {
    try {
        const result = await medicion.registrarFin(data)

        if(result.rowCount == 0) response = utils.formarResponse(response, 'Error al insertar consulta. Campos invalidos', 404)
        else response = utils.formarResponse(response, 'Medicion finalizada', 200)

    } catch (error) {
        console.log(error)
        response = utils.formarResponse(response, 'Error al obtener registros.', 404)
    }
}