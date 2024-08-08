// importing required packages
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')


// importing the necessary routes and database
const connectToMongoDB = require('./database/connectToMongoDB.js')
const userRouter = require('./routes/userRoutes.js')
const adminRouter = require('./routes/adminRoutes.js')

// initializing the express app
const app = express()


// Connecting to MongoDB
connectToMongoDB()

// initializing the dotenv configuration for using the secrets present in .env file
const dotenv = require('dotenv')
dotenv.config()


// Using necessary middlewares
app.use(cors({ origin: ['http://localhost:3000'], credentials: true }))
app.set("trust proxy", 1)
app.use(bodyParser.json())
app.use(cookieParser())
app.use('/user', userRouter)
app.use('/admin', adminRouter)


app.get('/', (req, res) => {
    res.send("Hello, I ma your server")
})

app.listen(4000, (req, res) => {
    console.log('Server is running on http://localhost:4000')
})

module.exports = app