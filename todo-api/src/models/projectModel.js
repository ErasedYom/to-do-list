const { ObjectId } = require('mongodb');

const Project = {
    name: String,
    description: String,
    startDate: Date,
    dueDate: Date,
    tasks: [ObjectId]  // Store an array of task ObjectIds
};

module.exports = Project;
