const express = require('express')
const router = express.Router()
const { createUser, loginUser, getAllUsers } = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

router.get('/users', protect, getAllUsers)
router.post('/register', createUser)
router.post('/login', loginUser)

module.exports = router
