"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Branch extends Model {
    static associate(models) {
      // define association here
      // Branch.hasOne(models.Category, {
      //   as: "category",
      //   foreignKey: "CategoryId",
      // });
      Branch.hasOne(models.User, { as: "user", foreignKey: "UserId" });
    }
  }

  Branch.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      linkedin: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      twitter: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      instagram: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      whatsapp: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      youtube: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      facebook: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lat: {
        type: DataTypes.FLOAT, // Store latitude
        allowNull: false,
      },
      lng: {
        type: DataTypes.FLOAT, // Store longitude
        allowNull: false,
      },
      categoryId: {
        type: DataTypes.UUID,
        references: {
          model: "categories",
          key: "id",
        },
      },
      userId: {
        type: DataTypes.UUID,
        references: {
          model: "users",
          key: "id",
        },
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Branch",
      tableName: "branches",
      timestamps: true,
    }
  );
  return Branch;
};
