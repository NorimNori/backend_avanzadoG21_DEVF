const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
    text:{
        type: String,
        required: [true, 'Please type a task description']
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Tasks', taskSchema)