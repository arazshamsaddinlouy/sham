"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("users", "customerType", {
      type: Sequelize.INTEGER(1),
      allowNull: false,
      collate: "utf8_general_ci",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("users", "customerType");
  },
};
