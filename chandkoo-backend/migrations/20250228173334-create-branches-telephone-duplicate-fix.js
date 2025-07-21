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
    await queryInterface.changeColumn("branches", "phone_number", {
      type: Sequelize.STRING,
      allowNull: false,
      collate: "utf8_general_ci",
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.changeColumn("branches", "phone_number", {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      collate: "utf8_general_ci",
    });
  },
};
