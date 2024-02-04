const express = require('express');
const mongoose = require('mongoose');
// * Importing the router we created for app, so it handle requests and responses
const taskRouter = require('./routes/taskRouters')

const config = require('./config.json')

const app = express()
// * The port express app is going to listen on.
const port = config.port || 3000;

// Middleware
app.use(express.json())

// * MongoDB connection
mongoose.connect(config.MONGO_URI);

const db = mongoose.connection;

// ? On Mongodb connection error
db.on('error', (error) => {
    console.log('DB failed to connect!', error)
});

// ? On Mongodb connection done for first time
db.once('open', () => {
    console.log("Connected to DB.")
})

// * Using the tasks router created in routes folder for app
app.use(taskRouter);

app.listen(port, () => {
    console.log("App listening at port: " + port)
});
