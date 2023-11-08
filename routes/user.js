const express = require('express')
const router = express.Router()

const { userValidators, userSignup, userLogin } = require('../core/validators')
const { signUp, login } = require('../controller/user')


router.post('/signUp',  userSignup, signUp)
router.post('/login',userLogin, login)

module.exports = router