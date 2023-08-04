"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn("Jobs", "companyId", {
      type: Sequelize.INTEGER,
      references: {
        model: "Companies",
        key: "id",
      },
    });
    await queryInterface.addColumn("Jobs", "authorId", {
      type: Sequelize.INTEGER,
      references: {
        model: "Users",
        key: "id",
      },
    });
    await queryInterface.addColumn("Skills", "jobId", {
      type: Sequelize.INTEGER,
      references: {
        model: "Jobs",
        key: "id",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn("Skills", "jobId");
    await queryInterface.removeColumn("Jobs", "userId");
    await queryInterface.removeColumn("Jobs", "companyId");
  },
};
