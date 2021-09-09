const database = require('../services/database');

module.exports.iniciarSesion = async function(data){
    let querys = []
    let binds =  []

    querys.push(`SELECT mensaje, estado, id_usuario FROM func_login($1, $2);`)

    binds.push([
        data.usuario,
        data.password,
    ])

    const result = await database.ejecutarTransaccion(querys, binds)
    
    return result[0].rows[0]; 
} 

module.exports.registrarUsuario = async function(data){
    let querys = []
    let binds =  []

    querys.push(`SELECT mensaje, estado FROM func_registro_usuario($1, $2, $3);`)

    binds.push([
        data.usuario,
        data.password,
        data.ubicacion,
    ])

    const result = await database.ejecutarTransaccion(querys, binds)

    return result[0].rows[0]; 
} 