const express = require ('express')
const router = express.Router()

const accountController = require('../app/controllers/AccountController')
router.get('/login', accountController.login)
router.get('/register', accountController.register)
router.post('/login_is_success', accountController.login_is_success)
router.get('/logout', accountController.logout)
router.get('/profile', accountController.profile)
router.get('/edit_profile', accountController.edit_profile)
router.post('/put_profile', accountController.put_profile)

module.exports = router 