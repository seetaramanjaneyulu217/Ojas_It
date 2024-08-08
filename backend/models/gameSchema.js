const mongoose = require('mongoose')

const gameShcema = new mongoose.Schema({
    sportName: {
        type: String,
        required: true,
        unique: true
    },

    team1: {
        type: String,
        required: true,
    },

    team2: {
        type: String,
        required: true,
    },

    betOnTeam1: {
        type: String,
        required: true,
    },

    betOnTeam2: {
        type: String,
        required: true
    }
})

const Games = mongoose.model('Games', gameShcema)
module.exports = Games
