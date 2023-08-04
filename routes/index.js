const express = require("express");
const router = express.Router();
const routerJobs = require("./jobs");
const routerUser = require("./user");
const routerPoster = require("./poster");
const routerQuiz = require("./quiz");
const routerCompany = require("./company");
// const routerHistory = require("./history");
const routerClient = require("./client");

router.use("/quiz", routerQuiz);
router.use("/poster", routerPoster);
router.use("/users", routerUser);
router.use("/pub", routerClient);

router.use("/jobs", routerJobs);
router.use("/company", routerCompany);
// router.use("/histories", routerHistory);

module.exports = router;
