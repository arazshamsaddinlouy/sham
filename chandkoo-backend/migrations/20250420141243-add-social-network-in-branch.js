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
    await queryInterface.addColumn("branches", "instagram", {
      type: Sequelize.STRING,
      allowNull: true,
      collate: "utf8_general_ci",
    });
    await queryInterface.addColumn("branches", "whatsapp", {
      type: Sequelize.STRING,
      allowNull: true,
      collate: "utf8_general_ci",
    });
    await queryInterface.addColumn("branches", "facebook", {
      type: Sequelize.STRING,
      allowNull: true,
      collate: "utf8_general_ci",
    });
    await queryInterface.addColumn("branches", "twitter", {
      type: Sequelize.STRING,
      allowNull: true,
      collate: "utf8_general_ci",
    });
    await queryInterface.addColumn("branches", "linkedin", {
      type: Sequelize.STRING,
      allowNull: true,
      collate: "utf8_general_ci",
    });
    await queryInterface.addColumn("branches", "youtube", {
      type: Sequelize.STRING,
      allowNull: true,
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
    await queryInterface.removeColumn("branches", "instagram");
    await queryInterface.removeColumn("branches", "whatsapp");
    await queryInterface.removeColumn("branches", "facebook");
    await queryInterface.removeColumn("branches", "twitter");
    await queryInterface.removeColumn("branches", "linkedin");
    await queryInterface.removeColumn("branches", "youtube");
  },
};
