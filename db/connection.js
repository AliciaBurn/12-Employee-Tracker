const mysql = require('mysql')

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "yourRootPassword",
    database: "employeeTracker_DB"
});

connection.connect()
 module.exports = connection