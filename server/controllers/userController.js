const User = require('../models/User')

// GET /api/users
const getUsers = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.user._id } }).select(
      '-password'
    )
    res.json({
      users,
    })
  } catch (error) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

module.exports = { getUsers }
