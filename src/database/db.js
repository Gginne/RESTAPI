//Imports
const mysql = require("mysql")
const util = require("util")
//Credetials
const db_config = {
    connectionLimit : 10,
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME
}

const db = mysql.createPool(db_config);

db.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.')
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.')
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.')
        }
    }
    
    if (connection) {
        console.log("connected to database")
        connection.release()
    }
   
    return
    })

db.query = util.promisify(db.query)

//Setup connection
module.exports = db