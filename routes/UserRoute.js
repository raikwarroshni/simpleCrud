const express = require('express')
const router = express.Router()
const userController = require('../controllers/UserController')
const {userValidarionRule, valid} = require('../middleware')
const {verifyTokenFn} = require('../middleware/jwt')


router.post('/signUp',userValidarionRule.userValidateRule(),valid.validate, userController.userSignUp)
router.post('/login',userController.userLogin)
router.get('/showUserList',verifyTokenFn,userController.showUser)
router.get('/showUserAll',verifyTokenFn,userController.showAllUser)
router.delete('/deleteUser',verifyTokenFn,userController.deleteUser)
router.put('/editUser',verifyTokenFn,userController.editUser)


module.exports = router