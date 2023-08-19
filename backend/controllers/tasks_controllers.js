const asyncHandler = require('express-async-handler')
const Task = require('../models/tasks_model')

const getTasks = asyncHandler(async(req, res) => {

    const tasks = await Task.find()

    res.status(200).json({tasks})
})

const createTasks = asyncHandler(async(req, res) => {
    if (!req.body.text){
        res.status(400)
        throw new Error ('Please type a task description')
    }
    const task = await Task.create({
        text: req.body.text
    })
    res.status(201).json({task})
})

const updateTasks = asyncHandler(async(req, res) => {
    const task = await Task.findById(req.params.id)
    if(!task) {
        res.status(400)
        throw new Error('task does not exist')
    }
    const taskUpdated = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json(taskUpdated)
})

const deleteTasks = asyncHandler(async(req, res) => {
    const task = await Task.findById(req.params.id)
    if(!task) {
        res.status(400)
        throw new Error('task does not exist')
    }
    task.deleteOne()
    res.status(200).json({id: req.params.id})
})

module.exports = {
    getTasks,
    createTasks,
    updateTasks,
    deleteTasks
}