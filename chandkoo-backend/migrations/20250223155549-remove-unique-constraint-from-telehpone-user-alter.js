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
    // Remove the unique constraint
    await queryInterface.removeConstraint("users", "phone_number");

    // Alter the column to make it non-unique
    await queryInterface.changeColumn("users", "phone_number", {
      type: Sequelize.STRING, // Use the correct data type
      allowNull: true, // Set nullability as needed
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.changeColumn("users", "phone_number", {
      type: Sequelize.STRING,
      unique: true,
      allowNull: true,
      collate: "utf8_general_ci",
    });

    // Optionally, re-add the unique constraint
    await queryInterface.addConstraint("users", {
      fields: ["phone_number"],
      type: "unique",
      name: "phone_number",
      collate: "utf8_general_ci",
    });
  },
};
