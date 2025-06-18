const mongoose = require('mongoose')
const messageSchema = mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // 👈 THIS is the key
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // 👈 THIS is the key
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    seen: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

const Message = mongoose.model('Message', messageSchema)

module.exports = Message
