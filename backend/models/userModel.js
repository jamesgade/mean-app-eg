const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Please provide a firstName']
    },
    lastName: {
        type: String,
        required: [true, 'Please provide a lastName']
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
    },
    phone: {
        type: Number,
        required: [true, 'Please provide a phone number']
    },
    isOver18: {
        type: Boolean,
        default: false
    },
    gender: {
        type: String,
        required: [true, 'Please select gender']
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model('User', userSchema)
