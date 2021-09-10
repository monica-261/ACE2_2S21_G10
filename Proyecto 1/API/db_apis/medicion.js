const database = require('../services/database');

module.exports.registrarMedicion = async function(data){
    let querys = []
    let binds =  []

    querys.push(`SELECT mensaje, estado, id_medicion FROM func_registro_medicion($1, $2, $3);`)

    binds.push([
        data.peso,
        data.distancia_respaldo,
        data.id_usuario,
    ])

    const result = await database.ejecutarTransaccion(querys, binds)

    return result[0].rows[0]; 
} 

module.exports.finalizarMedicion = async function(data){
    let querys = []
    let binds =  []

    querys.push(`SELECT mensaje, estado FROM func_finalizar_medicion($1);`)

    binds.push([
        data.id_medicion,
    ])

    const result = await database.ejecutarTransaccion(querys, binds)

    return result[0].rows[0]; 
} 