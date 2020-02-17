const mysql = require('mysql');
const inquirer = require('inquirer');
require('console.table');
const db = require('./db');

inquirer.prompt([
    {
        type: "list",
        message: "What would like to do?",
        name: "choice",
        choices: [
            {
                name: "View all employees",
                value: "viewEmployees"
            },
            {
                name: "View all employees by department",
                value: "viewEmployeeByDepartment"
            },
            {
                name: "View all employees by Manager",
                value: "viewEmployeesByManager"
            },
            {
                name: "Add employee",
                value: "addEmployee"
            },
            {
                name: 'Remove employee',
                value: "removeEmployee"
            },
            {
                name: "Update Employees role",
                value: "updateEmployeesRole"
            },
            {
                name: "Update Employee manager",
                value: "updateEmployeeManager"
            },
            {
                name: "View all roles",
                value: "viewAllRoles"
            },
            {
                name: "Add role",
                value: "addRole"
            },
            {
                name: "remove role",
                value: "removeRole"
            },
            // {
            //     name: "View all departments",
            //     value: "viewAllDepartments"
            // },
            // {
            //     name: "Add department",
            //     value: "addDepartment"
            // },
            // {
            //     name: "Remove department",
            //     value: "removeDepartment"
            // },
            {
                name: "Quit",
                value: "quit"
            }
        ]
    }
])
 switch (choice) {
     case "viewEmployees":
     return viewEmployees();

     case "viewEmployeeByDepartment":
     return allEmployeesByDepartment();

    case "viewEmployeesByManager":
    return viewEmployeesByManager();

    case "viewEmployeesByManager":
    return viewEmployeesByManager();

    case "addEmployee":
    return addEmployee();

    case "removeEmployee":
    return removeEmployee();

    case "updateEmployeesRole":
    return updateEmployeeRole();

    case "updateEmployeeManager":
    return updateEmployeeManager();

    case "viewAllRoles":
    return viewAllRoles();

    case "addRole":
    return addRole();

    case "removeRole":
    return removeRole();

    // case "viewAllDepartments"


    // case "addDepartment"


    // case "removeDepartment"


    case "quit":
    return connection.end();
 }
