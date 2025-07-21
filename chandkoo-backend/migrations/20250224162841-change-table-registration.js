"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("users", "postalCode", {
      type: Sequelize.INTEGER(12),
      allowNull: false,
      collate: "utf8_general_ci",
    });
    await queryInterface.removeColumn("users", "categoryId");
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn("users", "postalCode");
    await queryInterface.addColumn("users", "categoryId", {
      type: Sequelize.UUID,
      allowNull: true,
      references: {
        model: "categories", // <<< Note, its table's name, not object name
        key: "id", // <<< Note, its a column name\
      },
      collate: "utf8_general_ci",
    });
  },
};
