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
    // Alter the column to make it non-unique
    await queryInterface.changeColumn("users", "phone_number", {
      type: Sequelize.STRING, // Use the correct data type
      allowNull: true, // Set nullability as needed
      unique: false,
      collate: "utf8_general_ci",
    });
  },

  async down(queryInterface, Sequelize) {
    // Revert the column back to unique if needed
    await queryInterface.changeColumn("users", "phone_number", {
      type: Sequelize.STRING,
      unique: true,
      allowNull: true,
      collate: "utf8_general_ci",
    });
  },
};
