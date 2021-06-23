const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { SALT, SECRET } = require('../config/config')

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        unique: true,
        required: true,
        minlength: 3,
        validate:/^[A-Za-z0-9]$/
        
    },
    password: {
        type: String,
        required: true,
        minlength: 3,
        validate:/^[A-Za-z0-9]$/
    },
    plays: [{
        type: mongoose.Types.ObjectId,
        ref: 'Plays'
    }]

})

userSchema.pre('save', function (next) {
    bcrypt.genSalt(SALT)
        .then(salt => bcrypt.hash(this.password, salt))
        .then(hash => {
            this.password = hash
            next()
        })
})

module.exports = mongoose.model('User', userSchema);