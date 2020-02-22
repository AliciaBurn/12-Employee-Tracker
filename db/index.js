const connection = require("./connection.js")

class db {
    constructor(connection) {
        this.connection = connection
        console.log("help");
    }
    viewEmployees() {
        console.log("\nViewing all employees...\n");
        connection.query(
            "SELECT employee.id, first_name AS firstname, last_name AS lastname, title AS role, name AS department, salary as salary FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id;", function (err, res) {
                if (err) throw err;
                console.table('ALL EMPLOYEES', res);
                init();
            });
    }

    viewAllDepartments() {
        console.log("\nViewing all departments...\n");
        connection.query(
            "SELECT id, name AS department FROM department", function (err, res) {
                if (err) throw err;
                console.table('ALL DEPARTMENTS', res);
                init();
            });
    }

    viewAllRoles() {
        console.log("\nViewing all roles...\n");
        connection.query(
            "SELECT r.id, title AS role, salary, name AS department FROM role r LEFT JOIN department d ON department_id = d.id", function (err, res) {
                if (err) throw err;
                console.table('ALL ROLES', res);
                init();
            });
    }

    addEmployee() {
        updateServer();
        inquirer
            .prompt([
                {
                    type: "input",
                    name: "first_name",
                    message: "What is their first name?"
                },
                {
                    type: "input",
                    name: "last_name",
                    message: "What is their last name?"
                },
                {
                    name: "role",
                    type: "list",
                    message: "What is their role?",
                    choices: allroles
                }
            ])
            .then(function (choices) {
                connection.query(
                    "INSERT INTO employee SET ?",
                    {
                        first_name: choices.first_name,
                        last_name: choices.last_name,
                        role_id: choices.role
                    },
                    function (err, res) {
                        if (err) throw err;
                        console.table("\nnew employee added.\n");
                        init();
                    }
                );
            });
    }
    addDepartment() {
        updateServer();
        inquirer
            .prompt([
                {
                    type: "input",
                    name: "new_department",
                    message: "What department would you like to add?"
                }
            ])
            .then(function (choices) {
                connection.query(
                    "INSERT INTO department SET ?",
                    {
                        name: choices.new_department
                    },
                    function (err, res) {
                        if (err) throw err;
                        console.table("\nnew department added.\n");
                        updateServer();
                        init();
                    }
                );
            });
    }
    addRole() {
        updateServer();
        inquirer
            .prompt([
                {
                    type: "input",
                    name: "new_role",
                    message: "What role would you like to add?"
                },
                {
                    type: "input",
                    name: "new_salary",
                    message: "What is the salary of this role?"
                },
                {
                    name: "department",
                    type: "list",
                    message: "Which department does this role belong to?",
                    choices: alldepartments
                }
            ])
            .then(function (choices) {
                connection.query(
                    "INSERT INTO role SET ?",
                    {
                        title: choices.new_role,
                        salary: choices.new_salary,
                        department_id: choices.department
                    },
                    function (err, res) {
                        if (err) throw err;
                        console.table("\nnew role added.\n");
                        updateServer();
                        init();
                    }
                );
            });
    }
    updateEmployeeRole() {
        updateServer();
        inquirer
            .prompt([
                {
                    name: "employee",
                    type: "list",
                    message: "Who would you like to update?",
                    choices: allemployees
                },
                {
                    name: "role",
                    type: "list",
                    message: "Which role does this employee have?",
                    choices: allroles
                }
            ])

            .then(choices => {
                connection.query(
                    "UPDATE employee SET ? WHERE ?",
                    [
                        {
                            role_id: choices.role
                        },
                        {
                            id: choices.employee
                        }
                    ],
                    function (err, res) {
                        if (err) throw err;
                        console.table("\nthis employee's role is updated.\n");
                        // updateServer();
                        // init();
                    }
                );
            });


        module.exports = new db(connection)
    }
}