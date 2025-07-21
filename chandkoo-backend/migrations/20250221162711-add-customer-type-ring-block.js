"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("users", "ring", {
      type: Sequelize.STRING(8),
      allowNull: false,
      collate: "utf8_general_ci",
    });
    await queryInterface.addColumn("users", "block", {
      type: Sequelize.STRING(8),
      allowNull: false,
      collate: "utf8_general_ci",
    });
    await queryInterface.addColumn("users", "mobile", {
      type: Sequelize.STRING(11),
      allowNull: false,
      collate: "utf8_general_ci",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("users", "ring");
    await queryInterface.addColumn("users", "block");
    await queryInterface.addColumn("users", "mobile");
  },
};
