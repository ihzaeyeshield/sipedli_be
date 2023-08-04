"use strict";
const fs = require("fs");
const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const dataUsers = JSON.parse(fs.readFileSync("./data/users.json", "utf-8"));
    const dataCompanies = JSON.parse(
      fs.readFileSync("./data/companies.json", "utf-8")
    );
    const dataJobs = JSON.parse(fs.readFileSync("./data/jobs.json", "utf-8"));
    const dataSkill = JSON.parse(
      fs.readFileSync("./data/skills.json", "utf-8")
    );

    dataUsers.forEach((e) => {
      delete e.id;
      e.createdAt = e.updatedAt = new Date();
      e.password = bcrypt.hashSync(e.password, 6);
    });
    dataCompanies.forEach((e) => {
      delete e.id;
      e.createdAt = e.updatedAt = new Date();
    });
    dataJobs.forEach((e) => {
      delete e.id;
      e.createdAt = e.updatedAt = new Date();
    });
    dataSkill.forEach((e) => {
      delete e.id;
      e.createdAt = e.updatedAt = new Date();
    });

    await queryInterface.bulkInsert("Users", dataUsers);
    await queryInterface.bulkInsert("Companies", dataCompanies);
    await queryInterface.bulkInsert("Jobs", dataJobs);
    await queryInterface.bulkInsert("Skills", dataSkill);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null, {});
    await queryInterface.bulkDelete("Companies", null, {});
    await queryInterface.bulkDelete("Jobs", null, {});
    await queryInterface.bulkDelete("Skills", null, {});
  },
};
