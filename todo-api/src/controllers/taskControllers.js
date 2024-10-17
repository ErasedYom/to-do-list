const { getDb } = require('../db');
const { ObjectId } = require('mongodb');

// List all tasks
const listTasks = async (req, res) => {
    const db = getDb();
    try {
        const tasks = await db.collection('tasks').find({}).toArray();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tasks', error });
    }
};

const createTask = async (req, res) => {
    const db = getDb();
    const { name, description, startDate, dueDate } = req.body;
    
    // Create a new task object
    const newTask = { name, description, status: 'to-do', startDate, dueDate };

    try {
        // Insert the new task into the tasks collection
        const result = await db.collection('tasks').insertOne(newTask);

        // Check if the task was inserted successfully
        if (result.insertedId) {
            // Retrieve the inserted task
            const task = { ...newTask, _id: result.insertedId }; // Add the _id property
            res.status(201).json(task); // Return the created task
        } else {
            res.status(500).json({ error: 'Failed to create task.' });
        }
    } catch (error) {
        // Handle any errors that occurred during insertion
        res.status(500).json({ error: 'An error occurred while creating the task.' });
    }
};

// Edit a task
const editTask = async (req, res) => {
    const db = getDb();
    const { id } = req.params;
    const updatedData = req.body;

    try {
        const result = await db.collection('tasks').updateOne({ _id: new ObjectId(id) }, { $set: updatedData });
        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: 'Task not found or no changes made' });
        }
        res.json({ message: 'Task updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error updating task', error });
    }
};


const deleteTask = async (req, res) => {
    const db = getDb();
    const { id } = req.params;

    try {
        // Correctly create ObjectId instance
        const result = await db.collection('tasks').deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Task not found' }); // Handle case where task does not exist
        }
        res.json({ message: 'Task deleted successfully', result });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting task', error });
    }
};

// Mark a task as to-do/done
const markTaskStatus = async (req, res) => {
    const db = getDb();
    const { id } = req.params;
    const { status } = req.body;

    try {
        const result = await db.collection('tasks').updateOne({ _id: new ObjectId(id) }, { $set: { status } });
        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: 'Task not found or status already set' });
        }
        res.json({ message: 'Task status updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error updating task status', error });
    }
};

// Filter tasks by status
const filterTasksByStatus = async (req, res) => {
    const db = getDb();
    const { status } = req.query;

    try {
        const tasks = await db.collection('tasks').find({ status }).toArray();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error filtering tasks by status', error });
    }
};

// Search tasks by name
const searchTasks = async (req, res) => {
    const db = getDb();
    const { name } = req.query;

    try {
        const tasks = await db.collection('tasks').find({ name: { $regex: name, $options: 'i' } }).toArray();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error searching tasks by name', error });
    }
};

// Sort tasks by dates
const sortTasks = async (req, res) => {
    const db = getDb();
    const { field } = req.query;  // expects "startDate", "dueDate", or "doneDate"

    try {
        const tasks = await db.collection('tasks').find({}).sort({ [field]: 1 }).toArray();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error sorting tasks by dates', error });
    }
};

module.exports = { listTasks, createTask, editTask, deleteTask, markTaskStatus, filterTasksByStatus, searchTasks, sortTasks };
