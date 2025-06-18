const Message = require('../models/Message')

// @desc    Send a new message
// @route   POST /api/messages
// @access  Private
const sendMessage = async (req, res) => {
  try {
    const { receiverId, content } = req.body

    if (!receiverId || !content) {
      return res.status(400).json({ message: 'Receiver and content required' })
    }

    const message = await Message.create({
      sender: req.user._id,
      receiver: receiverId,
      content,
    })

    res.status(201).json(message)
  } catch (error) {
    console.error(err)
    res.status(500).json({ message: 'Failed to send message' })
  }
}

// @desc Get all messages between current user and another user
// @route GET /api/messages/:userId
// @access Private
const getMessages = async (req, res) => {
  try {
    const currentUserId = req.user._id
    const otherUserId = req.params.userId

    const messages = await Message.find({
      $or: [
        { sender: currentUserId, receiver: otherUserId }, // sent by you to them or
        { sender: otherUserId, receiver: currentUserId }, // sent by them to you
      ],
    })
      .sort({ createdAt: 1 }) //ascending order - messages -> old to new (this gives chronological chat history).
      .populate('sender', 'name email') //populate sender info
      .populate('receiver', 'name email') //populate reciever info

    res.json(messages)
  } catch (error) {
    console.error(err)
    res.status(500).json({ message: 'Failed to fetch messages' })
  }
}

module.exports = { sendMessage, getMessages }
