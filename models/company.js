"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Company.hasMany(models.Job, { foreignKey: "companyId" });
    }
  }
  Company.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "name cannot empty" },
          notNull: { msg: "name cannot null" },
        },
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "location cannot null" },
          notEmpty: { msg: "location cannot empty" },
        },
      },
      email: DataTypes.STRING,
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: { msg: "description cannot null" },
          notEmpty: { msg: "description cannot empty" },
        },
      },
      companyLogo: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: { msg: "companyLogo cannot null" },
          notEmpty: { msg: "companyLogo cannot Empty" },
        },
      },
    },
    {
      sequelize,
      modelName: "Company",
    }
  );
  return Company;
};
