const database = require('../services/database');

module.exports.registrarInicio = async function(){
    let result = await database.ejecutarQuery(`INSERT INTO public.medicion(fecha_hora_fin) VALUES(NULL) RETURNING id_medicion;`)

    return result.rows[0]; //retorna un objeto con {id_medicion: valor}
}

module.exports.registrarDetalle = async function(data){
    await database.ejecutarQuery(
        `INSERT INTO public.medicion_detalle(id_medicion, peso, distancia_respaldo) VALUES($1, $2, $3);`,
        [
            data.id_medicion,
            data.peso,
            data.distancia_respaldo
        ]
    )

    return true
}

module.exports.registrarFin = async function(id_medicion){
    await database.ejecutarQuery(
        `UPDATE public.medicion SET fecha_hora_fin = NOW() WHERE id_medicion = $1;`,
        [id_medicion]
    )

    return true; 
}

module.exports.tiempoSentadoTotal = async function(){
    let result = await database.ejecutarQuery(
        `
        SELECT
            SUM(EXTRACT(EPOCH FROM (fecha_hora_fin - fecha_hora_inicio))/3600) AS tiempo_horas
        FROM medicion
        WHERE 
            fecha_hora_fin IS NOT NULL
        ;
        `
    )

    return result.rows[0]
}

module.exports.tiempoSentadoActual = async function(id_medicion){
    let result = await database.ejecutarQuery(
        `
        SELECT
            SUM(EXTRACT(EPOCH FROM (NOW() - fecha_hora_inicio))/3600) AS tiempo_horas
        FROM medicion
        WHERE 
            id_medicion = $1
        ;
        `,
        [id_medicion]
    )

    return result.rows[0]
}

module.exports.pesoHistorico = async function(){
    let result = await database.ejecutarQuery(
        `
        SELECT 
            TRUNC(AVG(peso),2) peso,
            TO_CHAR(fecha_hora, 'DD/MM/YYYY HH24:MI') fecha_hora
        FROM 
            medicion_detalle
        GROUP BY 
            TO_CHAR(fecha_hora, 'DD/MM/YYYY HH24:MI')
        ORDER BY 
            fecha_hora
        ;
        `
    )

    return result.rows
}

module.exports.pesoActualPromedio = async function(id_medicion){
    let result = await database.ejecutarQuery(
        `
        SELECT 
            TRUNC(AVG(peso),2) peso
        FROM 
            medicion_detalle
        WHERE
            id_medicion = $1
        ;
        `,
        [id_medicion]
    )

    return result.rows[0]
}

module.exports.horariosDeUso = async function(){
    const result = await database.ejecutarQuery(
        `
        SELECT 
            TO_CHAR(fecha_hora_inicio, 'DD/MM/YYYY HH24:MI:SS') inicio,
            TO_CHAR(fecha_hora_fin, 'DD/MM/YYYY HH24:MI:SS') fin
        FROM 
            medicion 
        WHERE 
            fecha_hora_fin  IS NOT NULL
        ORDER BY 
            fecha_hora_inicio DESC
        ;
        `
    )

    return result.rows; 
}

module.exports.cantidadLevantadoPorDia = async function(){
    let result = await database.ejecutarQuery(
        `
        SELECT 
            COUNT(id_medicion) AS cantidad_levantado,
            TO_CHAR(fecha_hora_inicio, 'DD/MM/YYYY') dia
        FROM 
            medicion
        WHERE
            fecha_hora_fin IS NOT NULL
        GROUP BY
            TO_CHAR(fecha_hora_inicio, 'DD/MM/YYYY')
        ORDER BY 
            TO_CHAR(fecha_hora_inicio, 'DD/MM/YYYY') DESC
        ;
        `
    )

    return result.rows; 
}

module.exports.distanciaDelRespaldoPromedioActual = async function(id_medicion){
    let result = await database.ejecutarQuery(
        `
        SELECT 
            TRUNC(AVG(distancia_respaldo),2) distancia
        FROM 
            medicion_detalle
        WHERE
            id_medicion = $1
        ;
        `,
        [id_medicion]
    )

    return result.rows[0]
}

module.exports.distanciaDelRespaldoActual = async function(id_medicion){
    let result = await database.ejecutarQuery(
        `
        SELECT
            distancia_respaldo distancia
        FROM 
            medicion_detalle
        WHERE 
            id_medicion = $1
        ORDER BY 
            id_medicion_detalle DESC
        LIMIT 1
        ;
        `,
        [id_medicion]
    )

    return result.rows[0]
}

module.exports.distanciaDelRespaldoPromedioHistorico = async function(){
    let result = await database.ejecutarQuery(
        `
        SELECT 
            TRUNC(AVG(distancia_respaldo),2) distancia
        FROM 
            medicion_detalle
        ;
        `
    )

    return result.rows
}

module.exports.distanciaDelRespaldoHistorico = async function(){
    let result = await database.ejecutarQuery(
        `
        SELECT 
            TRUNC(AVG(distancia_respaldo),2) distancia,
            TO_CHAR(fecha_hora, 'DD/MM/YYYY HH24:MI') fecha_hora
        FROM 
            medicion_detalle
        GROUP BY 
            TO_CHAR(fecha_hora, 'DD/MM/YYYY HH24:MI')
        ORDER BY 
            fecha_hora
        ;
        `
    )

    return result.rows
}

module.exports.cantidadPosturasIncorrectasPorMinuto = async function(mala_postura){
    let result = await database.ejecutarQuery(
        `
        SELECT
            COUNT(distancia_respaldo) malas_posturas,
            TO_CHAR(fecha_hora, 'DD/MM/YYYY HH24:MI') fecha_mininuto
        FROM 
            medicion_detalle
        WHERE 
            distancia_respaldo >= ${mala_postura}
        GROUP BY 
            TO_CHAR(fecha_hora, 'DD/MM/YYYY HH24:MI')
        ORDER BY 
            TO_CHAR(fecha_hora, 'DD/MM/YYYY HH24:MI')
        ;
        `
    )
        
    return result.rows
}

module.exports.cantidadPosturasIncorrectasPorHora = async function(mala_postura){
    let result = await database.ejecutarQuery(
        `
        SELECT
            COUNT(distancia_respaldo) malas_posturas,
            TO_CHAR(fecha_hora, 'DD/MM/YYYY HH24 horas') fecha_hora
        FROM 
            medicion_detalle
        WHERE 
            distancia_respaldo >= ${mala_postura}
        GROUP BY 
            TO_CHAR(fecha_hora, 'DD/MM/YYYY HH24 horas')
        ORDER BY 
            TO_CHAR(fecha_hora, 'DD/MM/YYYY HH24 horas')
        ;
        `
    )

    return result.rows
}

module.exports.cantidadPosturasIncorrectasPorDia = async function(mala_postura){
    let result = await database.ejecutarQuery(
        `
        SELECT
            COUNT(distancia_respaldo) malas_posturas,
            TO_CHAR(fecha_hora, 'DD/MM/YYYY') dia
        FROM 
            medicion_detalle
        WHERE 
            distancia_respaldo >= ${mala_postura}
        GROUP BY 
            TO_CHAR(fecha_hora, 'DD/MM/YYYY')
        ORDER BY 
            TO_CHAR(fecha_hora, 'DD/MM/YYYY')
        ;
        `
    )

    return result.rows
}