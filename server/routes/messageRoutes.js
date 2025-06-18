const router = require('express').Router()
const { sendMessage, getMessages } = require('../controllers/messageController')
const { protect } = require('../middleware/authMiddleware')

// @route   POST /api/messages
// @access  Private
router.post('/', protect, sendMessage)

// @route   GET /api/messages/:userId
// @access  Private

router.get('/:userId', protect, getMessages)

module.exports = router
