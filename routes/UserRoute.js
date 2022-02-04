const express = require('express')
const router = express.Router()
const userController = require('../controllers/UserController')
const {userValidarionRule, valid} = require('../middleware')
const {verifyTokenFn} = require('../middleware/jwt')

// router.get('/' , userController.index)
router.post('/signUp',userValidarionRule.userValidateRule(),valid.validate, userController.userSignUp)
router.post('/login',userController.userLogin)
router.get('/showUserList',verifyTokenFn,userController.showUser)

module.exports = router