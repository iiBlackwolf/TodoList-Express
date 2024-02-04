const mongoose = require('mongoose');

// * Creating our taskSchema
const TaskSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: false
    },

    completed: {
        type: Boolean,
        default: false
    }
})

// * Exports mongoose.model with the name "Task" and schema we created(TaskSchema)
module.exports = mongoose.model("Task", TaskSchema);