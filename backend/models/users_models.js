const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please type your name']
    },
    email: {
        type: String,
        required: [true, 'Please type an email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please type a password']
    }
},{
    timesstamps: true
})

module.exports = mongoose.model('User', userSchema)