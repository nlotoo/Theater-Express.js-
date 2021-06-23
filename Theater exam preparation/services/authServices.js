const User = require('../models/User')
const bcrypt = require('bcrypt')
const { SECRET } = require('../config/config')
const jwt = require('jsonwebtoken')
const Plays = require('../models/Play')

const registeration = ({ username, password, rePassword }) => {


    if (password != rePassword) {
        throw new Error('Password must match')
    }
    let data = User.create({ username, password }).then(result => { return result })
    return data
}
const login = ({ username, password }) => {

    let user = User.findOne({ username: username }).then(user => {
        if (!user) {
            throw new Error('Invalid username and pass')
        }
        return bcrypt.compare(password, user.password).then(areEqual => {
            if (!areEqual) {
                throw new Error('wrong pass')
            }
            let token = jwt.sign({ _id: user._id, username: user.username }, SECRET)
            return token
        })


    })
    return user
}
const create = (playsObject) => {
    return Plays.create(playsObject)
}
const getAll = () => {
    return Plays.find().lean()
}
const getOne = (id) => {
    return Plays.find({ _id: id }).lean()
}
const updateOne = (id, data) => {
    return Plays.updateOne({ _id: id }, data)
}
const deleteOne = (id) => {
    return Plays.deleteOne({ _id: id })
}
const likeIt = (userId, playsId) => {

    return Plays.findOne({ _id: userId })
        .then(plays => {
            plays.LikedUser.push(playsId)
            return plays.save()
        })

}
const getAllbyDate = () => {
    return Plays.find().sort({ createAt: -1 }).lean()
}
const getAllbyLike = () => {
    return Plays.find().sort({ LikedUser: -1 }).lean()
}



module.exports = {
    registeration,
    login,
    create,
    getAll,
    getOne,
    updateOne,
    deleteOne,
    likeIt,
    getAllbyDate,
    getAllbyLike,
}