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
    await queryInterface.createTable("inquiry_response_message", {
      id: {
        type: Sequelize.UUID,
        defaultType: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
        collate: "utf8_general_ci",
      },
      message: {
        type: Sequelize.STRING,
        defaultValue: 0,
        collate: "utf8_general_ci",
      },
      requestId: {
        type: Sequelize.STRING,
        allowNull: false,
        collate: "utf8_general_ci",
      },
      sellerId: {
        type: Sequelize.STRING,
        allowNull: false,
        collate: "utf8_general_ci",
      },
      attachedImage: {
        type: Sequelize.STRING,
        allowNull: true,
        collate: "utf8_general_ci",
      },
      attachedAudio: {
        type: Sequelize.STRING,
        allowNull: true,
        collate: "utf8_general_ci",
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        collate: "utf8_general_ci",
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        ),
        collate: "utf8_general_ci",
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
    await queryInterface.dropTable("inquiry_response_message");
  },
};
