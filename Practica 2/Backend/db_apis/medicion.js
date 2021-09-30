const database = require('../services/database');
const fs =  require('fs')
const path = require('path')

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
    const result = await database.ejecutarQuery('SELECT velocidad_viento, fecha FROM public.medicion ORDER BY fecha DESC')

    return result; 
} 

module.exports.obtenerHumedad = async function(){
    const result = await database.ejecutarQuery('SELECT humedad, fecha FROM public.medicion ORDER BY fecha DESC')

    return result; 
} 

module.exports.obtenerTemperatura = async function(){
    const result = await database.ejecutarQuery('SELECT temperatura, fecha FROM public.medicion ORDER BY fecha DESC')

    return result; 
} 

module.exports.obtenerLuz = async function(){
    const result = await database.ejecutarQuery('SELECT luz, fecha FROM public.medicion ORDER BY fecha DESC')

    return result; 
} 

module.exports.obtenerDireccionViento = async function(){
    const result = await database.ejecutarQuery('SELECT direccion_viento, fecha FROM public.medicion ORDER BY fecha DESC LIMIT 1')

    return result; 
} 