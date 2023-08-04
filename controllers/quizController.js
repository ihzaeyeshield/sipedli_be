// const { comparePassword } = require("../helpers/hashPassword");
// const { createToken } = require("../helpers/jwt");
// const { User } = require("../models/index");
const { Quiz, Quest, Score } = require("../models/index");
// const {OAuth2Client} = require('google-auth-library')
// const axios = require("axios");
const { sequelize } = require("../models");

class QuizController {
  static async getbyid(req, res, next) {
    console.log("masuk sinii");

    const allQuiz = await Quiz.findAll({
      include: [{ model: Quest, order: ["id", "DESC"] }],
    });
    // console.log(allQuiz);
    res.status(200).json(allQuiz);
  }
  static async getScore(req, res, next) {
    const allScore = await Score.findAll();
    res.status(200).json(allScore);
  }
  static async postQuiz(req, res, next) {
    const t = await sequelize.transaction();
    const { title, question } = req.body;
    const create = await Quiz.create(
      {
        title,
      },
      { transaction: t }
    );
    // console.log(create.id);
    // console.log(skill);
    question.forEach((el) => {
      el.quizId = create.id;
    });
    // console.log(skill);
    // let newArr = [];
    // skill.forEach((e, index) => {
    //   let obj = {
    //     name: e,
    //     level: level[index],
    //     jobId: create.id,
    //   };
    //   newArr.push(obj);
    // });
    // console.log(newArr);

    await Quest.bulkCreate(question, { transaction: t });

    await t.commit();
    res.status(201).json({
      msg: "Succes Create Job",
      msg2: "Succes Create Skill",
      create,
    });
  }
  static async postScore(req, res, next) {
    // const t = await sequelize.transaction();
    const { name, score, quiz } = req.body;
    const create = await Score.create({
      name,
      score,
      quiz,
    });
    res.status(201).json({
      msg: "Succes Create Job",
      msg2: "Succes Create Skill",
      create,
    });
  }
}

module.exports = QuizController;
