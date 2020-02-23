USE employeetracker_db;

-- department's table
INSERT INTO department (name)
VALUES ("Sales");

INSERT INTO department (name)
VALUES ("Engineering");

INSERT INTO department (name)
VALUES ("Finance");

INSERT INTO department (name)
VALUES ("Legal");

-- role's table
INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Salesperson", 80000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Lead Engineer", 150000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 120000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 125000, 3);

INSERT INTO role (title, salary, department_id)
VALUES ("Legal Team Lead", 250000, 4);

INSERT INTO role (title, salary, department_id)
VALUES ("Lawyer", 190000, 4);


-- employee's table
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Tre", "Fountain", 4, NULL);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Nye", "Grinnage", 2, NULL);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Rainbow", "Giaquinto", 2);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Tara", "Shaw", 4);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Kelly", "Braun", 6);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Patrick", "Carlton", 8);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Arthur", "Burn", 5);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Eric", "Price", 3);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Erika", "Brunson", 6);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Cody", "Simmering", 7);