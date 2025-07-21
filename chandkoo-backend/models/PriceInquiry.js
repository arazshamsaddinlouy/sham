"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class PriceInquiry extends Model {
    static associate(models) {
      // define association here
      //   PriceInquiry.hasOne(models.Category, {
      //     as: "category",
      //     foreignKey: "CategoryId",
      //   });
      PriceInquiry.hasOne(models.User, { as: "user", foreignKey: "UserId" });
    }
  }

  PriceInquiry.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      categoryId: {
        type: DataTypes.UUID,
        references: "categories", // <<< Note, its table's name, not object name
        referencesKey: "id", // <<< Note, its a column name
      },
      inquiry_description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      has_message: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      inquiry_product_number: {
        type: DataTypes.INTEGER,
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
      userId: {
        type: DataTypes.UUID,
        references: {
          model: "users",
          key: "id",
        },
      },
      hasGuarantee: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      includeDelivery: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      attachedImage: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      attachedAudio: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      hasRead: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      inquiry_location: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      expiredAt: {
        type: DataTypes.DATE,
        allowNull: false,
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
      modelName: "PriceInquiry",
      tableName: "price-inquiry",
      timestamps: true,
    }
  );
  return PriceInquiry;
};
