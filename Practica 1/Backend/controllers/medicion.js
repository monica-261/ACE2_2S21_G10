const usuarios = require('../db_apis/medicion');
const utils = require('../utils/utils')
const fs =  require('fs')
const path = require('path')

module.exports.registrarMedicion = async function (request, response, next) {
    try {
        
        const data = {
            velocidad_viento: request.body.velocidad_viento,
            humedad: request.body.humedad,
            temperatura: request.body.temperatura,
            direccion_viento: request.body.direccion_viento,
        }
        
        fs.writeFile(path.join(__dirname, '..', '..', 'mediciones.txt'), `${data.velocidad_viento}|${data.humedad}|${data.temperatura}|${data.direccion_viento}`, () => {});

        const result = await usuarios.registrarMedicion(data)

        if(result.rowCount == 0) response = utils.formarResponse(response, 'Error al insertar consulta. Campos invalidos', 404)
        else response = utils.formarResponse(response, 'Medicion guardada', 200)

    } catch (error) {
        console.log(error)
        response = utils.formarResponse(response, 'Error al obtener registros.', 404)
    }
}