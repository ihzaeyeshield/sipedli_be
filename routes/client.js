const express = require("express");
const JobController = require("../controllers/jobController");
const PosterController = require("../controllers/posterController");
const UserController = require("../controllers/userController");
const auth = require("../middlewares/authentication");
const router = express.Router();

router.post("/register", UserController.registerClient);
router.post("/login", UserController.login);
router.post("/login-google", UserController.loginGoogleClient);
router.get("/", JobController.readJobs);
// router.get("/poster", PosterController.readPoster);
router.post("/:id", JobController.readJobId);
// router.use(auth);
// router.get("/favorite", JobController.favoriteList);
// router.post("/favorite/:MovieId", JobController.addFavorite);

module.exports = router;
