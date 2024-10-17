const express = require('express');
const {
    listProjects,
    createProject,
    editProject,
    deleteProject,
    assignTaskToProject,
    filterTasksByProjectName,
    sortProjects
} = require('../controllers/projectController');

const router = express.Router();

// Route to list all projects
router.get('/', listProjects);  // List all projects

// Route to create a new project
router.post('/', createProject);  // Create a new project

// Route to edit a project by ID
router.put('/:id', editProject);  // Edit a project by ID

// Route to delete a project by ID
router.delete('/:id', deleteProject);  // Delete a project by ID

// Route to assign a task to a project
router.post('/assign', assignTaskToProject);  // Assign a task to a project

// Route to filter tasks by project name
router.get('/filter', filterTasksByProjectName);  // Filter tasks by project name

// Route to sort projects by dates (startDate or dueDate)
router.get('/sort', sortProjects);  // Sort projects by date

module.exports = router;
