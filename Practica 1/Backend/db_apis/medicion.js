const database = require('../services/database');

module.exports.registrarMedicion = async function(data){
    let querys = []
    let binds =  []

    querys.push(`INSERT INTO public.medicion(velocidad_viento, humedad, temperatura, direccion_viento) VALUES($1, $2, $3, $4);`)

    binds.push([
        data.velocidad_viento,
        data.humedad,
        data.temperatura,
        data.direccion_viento,
    ])

    const result = await database.ejecutarTransaccion(querys, binds)

    return [{ rowCount: 1}]; 
} 