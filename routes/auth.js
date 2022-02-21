const express = require("express");
const router = express.Router();
const userController = require("../controllers/auth");
const valid = require("../middleware/valid");
const userValidarionRule = require("../validation/validation");
const validationPassword = require("../validation/validation");

router.post(
  "/sign-up",
  userValidarionRule.userValidateRule(),
  valid.validate,
  userController.SignUp
);
router.post("/login", userController.login);
router.post("/forgetPassword", userController.forgetPassword);
router.get("/verifyToken/:token", userController.verifyToken);
router.post(
  "/resetPassword/:token",
  validationPassword.validatePassword(),
  valid.validate,
  userController.resetPassword
);

module.exports = router;
