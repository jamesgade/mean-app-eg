const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const generateToken = (id) => {
    return jwt.sign({ id }, 'abc123', {
        expiresIn: '30d'
    })
}

const createUser = asyncHandler(async (req, res) => {

    const { firstName, lastName, email, password, phone, isOver18, gender } = req.body

    if (!firstName || !email || !password || !lastName || !phone || !gender) {
        res.status(400)
        throw new Error('Please include all fields')
    }

    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400)
        throw new Error('User with this email already exists')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        phone,
        gender,
        isOver18
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            firstName: user.firstName,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('Invalid credentials')
    }
})

const getAllUsers = asyncHandler(async (req, res) => {
    User.find({}, (error, users) => {
        let allUsers = {};

        users.forEach(user => {
            allUsers[user.id] = user;
        })

        res.send(users);
    })
})

module.exports = { createUser, loginUser, getAllUsers }
