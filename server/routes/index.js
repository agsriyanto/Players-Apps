require('dotenv').config()
const router = require("express").Router()
const PlayerController = require('../controllers/playerController')
const StudentController = require("../controllers/student")
const UserController = require('../controllers/userController')
const { authenticate, authorize } = require('../middleware/auth')

router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.use(authenticate)

router.get("/students", StudentController.find)
router.get('/players', PlayerController.showPlayer)
router.post('/players', PlayerController.addPlayer)
router.delete('/players/:id', authorize, PlayerController.delete)

module.exports = router