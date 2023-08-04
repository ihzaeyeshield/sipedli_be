"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Job extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Job.belongsTo(models.Company, { foreignKey: "companyId" });
      Job.belongsTo(models.User, { foreignKey: "authorId" });
      Job.hasMany(models.Skill, { foreignKey: "jobId" });
    }
  }
  Job.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "title cannot null" },
          notEmpty: { msg: "title cannot empty" },
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: { msg: "description cannot null" },
          notEmpty: { msg: "description cannot empty" },
        },
      },
      jobType: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "jobType cannot null" },
          notEmpty: { msg: "jobType cannot empty" },
        },
      },
      companyId: DataTypes.INTEGER,
      authorId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Job",
    }
  );
  return Job;
};
