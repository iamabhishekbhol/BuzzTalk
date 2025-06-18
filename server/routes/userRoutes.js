const express = require('express')
const { getUsers } = require('../controllers/userController.js')
const { protect } = require('../middleware/authMiddleware')

const router = express.Router()

// @route   GET /api/users
// @access  Private (requires token)
router.get('/', protect, getUsers)

module.exports = router
