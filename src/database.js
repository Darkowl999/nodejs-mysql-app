//ESTE MODULO ES PARA PODER CONECTARME A LA BD
const mysql= require('mysql');
//ESTE MODULO SIRVE PARA USAR CALL BACKS 
const {promisify}= require('util');
//ESTE MODULO ES PAR REQUERIR LO QUE ESTA EN EL FICHERO key.js
const {database}= require('./keys');
//CON POOL PUEDO HACER LA CONEXION 
const pool = mysql.createPool(database);

//ASI ME CONECTO A LA BD
/** PASO PARAMETROS err, y connection
 * hago un manejo de erroes 
 */
pool.getConnection((err, connection)=>{
    if(err){
        if(err.code==='PROTOCOL_CONNECTION_LOST'){
            console.log('DATABASE CONNECTION WAS CLOSED');
        }
        if(err.code==='ER_CON_COUNT_ERROR'){
            console.log('DATABASE HAS TO MANNY CONNECTIONS');
        }
        if(err.code=== 'ECONNREFUSED'){
            console.log('DATABASE CONNECTION WAS REFUSED');
        }
    }
    if(connection)connection.release();
    console.log('DB is Connected');
    return;
});

pool.query=promisify(pool.query);

module.exports=pool;