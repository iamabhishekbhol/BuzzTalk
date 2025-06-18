const jwt = require('jsonwebtoken')
const User = require('../models/User')

const protect = async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1]

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // Attach user info to request (excluding password) - self
      req.user = await User.findById(decoded.id).select('-password')

      next()
    } catch (error) {
      console.error('Auth error:', err.message)
      return res.status(401).json({ message: 'Invalid or expired token' })
    }
  } else {
    return res.status(401).json({ message: 'No token provided' })
  }
}

module.exports = { protect }
