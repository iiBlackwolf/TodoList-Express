const express = require("express");
// * Importing task Model to be able to create, delete, update it's data.
const taskData = require("../Models/Task-schema");
const TaskSchema = require("../Models/Task-schema");

// Creating express router that is going to be connected with app
const router = express.Router();

// Creating Endpoint for app with request "GET"
router.get("/tasks", async (req, res) => {
    try {
        //* Gettings all data with .find() and storing it to Tasks and using await since it's a promise and may take some time.
        const Tasks = await taskData.find();
        // Sends a response with status code 200 with Tasks in format json
        res.status(200).json(Tasks)
    } catch(err) {
        res.status(500).json({ error: err.message})
    }
});

// Creating Endpoint for app with request "POST"
router.post("/tasks", async (req, res) => {
    try {
        // * Making a new task from taskData model with request's body then saving it to database
        const task = new taskData(req.body);
        await task.save();

        res.status(200).json({ message: "😃 Added the task successfully!", task})
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
})

// Creating Endpoint for app with request "PUT"
router.put('/tasks/:id', async (req, res) => {
    // * Getting the ID from the requests parameters and the Body of task from request's body
    const { id } = req.params;
    const Body = req.body;

    try {
        // * Find the task with it's id and updating it in same time, used { new: true } so it saves new data to the variable "Task".
        const Task = await TaskSchema.findByIdAndUpdate(id, Body, { new: true })

        res.status(200).json({ message: "😺 Updated the task successfully!", Task });
    } catch(err) {
        res.status(400).json({ error: err.message });
    }
})

// Creating Endpoint for app with request "DELETE"
router.delete('/tasks/:id', async (req, res) => {
    const { id } = req.params;

     try {
        // * Deletes the task by id from the database
        await taskData.findByIdAndDelete(id);
        
        res.status(200).json({ message: "🗑️ Task deleted succesffully!"})
     } catch (err) {
        res.status(400).json({ error: err.message });
     }
})

module.exports = router;