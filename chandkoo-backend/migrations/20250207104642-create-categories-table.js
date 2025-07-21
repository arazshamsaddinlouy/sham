"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("categories", {
      id: {
        type: Sequelize.UUID,
        defaultType: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
        collate: "utf8_general_ci",
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        collate: "utf8_general_ci",
      },
      parentId: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: false,
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
    await queryInterface.dropTable("categories");
  },
};
