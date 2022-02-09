const { promise } = require("bcrypt/promises");
const { body } = require("express-validator");
const { userModel } = require("../models");

const userValidateRule = () => {
  // console.log("middleware");
  return [
    body("firstName")
      .not()
      .notEmpty()
      .withMessage("firstName is require")
      .isAlpha()
      .withMessage("Name must be alpha")
      .isLength({ max: 20 })
      .withMessage("max length not more than 20"),
    body("lastName").notEmpty().withMessage("lastName is require"),
    body("email")
      .isEmail()
      .withMessage("invalid email")
      .custom((value) => {
        return userModel.findOne({ email: value }).then((user) => {
          if (user) {
            return Promise.reject("E-mail already in use");
          }
        });
      }),
    body("password")
      .isLength({ min: 8 })
      .withMessage("password atlest 8 charater")
      .isStrongPassword()
      .withMessage("password must be strong"),
  ];
};

module.exports = {
  userValidateRule,
};
