const { Router } = require('express')
const router = Router()
const { COOKIE_NAME } = require('../config/config')

let authService = require('../services/authServices')

router.get('/login', (req, res) => {
    res.render('login')
})
router.post('/login', (req, res, next) => {
    const { username, password } = req.body
    authService.login({ username, password })
        .then(token => {
            res.cookie(COOKIE_NAME, token)
            res.redirect('/')
        }).catch(error => {
            res.render('login', { error })
        })
})
router.get('/register', (req, res) => {
    res.render('register')
})
router.post('/register', (req, res) => {
    let { username, password, rePassword } = req.body

    let userData = {
        username,
        password,
        rePassword,
    }
    authService.registeration(userData).then(result => {
        res.render('login')
    }).catch(error => {
        console.log(error)
    })
})
router.get('/create', (req, res) => {
    res.render('create')
})
router.post('/create', (req, res) => {
    const { title, description, imageUrl, cheked } = req.body

    let createAt = new Date()
    let isPublic = cheked == "on"
    let ownerId = req.user._id
    const playsObject = {
        title,
        description,
        imageUrl,
        isPublic,
        createAt,
        ownerId,
    }

    authService.create(playsObject)
        .then(result => {
            res.redirect('/')
        })
        .catch(error => {
            res.render('create', { error })
        })


})
router.get('/:id?/details', (req, res) => {

    authService.getOne(req.params.id).then(data => {
        itsLike = data[0].LikedUser.find((x) => x == req.user._id)
        itsOwner = data[0].ownerId == req.user._id

        res.render('details', {
            data: data[0],
            itsOwner: itsOwner,
            itsLike: itsLike,
        })
    })

})
router.get('/:id?/edit', (req, res) => {
    authService.getOne(req.params.id).then(data => {
        res.render('edit', {
            data: data[0],
        })
    })
})
router.post('/:id?/edit', (req, res, next) => {
    let id = req.params.id
    let data = req.body
    authService.updateOne(id, data).then(result => res.redirect('/')).catch(next)
})
router.get('/:id?/delete', (req, res) => {
    let id = req.params.id
    authService.deleteOne(id).then(result => res.redirect('/'))
})
router.get('/:id?/like', (req, res, next) => {



    authService.likeIt(req.params.id, req.user._id)
        .then(() => {
            res.redirect(`/auth/${req.params.id}/details`)
        })
        .catch(next)


})
router.get('/sortByDate', (req, res, next) => {
    authService.getAllbyDate().then(data => {
        res.render('home', { data })
    })
})
router.get('/sortBylike', (req, res) => {
    authService.getAllbyLike().then(data => {
        res.render('home', { data })
    })
})


module.exports = router