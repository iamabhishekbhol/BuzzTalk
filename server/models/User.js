const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamp: true,
  }
)
// 🔐 Hash password before saving

userSchema.pre('save', async function (next) {
  // console.log(this)
  if (!this.isModified('password')) next() //skip,if unchanged
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)

  next() //move on to save
})

// 🔓 Add method to compare password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

const User = mongoose.model('User', userSchema)

module.exports = User
