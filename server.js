const mysql = require('mysql');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
// const db = require('./db/connection');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "yourRootPassword",
    database: "employeeTracker_DB"
  });


function updateServer() {
    connection.query("SELECT * from role", function(error, res) {
      allroles = res.map(role => ({ name: role.title, value: role.id }));
    });
  
    connection.query("SELECT * from department", function(error, res) {
      alldepartments = res.map(dept => ({ name: dept.name, value: dept.id }));
    });
  
    connection.query("SELECT * from employee", function(error, res) {
      allemployees = res.map(employee => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id
      }));
    });
  }
  
  connection.connect(function(err) {
    if (err) throw err;
    console.log("\nWelcome to the Employee Management System!\n");
    init();
    updateServer();
  });


function init() {
    inquirer.prompt([
        {
            type: "list",
            name: "selector",
            message: "What would like to do?",
            choices: [
                "View All Employees",
                "View All Departments",
                "View All Roles",
                "Add Employee",
                "Add Department",
                "Add Role",
                "Update Employee Role",
                "Quit"
            ]


        }
    ]).then(answer => {
        // console.log("in .then, choices=", choices)
        switch (answer.selector) {
            case "View All Employees":
                return viewAllEmployees();

            case "Add Employee":
                return addEmployee();

            case "Update Employee Role":
                return updateEmployeeRole();

            case "View All Roles":
                return viewAllRoles();

            case "Add Role":
                return addRole();

            case "View All Departments":
                return viewAllDepartments();

            case "Add Department":
                return addDepartment();

            case "quit":
                return connection.end()
    }
});
}

function viewAllEmployees() {
    console.log("\nViewing all employees...\n");
    connection.query(
        "SELECT employee.id, first_name AS firstname, last_name AS lastname, title AS role, name AS department, salary as salary FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id;", function (err, res) {
            if (err) throw err;
            console.table('ALL EMPLOYEES', res);
            init();
        });
}

function viewAllDepartments() {
    console.log("\nViewing all departments...\n");
    connection.query(
        "SELECT id, name AS department FROM department", function (err, res) {
            if (err) throw err;
            console.table('ALL DEPARTMENTS', res);
            init();
        });
}

function viewAllRoles() {
    console.log("\nViewing all roles...\n");
    connection.query(
        "SELECT r.id, title AS role, salary, name AS department FROM role r LEFT JOIN department d ON department_id = d.id", function (err, res) {
            if (err) throw err;
            console.table('ALL ROLES', res);
            init();
        });
}

function addEmployee() {
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
                type: "list",
                name: "role",
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
function addDepartment() {
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
function addRole() {
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
function updateEmployeeRole() {
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
                    updateServer();
                    init();
                }
            );
        });
    }