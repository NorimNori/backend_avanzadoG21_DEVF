const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        red: 'User'
    },
    text:{
        type: String,
        required: [true, 'Please type a task description']
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Tasks', taskSchema)