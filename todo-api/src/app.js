const express = require('express');
const bodyParser = require('body-parser');
const { connectToDb } = require('./db'); // Make sure this path is correct
const taskRoutes = require('./routes/taskRoutes'); // Adjust the path as needed
const projectRoutes = require('./routes/projectRoutes'); // Adjust the path as needed

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Connect to the database
connectToDb();

// Define a root route
app.get('/', (req, res) => {
    res.send('Welcome to the Task and Project API!');
});

// Use the task and project routes
app.use('/api/tasks', taskRoutes); // Mount task routes at /api/tasks
app.use('/api/projects', projectRoutes); // Mount project routes at /api/projects

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
