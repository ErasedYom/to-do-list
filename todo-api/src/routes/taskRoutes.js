const express = require('express');
const { 
    listTasks, 
    createTask, 
    editTask, 
    deleteTask, 
    markTaskStatus, 
    filterTasksByStatus, 
    searchTasks, 
    sortTasks 
} = require('../controllers/taskControllers');

const router = express.Router();

router.get('/', listTasks);  // List all tasks
router.get('/filter', filterTasksByStatus);  // Filter tasks by status
router.get('/search', searchTasks);  // Search tasks by name
router.get('/sort', sortTasks);  // Sort tasks by date

router.post('/', createTask);  // Create a new task
router.put('/:id', editTask);  // Edit a task by ID
router.delete('/:id', deleteTask);  // Delete a task by ID
router.patch('/:id/status', markTaskStatus);  // Mark task as to-do/done

module.exports = router;
