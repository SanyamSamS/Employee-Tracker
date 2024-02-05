USE employee_tracker_db;

-- Departments
INSERT INTO department (name) VALUES
('Sales'),
('Engineering'),
('Marketing');

-- Roles
INSERT INTO role (title, salary, department_id) VALUES
('Sales Representative', 50000, 1),
('Software Engineer', 80000, 2),
('Marketing Specialist', 60000, 3);

-- Employees
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('John', 'Doe', 1, NULL),
('Jane', 'Smith', 2, 1),
('Bob', 'Johnson', 3, 2);