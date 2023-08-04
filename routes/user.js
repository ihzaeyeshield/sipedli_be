const express = require("express");
const UserController = require("../controllers/userController");
const router = express.Router();
// const auth = require("../middlewares/authentication");

router.post("/login", UserController.login);
router.post("/login-google", UserController.loginGoogle);
// router.use(auth);
router.post("/register", UserController.register);

module.exports = router;
