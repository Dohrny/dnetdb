var mysql = require('mysql')

//connection details for the db
var pool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: 'starcraft',
    database: 'mydb'
})

exports.pool = pool