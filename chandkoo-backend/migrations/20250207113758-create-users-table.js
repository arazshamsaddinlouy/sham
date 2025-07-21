"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
        collate: "utf8_general_ci",
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull: false,
        collate: "utf8_general_ci",
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull: false,
        collate: "utf8_general_ci",
      },
      phone_number: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        collate: "utf8_general_ci",
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false,
        collate: "utf8_general_ci",
      },
      lat: {
        type: Sequelize.FLOAT, // Store latitude
        allowNull: false,
        collate: "utf8_general_ci",
      },
      lng: {
        type: Sequelize.FLOAT, // Store longitude
        allowNull: false,
        collate: "utf8_general_ci",
      },
      category: {
        type: Sequelize.STRING,
        allowNull: false,
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

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("users");
  },
};
