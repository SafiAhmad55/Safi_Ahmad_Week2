const express = require("express")
const bcrypt = require("bcrypt")
const User = require("../models/User")
const router = express.Router()
const jwt = require("jsonwebtoken")
const authMiddleware = require("../middleware/authMiddleware")
const adminMiddleware = require("../middleware/adminMiddleware")

router.post("/register", async (req, res) => {

  try {
  
    const { name, username, gender, email, password } = req.body

    if (!name || !username || !gender || !email || !password) {
      return res.status(400).json({
        message: "All fields are required"
      })
    }
    
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

      if (!emailPattern.test(email)) {
        return res.status(400).json({
          message: "Invalid email format"
      })
    }


    const existingUser = await User.findOne({ username })

    if (existingUser) {
      return res.status(400).json({
        message: "Username already exists"
      })
    }

    const existingEmail = await User.findOne({ email })

    if (existingEmail) {
       return res.status(400).json({
         message: "Email already exists"
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

router.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      })
    }

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password"
      })
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid email or password"
      })
    }

    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h"
      }
    )

    res.status(200).json({
      message: "Login successful",
      token
    })

  } catch (error) {

    console.log(error)

    res.status(500).json({
      message: "Server error"
    })
  }
})

router.get("/profile", authMiddleware, async (req, res) => {

  try {

    const user = await User.findById(req.user.userId).select("-password")

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      })
    }

    res.status(200).json({
      message: "Protected route accessed successfully",
      user
    })

  } catch (error) {

    console.log(error)

    res.status(500).json({
      message: "Server error"
    })

  }
})

router.get("/admin", authMiddleware, adminMiddleware, async (req, res) => {

  try {
    res.status(200).json({
      message: "Welcome Admin. You have access to this route."
    })

  } catch (error) {

    console.log(error)

    res.status(500).json({
      message: "Server error"
    })

  }
})

module.exports = router