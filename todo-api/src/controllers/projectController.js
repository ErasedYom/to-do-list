const { getDb } = require('../db');
const { ObjectId } = require('mongodb');

// List all projects
const listProjects = async (req, res) => {
    const db = getDb();
    try {
        const projects = await db.collection('projects').find({}).toArray();
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching projects', error });
    }
};

// Create a project
const createProject = async (req, res) => {
    const db = getDb();
    const { name, description, startDate, dueDate } = req.body;
    const newProject = { name, description, startDate, dueDate, tasks: [] };

    try {
        const result = await db.collection('projects').insertOne(newProject);
        if (result.insertedId) {
            const project = { ...newProject, _id: result.insertedId };
            res.status(201).json(project);
        } else {
            res.status(500).json({ error: 'Failed to create project.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while creating the project.', error });
    }
};

// Edit a project
const editProject = async (req, res) => {
    const db = getDb();
    const { id } = req.params;
    const updatedData = req.body;

    try {
        const result = await db.collection('projects').updateOne({ _id: new ObjectId(id) }, { $set: updatedData });
        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: 'Project not found or no changes made' });
        }
        res.json({ message: 'Project updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error updating project', error });
    }
};


// Delete a project
const deleteProject = async (req, res) => {
    const db = getDb();
    const { id } = req.params;

    try {
        const result = await db.collection('projects').deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.json({ message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting project', error });
    }
};

// Assign a task to a project
const assignTaskToProject = async (req, res) => {
    const db = getDb();
    const { projectId, taskId } = req.body;

    try {
        const result = await db.collection('projects').updateOne(
            { _id: new ObjectId(projectId) },
            { $push: { tasks: new ObjectId(taskId) } }
        );
        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.json({ message: 'Task assigned to project successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error assigning task to project', error });
    }
};

// Filter tasks by project name
const filterTasksByProjectName = async (req, res) => {
    const db = getDb();
    const { name } = req.query;

    try {
        const project = await db.collection('projects').findOne({ name });
        if (project) {
            const tasks = await db.collection('tasks').find({ _id: { $in: project.tasks } }).toArray();
            res.json(tasks);
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error filtering tasks by project name', error });
    }
};

// Sort projects by dates
const sortProjects = async (req, res) => {
    const db = getDb();
    const { field } = req.query;  // expects "startDate" or "dueDate"

    try {
        const projects = await db.collection('projects').find({}).sort({ [field]: 1 }).toArray();
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: 'Error sorting projects by date', error });
    }
};
module.exports = { listProjects, createProject, editProject, deleteProject, assignTaskToProject, filterTasksByProjectName, sortProjects };
