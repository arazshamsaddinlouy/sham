"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("users", "categoryId", {
      type: Sequelize.UUID,
      allowNull: true,
      references: {
        model: "categories", // <<< Note, its table's name, not object name
        key: "id", // <<< Note, its a column name\
      },
      collate: "utf8_general_ci",
    });
    await queryInterface.removeColumn("users", "category");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("users", "categoryId");
    await queryInterface.addColumn("users", "category", {
      type: Sequelize.STRING, // Change type as per the original column
      allowNull: true, // Adjust based on the original column properties
    });
  },
};
