"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Quest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Quest.hasMany(models.Quiz, { foreignKey: "quizId" });
    }
  }
  Quest.init(
    {
      question: DataTypes.TEXT,
      choice1: DataTypes.STRING,
      choice2: DataTypes.STRING,
      choice3: DataTypes.STRING,
      choice4: DataTypes.STRING,
      answer: DataTypes.STRING,
      imageurl: DataTypes.TEXT,
      quizId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Quest",
    }
  );
  return Quest;
};
