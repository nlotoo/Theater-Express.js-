const { Router } = require('express')
const router = Router()
const { COOKIE_NAME } = require('../config/config')

const authService = require('../services/authServices')

router.get('/', (req, res) => {
    if (req.user) {
        authService.getAll().then(data => {
            res.render('home', { data })
        })
    }else{
        authService.getAllbyLike().then(data => {
            data = data.slice(0,3)
            res.render('home', { data })
        })
    }
})

router.get('/logout', (req, res) => {
    res.clearCookie(COOKIE_NAME)
    res.redirect('/')
})







module.exports = router