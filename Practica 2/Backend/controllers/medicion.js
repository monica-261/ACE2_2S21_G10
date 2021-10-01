const medicion = require('../db_apis/medicion');
const utils = require('../utils/utils')

module.exports.registrarMedicion = async function (request, response, next) {
    try {
        
        const data = {
            velocidad_viento: request.body.velocidad_viento,
            humedad: request.body.humedad,
            temperatura: request.body.temperatura,
            luz: request.body.luz,
            direccion_viento: request.body.direccion_viento,
        }

        const result = await medicion.registrarMedicion(data)

        if(result.rowCount == 0) response = utils.formarResponse(response, 'Error al insertar consulta. Campos invalidos', 404)
        else response = utils.formarResponse(response, 'Medicion guardada', 200)

    } catch (error) {
        console.log(error)
        response = utils.formarResponse(response, 'Error al obtener registros.', 404)
    }
}

module.exports.obtenerVelocidadViento = async function (request, response, next) {
    try {
        const result = await medicion.obtenerVelocidadViento()

        response.status(200).json({
            registros: result.rows,
            status: 200
        })
    } catch (error) {
        console.log(error)
        response = utils.formarResponse(response, 'Error al obtener registros.', 404)
    }
}

module.exports.obtenerHumedad = async function (request, response, next) {
    try {
        const result = await medicion.obtenerHumedad()

        response.status(200).json({
            registros: result.rows,
            status: 200
        })
    } catch (error) {
        console.log(error)
        response = utils.formarResponse(response, 'Error al obtener registros.', 404)
    }
}

module.exports.obtenerTemperatura = async function (request, response, next) {
    try {
        const result = await medicion.obtenerTemperatura()

        response.status(200).json({
            registros: result.rows,
            status: 200
        })
    } catch (error) {
        console.log(error)
        response = utils.formarResponse(response, 'Error al obtener registros.', 404)
    }
}

module.exports.obtenerLuz = async function (request, response, next) {
    try {
        const result = await medicion.obtenerLuz()

        response.status(200).json({
            registros: result.rows,
            status: 200
        })
    } catch (error) {
        console.log(error)
        response = utils.formarResponse(response, 'Error al obtener registros.', 404)
    }
}

module.exports.obtenerDireccionViento = async function (request, response, next) {
    try {
        const result = await medicion.obtenerDireccionViento()

        response.status(200).json({
            registros: result.rows,
            status: 200
        })
    } catch (error) {
        console.log(error)
        response = utils.formarResponse(response, 'Error al obtener registros.', 404)
    }
}