const router = require('express').Router()

// imported User signup controllers
const { createGame, getAllGames } = require('../controllers/gameController.js')
// const loginDataValidation = require('../middlewares/loginDataValidation.js')

router.route('/creategame').post(createGame)
router.route('/getallgames').get(getAllGames)



module.exports = router