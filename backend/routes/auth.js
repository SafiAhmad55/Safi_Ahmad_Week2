const express = require("express")
const bcrypt = require("bcrypt")
const User = require("../models/User")

const router = express.Router()


router.post("/register", async (req, res) => {

  try {
  
    const { name, username, gender, email, password } = req.body


    if (!name || !username || !gender || !email || !password) {
      return res.status(400).json({
        message: "All fields are required"
      })
    }

    
    const existingUser = await User.findOne({ username })

    if (existingUser) {
      return res.status(400).json({
        message: "Username already exists"
      })
    }


    const hashedPassword = await bcrypt.hash(password, 10)

   
    const newUser = new User({
      name,
      username,
      gender,
      email,
      password: hashedPassword
    })


    await newUser.save()

    res.status(201).json({
      message: "User registered successfully"
    })

  } catch (error) {
    console.log(error)

    res.status(500).json({
      message: "Server error"
    })
  }
})

module.exports = router