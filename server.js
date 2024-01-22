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
            'View all employees',
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

                case 'View all employees':
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
                    connection.end();
                    console.log('Exiting the application.');
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
      'SELECT * FROM employees',
      (err, roles) => {
        if (err) throw err;
        console.table(employees);
        startApp();
      }
    );
  }

// Function to add a department


// Function to add a role


// Function to add an employee


// Function to update an employee role


// Function to exit the application
