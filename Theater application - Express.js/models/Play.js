const mongoose = require('mongoose')

const playSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    isPublic: {
        type: Boolean
    },
    createAt: {
        type: Date
    },
    ownerId: {
        type: String
    },
    LikedUser: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }]

})


module.exports = mongoose.model('Play', playSchema);