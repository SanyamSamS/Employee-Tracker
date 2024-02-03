require('dotenv').config();
const inquirer = require('inquirer');
const mysql = require('mysql2');

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'employee_tracker_db',
  });


// Function to start the application
function startApp() {
    // Inquirer prompt to choose actions
    inquirer
        .prompt({
        name: 'action',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            'View all departments',
            'View all roles',
            'View all employee',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            'Exit',
        ],
        })
        .then((answer) => {
            switch (answer.action) {
                case 'View all departments':
                    viewDepartments();
                    break;

                case 'View all roles':
                    viewRoles();
                    break;

                case 'View all employee':
                    viewEmployees();
                    break;

                case 'Add a department':
                    addDepartment();
                    break;

                case 'Add a role':
                    addRole();
                    break;

                case 'Add an employee':
                    addEmployee();
                    break;

                case 'Update an employee role':
                    updateEmployeeRole();
                    break;

                case 'Exit':
                    exitApp();
                    break;

                default:
                    break;
            }
        });
}

// Function to view all departments
function viewDepartments() {
    db.query('SELECT * FROM department', (err, departments) => {
        console.table(departments);
        startApp();
    });
}

// Function to view all roles
function viewRoles() {
    db.query(
      'SELECT * FROM role',
      (err, roles) => {
        if (err) throw err;
        console.table(roles);
        startApp();
      }
    );
  }

// Function to view all employees
function viewEmployees() {
    db.query(
      'SELECT * FROM employee',
      (err, employee) => {
        if (err) throw err;
        console.table(employee);
        startApp();
      }
    );
  }

// Function to add a department
function addDepartment() {
    inquirer
        .prompt({
            name: 'department',
            type: 'input',
            message: 'What is the name of the department?',
        })
        .then((answer) => {
            db.query(
                'INSERT INTO department SET ?',
                {
                    name: answer.department,
                },
                (err) => {
                    if (err) throw err;
                    console.log('Department added successfully!');
                    startApp();
                }
            );
        });
}

// Function to add a role
function addRole() {
    inquirer
        .prompt([
            {
                name: 'title',
                type: 'input',
                message: 'What is the title of the role?',
            },
            {
                name: 'salary',
                type: 'input',
                message: 'What is the salary of the role?',
            },
            {
                name: 'department_id',
                type: 'input',
                message: 'What is the department ID of the role?',
            },
        ])
        .then((answer) => {
            db.query(
                'INSERT INTO role SET ?',
                {
                    title: answer.title,
                    salary: answer.salary,
                    department_id: answer.department_id,
                },
                (err) => {
                    if (err) throw err;
                    console.log('Role added successfully!');
                    startApp();
                }
            );
        });
}

// Function to add an employee
function addEmployee() {
    inquirer
        .prompt([
            {
                name: 'first_name',
                type: 'input',
                message: 'What is the first name of the employee?',
            },
            {
                name: 'last_name',
                type: 'input',
                message: 'What is the last name of the employee?',
            },
            {
                name: 'role_id',
                type: 'input',
                message: 'What is the role ID of the employee?',
            },
            {
                name: 'manager_id',
                type: 'input',
                message: 'What is the manager ID of the employee?',
            },
        ])
        .then((answer) => {
            db.query(
                'INSERT INTO employee SET ?',
                {
                    first_name: answer.first_name,
                    last_name: answer.last_name,
                    role_id: answer.role_id,
                    manager_id: answer.manager_id || null,
                },
                (err) => {
                    if (err) throw err;
                    console.log('Employee added successfully!');
                    startApp();
                }
            );
        });
}

// Function to update an employee role
function updateEmployeeRole() {
    inquirer
        .prompt([
            {
                name: 'employee_id',
                type: 'input',
                message: 'What is the ID of the employee?',
            },
            {
                name: 'role_id',
                type: 'input',
                message: 'What is the new role ID of the employee?',
            },
        ])
        .then((answer) => {
            db.query(
                'UPDATE employee SET ? WHERE ?',
                [
                    {
                        role_id: answer.role_id,
                    },
                    {
                        id: answer.employee_id,
                    },
                ],
                (err) => {
                    if (err) throw err;
                    console.log('Employee role updated successfully!');
                    startApp();
                }
            );
        });
}

// Function to exit the application
function exitApp() {
    console.log('Goodbye!');
    process.exit();
}

startApp();