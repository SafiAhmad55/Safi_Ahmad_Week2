const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  username: {
  type: String,
  required: true,
  unique: true,
  trim: true
  },

  gender: {
    type: String,
    required: true
  },

  email: {
  type: String,
  required: true,
  unique: true,
  lowercase: true,
  trim: true
  },

  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    enum: ["Admin", "Employee"],
    default: "Employee"
  }

})

const User = mongoose.model("User", userSchema)

module.exports = User