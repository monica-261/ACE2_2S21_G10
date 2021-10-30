const medicion = require('../db_apis/medicion');
const utils = require('../utils/utils')

let medicion_actual;

const MALA_POSTURA = 10

module.exports.medicion = async function (request, response, next) {
    try {
        let { tipo, data } = request.body
        let { peso, distancia } = data

        if(tipo == 'SENTADO'){
            if(medicion_actual){
                response = utils.formarResponse(response, `Ya hay medicion en curso`, 404)
                return
            }

            let result = await medicion.registrarInicio()

            if(!result.id_medicion){
                response = utils.formarResponse(response, 'Error al registrar medicion', 404)
                return
            }

            medicion_actual = result.id_medicion

            if(!peso || !distancia){
                response = utils.formarResponse(response, 'Medicion inicial guardada', 200)
                return
            }

            result = await medicion.registrarDetalle({
                id_medicion: medicion_actual,
                peso: peso,
                distancia_respaldo: distancia,
            })
            
            if(!result){
                response = utils.formarResponse(response, 'Medicion inicial guardada, error al guardar detalle', 200)
                return
            }

            response = utils.formarResponse(response, 'Medicion inicial y detalle guardados', 200)
            return

        }else if(tipo == 'MIDIENDO'){
            if(!medicion_actual){
                response = utils.formarResponse(response, `No hay medicion en curso`, 404)
                return
            }
            if(!peso || !distancia){
                response = utils.formarResponse(response, `Sin valores para guardar detalle peso = ${peso} distancia = ${distancia}`, 404)
                return
            }

            let result = await medicion.registrarDetalle({
                id_medicion: medicion_actual,
                peso: peso,
                distancia_respaldo: distancia,
            })
            
            if(!result){
                response = utils.formarResponse(response, 'Error al guardar detalle', 404)
                return
            }

            response = utils.formarResponse(response, 'Detalle guardado', 200)
            return

        }else if(tipo == 'LEVANTADO'){
            if(!medicion_actual){
                response = utils.formarResponse(response, `No hay medicion en curso`, 404)
                return
            }
            if(peso && distancia){
                let result = await medicion.registrarDetalle({
                    id_medicion: medicion_actual,
                    peso: peso,
                    distancia_respaldo: distancia,
                })
                
                if(!result){
                    response = utils.formarResponse(response, 'Error al guardar detalle', 404)
                    return
                }
            }

            let result = await medicion.registrarFin(medicion_actual)

            if(!result){
                response = utils.formarResponse(response, 'Error al registrar fin', 404)
                return
            }

            medicion_actual = undefined

            response = utils.formarResponse(response, 'Medicion finalizada', 200)
            return
        }
    } catch (error) {
        console.log(error)
        response = utils.formarResponse(response, 'Error al guardar medicion', 404)
    }
}

module.exports.tiempoSentadoTotal = async function (request, response, next){
    try {
        let result = await medicion.tiempoSentadoTotal()

        response.status(200).json({
            data: result, 
            status:200
        })
    } catch (error) {
        console.log(error)
        response = utils.formarResponse(response, 'Error al obtener datos', 404)
    }
}

module.exports.tiempoSentadoActual = async function (request, response, next){
    try {
        if(!medicion_actual){
            response = utils.formarResponse(response, `No hay medicion en curso`, 404)
            return
        }

        let result = await medicion.tiempoSentadoActual(medicion_actual)

        response.status(200).json({
            data: result, 
            status:200
        })
    } catch (error) {
        console.log(error)
        response = utils.formarResponse(response, 'Error al obtener datos', 404)
    }
}

module.exports.pesoHistorico = async function (request, response, next){
    try {

        let result = await medicion.pesoHistorico()

        response.status(200).json({
            data: result, 
            status:200
        })
    } catch (error) {
        console.log(error)
        response = utils.formarResponse(response, 'Error al obtener datos', 404)
    }
}

module.exports.pesoActualPromedio = async function (request, response, next){
    try {
        if(!medicion_actual){
            response = utils.formarResponse(response, `No hay medicion en curso`, 404)
            return
        }

        let result = await medicion.pesoActualPromedio(medicion_actual)

        response.status(200).json({
            data: result, 
            status:200
        })
    } catch (error) {
        console.log(error)
        response = utils.formarResponse(response, 'Error al obtener datos', 404)
    }
}

module.exports.horariosDeUso = async function (request, response, next){
    try {

        let result = await medicion.horariosDeUso()

        response.status(200).json({
            data: result, 
            status:200
        })
    } catch (error) {
        console.log(error)
        response = utils.formarResponse(response, 'Error al obtener datos', 404)
    }
}

module.exports.cantidadLevantadoPorDia = async function (request, response, next){
    try {

        let result = await medicion.cantidadLevantadoPorDia()

        response.status(200).json({
            data: result, 
            status:200
        })
    } catch (error) {
        console.log(error)
        response = utils.formarResponse(response, 'Error al obtener datos', 404)
    }
}

module.exports.distanciaDelRespaldoPromedioActual = async function (request, response, next){
    try {
        if(!medicion_actual){
            response = utils.formarResponse(response, `No hay medicion en curso`, 404)
            return
        }

        let result = await medicion.distanciaDelRespaldoPromedioActual(medicion_actual)

        response.status(200).json({
            data: result, 
            status:200
        })
    } catch (error) {
        console.log(error)
        response = utils.formarResponse(response, 'Error al obtener datos', 404)
    }
}

module.exports.distanciaDelRespaldoActual = async function (request, response, next){
    try {
        if(!medicion_actual){
            response = utils.formarResponse(response, `No hay medicion en curso`, 404)
            return
        }

        let result = await medicion.distanciaDelRespaldoActual(medicion_actual)

        response.status(200).json({
            data: result, 
            postura: result.distancia >= MALA_POSTURA ? 'Mala Postura' : 'Postura Correcta',
            status:200
        })
    } catch (error) {
        console.log(error)
        response = utils.formarResponse(response, 'Error al obtener datos', 404)
    }
}

module.exports.distanciaDelRespaldoPromedioHistorico = async function (request, response, next){
    try {

        let result = await medicion.distanciaDelRespaldoPromedioHistorico()

        response.status(200).json({
            data: result, 
            status:200
        })
    } catch (error) {
        console.log(error)
        response = utils.formarResponse(response, 'Error al obtener datos', 404)
    }
}

module.exports.distanciaDelRespaldoHistorico = async function (request, response, next){
    try {

        let result = await medicion.distanciaDelRespaldoHistorico()

        response.status(200).json({
            data: result, 
            status:200
        })
    } catch (error) {
        console.log(error)
        response = utils.formarResponse(response, 'Error al obtener datos', 404)
    }
}

module.exports.cantidadPosturasIncorrectasPorMinuto = async function (request, response, next){
    try {

        let result = await medicion.cantidadPosturasIncorrectasPorMinuto(MALA_POSTURA)

        response.status(200).json({
            data: result, 
            status:200
        })
    } catch (error) {
        console.log(error)
        response = utils.formarResponse(response, 'Error al obtener datos', 404)
    }
}

module.exports.cantidadPosturasIncorrectasPorHora = async function (request, response, next){
    try {

        let result = await medicion.cantidadPosturasIncorrectasPorHora(MALA_POSTURA)

        response.status(200).json({
            data: result, 
            status:200
        })
    } catch (error) {
        console.log(error)
        response = utils.formarResponse(response, 'Error al obtener datos', 404)
    }
}

module.exports.cantidadPosturasIncorrectasPorDia = async function (request, response, next){
    try {

        let result = await medicion.cantidadPosturasIncorrectasPorDia(MALA_POSTURA)

        response.status(200).json({
            data: result, 
            status:200
        })
    } catch (error) {
        console.log(error)
        response = utils.formarResponse(response, 'Error al obtener datos', 404)
    }
}