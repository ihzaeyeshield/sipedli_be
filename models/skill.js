"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Skill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Skill.belongsTo(models.Job, { foreignKey: "jobId" });
    }
  }
  Skill.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "skill name cannot null" },
          notEmpty: { msg: "skill name cannot empty" },
        },
      },
      level: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "level cannot null" },
          notEmpty: { msg: "level cannot empty" },
        },
      },
      jobId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Skill",
    }
  );
  return Skill;
};
