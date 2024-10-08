const express = require('express')
const colors = require('@colors/colors')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/error_middleware')
const cors = require('cors')
const connectDB = require('./config/db')

connectDB().then(() => {
    app.listen(port, () => {
        console.log("listening for requests");
    })
})

const port = process.env.PORT || 5000

const app = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/tasks', require('./routes/tasks_routes'))
app.use('/api/users', require('./routes/users_routes'))

app.use(errorHandler)
