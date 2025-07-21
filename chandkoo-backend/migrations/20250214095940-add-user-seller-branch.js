"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("branches", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
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
        type: Sequelize.FLOAT, // No need for collation here
        allowNull: false,
      },
      lng: {
        type: Sequelize.FLOAT, // No need for collation here
        allowNull: false,
      },
      categoryId: {
        type: Sequelize.UUID,
        references: {
          model: "categories",
          key: "id",
        },
      },
      userId: {
        type: Sequelize.UUID,
        references: {
          model: "users",
          key: "id",
        },
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        ),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("branches");
  },
};
