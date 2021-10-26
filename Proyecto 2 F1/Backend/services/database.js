const pg = require('pg');
const dbConfig = require('../config/database');

const pool = new pg.Pool(dbConfig.pool);

async function initialize(){
    //pool = 
}

async function close(){
    await pool.end()
}

function ejecutarQuery(query, binds = []){
    return new Promise(async (resolve, reject) => {
        const cliente = await pool.connect()
        try {
            const result = await cliente.query(query, binds)
            resolve(result)
        }catch (error) {
            reject(error)
        }finally{
            cliente.release()
        }
    })
}

function ejecutarTransaccion(querys = [], binds = []){
    return new Promise(async (resolve, reject) => {

        const cliente = await pool.connect()

        try {
            await cliente.query('BEGIN')

            let result = [];

            for (let i = 0; i < querys.length; i++) result.push(await cliente.query(querys[i], binds[i]))

            await cliente.query('COMMIT')

            resolve(result)
        }catch (error) {
            await cliente.query('ROLLBACK')
            
            reject(error)
        }finally{
            cliente.release()
        }
    })
}

module.exports.initialize = initialize;
module.exports.close = close;
module.exports.ejecutarQuery = ejecutarQuery;
module.exports.ejecutarTransaccion = ejecutarTransaccion;