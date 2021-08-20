const database = require('../services/database');
const fs =  require('fs')
const path = require('path')

module.exports.registrarMedicion = async function(data){
    fs.writeFile(path.join(__dirname, '..', '..', 'sketch_210818a', 'mediciones.txt'), `${data.velocidad_viento}|${data.humedad}|${data.temperatura}|${data.direccion_viento}`, () => {});

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