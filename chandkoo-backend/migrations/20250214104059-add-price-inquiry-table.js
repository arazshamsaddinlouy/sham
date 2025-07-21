"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("price-inquiry", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
        collate: "utf8_general_ci",
      },
      categoryId: {
        type: Sequelize.UUID,
        references: {
          model: "categories", // <<< Note, its table's name, not object name
          key: "id", // <<< Note, its a column name\
        },
        collate: "utf8_general_ci",
      },
      inquiry_description: {
        type: Sequelize.STRING,
        allowNull: false,
        collate: "utf8_general_ci",
      },
      inquiry_product_number: {
        type: Sequelize.INTEGER,
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
      userId: {
        type: Sequelize.UUID,
        references: {
          model: "users",
          key: "id",
        },
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
      expiredAt: {
        type: Sequelize.DATE,
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
    await queryInterface.dropTable("price-inquiry");
  },
};
