const { Router } = require('express');
const router = Router()

const homeController = require('./controllers/homeController')
const authController = require('./controllers/authController');

const auth = require('./middleware/auth')



router.use('/', auth, homeController)
router.use('/auth', auth, authController)
router.use('auth/:id?/details', auth, authController)





module.exports = router