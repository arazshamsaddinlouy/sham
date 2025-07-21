"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class InquiryResponse extends Model {
    static associate(models) {}
  }

  InquiryResponse.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      expiredAt: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      sellerId: {
        type: DataTypes.UUID,
        references: {
          model: "users",
          key: "id",
        },
      },
      requestId: {
        type: DataTypes.UUID,
        references: {
          model: "PriceInquiry",
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
      modelName: "InquiryResponse",
      tableName: "inquiry_response",
      timestamps: true,
    }
  );
  return InquiryResponse;
};
