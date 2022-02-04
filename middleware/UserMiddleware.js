const { promise } = require('bcrypt/promises');
const { body } = require('express-validator');
const { userModel } = require('../models');

const userValidateRule = () => {
   // console.log("middleware");
    return [
        body('firstName').not().notEmpty().withMessage("firstName is require")
        .isAlpha().withMessage('Name must be alpha').isLength({max: 20}).withMessage("max length not more than 20"),
        body('lastName').notEmpty().withMessage("lastName is require"),
        body('email').isEmail().withMessage("invalid email")
        .custom(async(value)=>{
            let user = await userModel.findOne({value}).then(user =>{
                if(user){
                    return new Error('Email already in use')
                }
            })
        }),
        body('password').isLength({min: 8}).isStrongPassword().withMessage("email must be strong")
    ]
}

module.exports = {
    userValidateRule
}