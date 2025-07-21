"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("users", "provinceId", {
      type: Sequelize.INTEGER,
      allowNull: false,
      collate: "utf8_general_ci",
    });
    await queryInterface.addColumn("users", "cityId", {
      type: Sequelize.INTEGER,
      allowNull: false,
      collate: "utf8_general_ci",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("users", "provinceId");
    await queryInterface.addColumn("users", "cityId");
  },
};
