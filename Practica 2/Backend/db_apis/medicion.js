const database = require('../services/database');

module.exports.registrarMedicion = async function(data){
    let querys = []
    let binds =  []

    querys.push(`INSERT INTO public.medicion(velocidad_viento, humedad, temperatura, luz, direccion_viento) VALUES($1, $2, $3, $4, $5);`)

    binds.push([
        data.velocidad_viento,
        data.humedad,
        data.temperatura,
        data.luz,
        data.direccion_viento,
    ])

    const result = await database.ejecutarTransaccion(querys, binds)

    return [{ rowCount: 1}]; 
} 

module.exports.obtenerVelocidadViento = async function(){
    const result = await database.ejecutarQuery(`SELECT velocidad_viento, to_char(fecha, 'DD/MM/YYYY HH24:MI:SS') fecha_hora FROM public.medicion ORDER BY fecha ASC`)

    return result; 
} 

module.exports.obtenerHumedad = async function(){
    const result = await database.ejecutarQuery(`SELECT humedad, to_char(fecha, 'DD/MM/YYYY HH24:MI:SS') fecha_hora FROM public.medicion ORDER BY fecha ASC`)

    return result; 
} 

module.exports.obtenerTemperatura = async function(){
    const result = await database.ejecutarQuery(`SELECT temperatura, to_char(fecha, 'DD/MM/YYYY HH24:MI:SS') fecha_hora FROM public.medicion ORDER BY fecha ASC`)

    return result; 
} 

module.exports.obtenerLuz = async function(){
    const result = await database.ejecutarQuery(`SELECT luz, to_char(fecha, 'DD/MM/YYYY HH24:MI:SS') fecha_hora FROM public.medicion ORDER BY fecha ASC`)

    return result; 
} 

module.exports.obtenerDireccionViento = async function(){
    const result = await database.ejecutarQuery(`SELECT direccion_viento, to_char(fecha, 'DD/MM/YYYY HH24:MI:SS') fecha_hora FROM public.medicion ORDER BY fecha DESC LIMIT 1`)

    return result; 
}

module.exports.obtenerEstadoGeneral = async function(){
    const result = await database.ejecutarQuery(`SELECT luz, temperatura, humedad, velocidad_viento, to_char(fecha, 'DD/MM/YYYY HH24:MI:SS') fecha_hora FROM public.medicion ORDER BY fecha DESC LIMIT 1`)

    return result; 
} 