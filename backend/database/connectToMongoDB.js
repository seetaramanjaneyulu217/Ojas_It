const mongoose = require('mongoose')
require('dotenv').config

const connectToMongoDB = async () => {
    // Connecting the mongodb with my backend express app
    mongoose.connect("mongodb+srv://SeetaRam:XLYvZZrvEnwRZj0t@cluster0.psqysjz.mongodb.net/")
        .then(() => {
            console.log("MongoDB Connected SuccessFully")
        })
        .catch(() => {
            console.log("Error while connecting to MongoDB")
        })
}

module.exports = connectToMongoDB