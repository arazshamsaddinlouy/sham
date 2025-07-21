"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class InquiryResponseMessage extends Model {
    static associate(models) {}
  }

  InquiryResponseMessage.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      message: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isMine: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
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
      attachedImage: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      attachedAudio: {
        type: DataTypes.STRING,
        allowNull: true,
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
      modelName: "InquiryResponseMessage",
      tableName: "inquiry_response_message",
      timestamps: true,
    }
  );
  return InquiryResponseMessage;
};
