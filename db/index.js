const connection = require("./connection.js")

class db {
    constructor(connection) {
        this.connection = connection
    }
     findAllEmployees(){
         return this.connection.query()
        
    }


} 
 module.exports = new db(connection)