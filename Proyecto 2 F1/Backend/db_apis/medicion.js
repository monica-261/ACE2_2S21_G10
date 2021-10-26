const database = require('../services/database');

module.exports.registrarInicio = async function(data){
    let querys = []
    let binds =  []

    querys.push(`INSERT INTO public.medicion(peso, distancia_respaldo) VALUES($1, $2);`)

    binds.push([
        data.peso,
        data.distancia_respaldo,
    ])

    await database.ejecutarTransaccion(querys, binds)

    return [{ rowCount: 1}]; 
}

module.exports.registrarFin = async function(){
    querys.push(`UPDATE public.medicion SET fecha_hora_fin = NOW() WHERE fecha_hora_fin IS NULL;`)

    await database.ejecutarTransaccion(querys)

    return [{ rowCount: 1}]; 
}

module.exports.tiempoSentadoTotal = async function(){
    
}

module.exports.tiempoSentadoActual = async function(){

}

module.exports.pesoHistorico = async function(){

}

module.exports.pesoActual = async function(){

}

module.exports.horariosDeUso = async function(){
    const result = await database.ejecutarQuery(`SELECT fecha_hora_inicio, fecha_hora_fin FROM public.medicion ORDER BY fecha_hora_inicio DESC`)

    return result; 
}

module.exports.movimientoGeneral = async function(){

}