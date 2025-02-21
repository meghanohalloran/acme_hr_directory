const express = require('express');
const { Employee, Department } = require('./models');
const app = express();

app.use(express.json());

// Get all employees
app.get('/api/employees', async (req, res) => {
  const employees = await Employee.findAll();
  res.json(employees);
});

// Get all departments
app.get('/api/departments', async (req, res) => {
  const departments = await Department.findAll();
  res.json(departments);
});

// Create new employee
app.post('/api/employees', async (req, res, next) => {
  try {
    const employee = await Employee.create(req.body);
    res.status(201).json(employee);
  } catch (err) {
    next(err);
  }
});

// Delete an employee
app.delete('/api/employees/:id', async (req, res, next) => {
  try {
    await Employee.destroy({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

// Update an employee
app.put('/api/employees/:id', async (req, res, next) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (employee) {
      await employee.update(req.body);
      res.json(employee);
    } else {
      res.status(404).json({ error: 'Employee not found' });
    }
  } catch (err) {
    next(err);
  }
});

// Error handling
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
