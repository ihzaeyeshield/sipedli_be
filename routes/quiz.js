const express = require("express");
const QuizController = require("../controllers/quizController");
const router = express.Router();

router.post("/postQuiz", QuizController.postQuiz);
router.post("/postScore", QuizController.postScore);
router.get("/getScore", QuizController.getScore);
router.get("/:id", QuizController.getbyid);

module.exports = router;
