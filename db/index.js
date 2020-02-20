const connection = require("./connection.js")

class db {
    constructor(connection) {
        this.connection = connection
    }
    viewEmployees() {
        console.log("\nViewing all employees...\n");
    connection.query(
        "SELECT employee.id, first_name AS FIRSTNAME, last_name AS LASTNAME, title AS POSITION, name AS DEPARTMENT, salary as SALARY FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id;", function (err, res) {
            if (err) throw err;
            console.table('ALL EMPLOYEES', res);
            runApp();
        });
}

} 
 module.exports = new db(connection)