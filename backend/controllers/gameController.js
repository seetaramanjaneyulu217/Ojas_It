const Games = require('../models/gameSchema.js')


const createGame = async (req, res) => {
    try {
        const { sportName, team1, team2, betOnTeam1, betOnTeam2 } = req.body
        await new Games({ sportName, team1, team2, betOnTeam1, betOnTeam2 }).save()

        res.status(201).json({ msg: 'Game created successfully' })
    } catch (error) {
        res.status(500).json({ msg: 'Error in creating the game' })
    }
}


const getAllGames = async (req, res) => {
    try {
        const games = await Games.find({})
        res.status(200).json({ msg: games })
    } catch (error) {
        res.status(500).json({ msg: 'Error in getting the games'})
    }
}


module.exports = { createGame, getAllGames }