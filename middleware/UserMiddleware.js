const { body } = require('express-validator');

const userValidateRule = () => {
   // console.log("middleware");
    return [
        body('firstName').notEmpty().isAlpha().isLength({max: 20}),
        body('lastName').notEmpty(),
        body('email').isEmail(),
        body('password').isLength({min: 8})
    ]
}

module.exports = {
    userValidateRule
}