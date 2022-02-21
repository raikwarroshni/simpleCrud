const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const valid = require("../middleware/valid");
const userValidarionRule = require("../validation/validation");
const { verifyTokenFn } = require("../middleware/authentication");

router.get("/", verifyTokenFn, userController.userDetail);
router.get("/user-list", verifyTokenFn, userController.userList);
router.delete("/deleteUser", verifyTokenFn, userController.deleteUser);
router.put("/update-User", verifyTokenFn, userController.updateUser);
router.get("/truncate-database", userController.truncateDatabase);
router.get("/showUser/:id", userController.userDetails);

module.exports = router;
