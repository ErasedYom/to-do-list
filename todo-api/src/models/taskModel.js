const Task = {
    name: String,
    description: String,
    status: String,    // 'to-do' or 'done'
    startDate: Date,
    dueDate: Date,
    doneDate: Date     // Can be null when not completed
};

module.exports = Task;
