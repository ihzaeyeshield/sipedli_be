const express = require("express");
// const JobController = require("../controllers/jobController");
// const UserController = require("../controllers/userController");
const PosterController = require("../controllers/posterController");
// const auth = require("../middlewares/authentication");
const router = express.Router();

router.get("/all", PosterController.send);
router.post("/postPoster", PosterController.postPoster);

// router.use(auth);
// router.get("/favorite", JobController.favoriteList);
// router.post("/favorite/:MovieId", JobController.addFavorite);

module.exports = router;
