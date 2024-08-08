const router = require('express').Router()

// imported User signup controllers
const { registerUser, loginUser, logoutUser } = require('../controllers/userController.js')
// const loginDataValidation = require('../middlewares/loginDataValidation.js')

router.route('/signup').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').post(logoutUser)

module.exports = router