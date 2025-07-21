const { Op } = require("sequelize");
const { PriceInquiry, User, InquiryResponse, Category } = require("../models");
async function addPriceInquiry(req, res) {
  try {
    const {
      categoryId,
      description,
      title,
      productCount,
      lat,
      lng,
      hasGuarantee,
      includeDelivery,
      expiredAt,
      inquiryLocation,
      hasMessage,
    } = req.body;
    const userId = req.user.id;
    console.log('files are', req.files);
const imageUrl = req.files["image"] ? req.files["image"][0].path : null;
    const audioUrl = req.files["audio"] ? req.files["audio"][0].path : null;
    
    try {
      const newInquiry = await PriceInquiry.create({
        categoryId,
        has_message: hasMessage,
        inquiry_description: description,
        title,
        inquiry_product_number: productCount,
        lat,
        lng,
        userId,
        hasGuarantee,
        includeDelivery,
        expiredAt,
        inquiry_location: inquiryLocation,
        attachedImage: imageUrl,
        attachedAudio: audioUrl,
      });

      return res
        .status(200)
        .json({ message: "Inquiry added successfully", inquiry: newInquiry });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Internal server error", details: error.message });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
}
const markInquiryAsRead = async (req, res) => {
  const { id } = req.body;
  try {
    const [updatedCount] = await PriceInquiry.update(
      { hasRead: true },
      {
        where: { id },
      }
    );

    if (updatedCount === 0) {
      return res.status(404).json({ message: "PriceInquiry not found." });
    }

    return res.json({ message: "Marked as read successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error." });
  }
};

async function getUserActiveRequests(req, res) {
  const userId = req.user.id;
  const user = await User.findOne({
    attributes: ["cityId", "provinceId", "createdAt"],
    where: { id: userId },
  });
  try {
    const activeRequests = await PriceInquiry.findAll({
      attributes: [
        "id",
        "categoryId",
        "inquiry_description",
        "title",
        "inquiry_product_number",
        "lat",
        "lng",
        "inquiry_location",
        "hasGuarantee",
        "includeDelivery",
        "expiredAt",
        "attachedImage",
        "attachedAudio",
        "hasRead",
        "has_message",
      ],
      where: {
        userId,
        expiredAt: {
          [Op.gt]: new Date().toISOString(),
        },
        createdAt: {
          [Op.gt]: new Date(user.createdAt).toISOString(),
        },
      },
      order: [["createdAt", "DESC"]], // Oldest to newest
    });
    const finalInquiry = await Promise.all(
      activeRequests.map(async (request) => {
        const requestObj = request.toJSON(); // Convert Sequelize instance to plain object

        const response = await InquiryResponse.findAll({
          attributes: ["id"],
          where: {
            requestId: request.id,
          },
        });
        requestObj.responseCount = response.length;
        const lowestPrice = await InquiryResponse.findAll({
          attributes: ["price"],
          where: {
            requestId: request.id,
          },
          order: [["price", "ASC"]],
        });

        if (Array.isArray(lowestPrice) && lowestPrice.length > 0) {
          requestObj.lowestPrice = lowestPrice[0].price;
        } else {
          requestObj.lowestPrice = 0;
        }
        return requestObj;
      })
    );
    if (Array.isArray(finalInquiry) && finalInquiry.length > 0) {
      return res.status(200).json(finalInquiry);
    } else {
      return res.status(200).json([]);
    }
  } catch (e) {
    return res.status(500).json({ message: "خطا در دریافت درخواست های کاربر" });
  }
}
async function getUserExpiredRequests(req, res) {
  const userId = req.user.id;
  const user = await User.findOne({
    attributes: ["cityId", "provinceId", "createdAt"],
    where: { id: userId },
  });
  try {
    const activeRequests = await PriceInquiry.findAll({
      attributes: [
        "id",
        "categoryId",
        "inquiry_description",
        "title",
        "inquiry_product_number",
        "lat",
        "lng",
        "inquiry_location",
        "hasGuarantee",
        "includeDelivery",
        "expiredAt",
        "attachedImage",
        "attachedAudio",
        "hasRead",
        "has_message",
      ],
      where: {
        userId,
        expiredAt: {
          [Op.lt]: new Date().toISOString(),
        },
        createdAt: {
          [Op.gt]: user.createdAt,
        },
      },
      order: [["createdAt", "DESC"]], // Oldest to newest
    });
    const finalInquiry = await Promise.all(
      activeRequests.map(async (request) => {
        const requestObj = request.toJSON(); // Convert Sequelize instance to plain object

        const response = await InquiryResponse.findAll({
          attributes: ["id"],
          where: {
            requestId: request.id,
          },
        });
        requestObj.responseCount = response.length;
        const lowestPrice = await InquiryResponse.findAll({
          attributes: ["price"],
          where: {
            requestId: request.id,
          },
          order: [["price", "ASC"]],
        });

        if (Array.isArray(lowestPrice) && lowestPrice.length > 0) {
          requestObj.lowestPrice = lowestPrice[0].price;
        } else {
          requestObj.lowestPrice = 0;
        }
        return requestObj;
      })
    );
    if (Array.isArray(finalInquiry) && finalInquiry.length > 0) {
      return res.status(200).json(finalInquiry);
    } else {
      return res.status(200).json([]);
    }
  } catch (e) {
    return res.status(500).json({ message: "خطا در دریافت درخواست های کاربر" });
  }
}
async function getPriceInquiryByKey(req, res) {
  try {
    const id = req.body.id;
    const responses = await PriceInquiry.findAll({
      attributes: ["id", "title", "categoryId"],
      where: { id: id },
    });
    const finalInquiry = await Promise.all(
      responses.map(async (request) => {
        const requestObj = request.toJSON();
        const category = await Category.findOne({
          attributes: ["id", "title"],
          where: {
            id: requestObj.categoryId,
          },
        });
        if (category) {
          requestObj.category = category.toJSON();
        }
        return requestObj;
      })
    );
    return res.status(200).json(finalInquiry);
  } catch (e) {
    return res.status(500).json({ message: "خطا در دریافت درخواست های کاربر" });
  }
}
async function getAllActiveRequests(req, res) {
  try {
    const userId = req.user.id;

    const user = await User.findOne({
      attributes: ["cityId", "provinceId", "createdAt"],
      where: { id: userId },
    });

    const activeRequests = await PriceInquiry.findAll({
      attributes: [
        "id",
        "categoryId",
        "inquiry_location",
        "inquiry_description",
        "title",
        "inquiry_product_number",
        "lat",
        "lng",
        "hasGuarantee",
        "includeDelivery",
        "expiredAt",
        "attachedImage",
        "attachedAudio",
        "hasRead",
        "has_message",
      ],
      where: {
        inquiry_location: {
          [Op.like]: `%city-${user.cityId}%`,
        },
        expiredAt: {
          [Op.gt]: new Date().toISOString(),
        },
        createdAt: {
          [Op.gt]: new Date(user.createdAt).toISOString(),
        },
      },
      order: [["createdAt", "DESC"]],
    });

    // Convert Sequelize instances to plain objects and add hasResponse
    const finalInquiry = await Promise.all(
      activeRequests.map(async (request) => {
        const requestObj = request.toJSON(); // Convert Sequelize instance to plain object

        const response = await InquiryResponse.findOne({
          attributes: ["id"],
          where: {
            sellerId: userId,
            requestId: request.id,
          },
        });
        const lowestPrice = await InquiryResponse.findAll({
          attributes: ["price"],
          where: {
            requestId: request.id,
          },
          order: [["price", "ASC"]],
        });

        if (Array.isArray(lowestPrice) && lowestPrice.length > 0) {
          requestObj.lowestPrice = lowestPrice[0].price;
        } else {
          requestObj.lowestPrice = 0;
        }
        requestObj.hasResponse = !!response; // Set hasResponse to true if response exists, otherwise false
        return requestObj;
      })
    );

    return res.status(200).json(finalInquiry);
  } catch (e) {
    return res.status(500).json({ message: "خطا در دریافت درخواست های کاربر" });
  }
}

async function getAllExpiredRequests(req, res) {
  try {
    const userId = req.user.id;
    const user = await User.findOne({
      attributes: ["cityId", "provinceId", "createdAt"],
      where: { id: userId },
    });
    const deactiveRequests = await PriceInquiry.findAll({
      attributes: [
        "id",
        "categoryId",
        "inquiry_description",
        "title",
        "inquiry_location",
        "inquiry_product_number",
        "lat",
        "lng",
        "hasGuarantee",
        "includeDelivery",
        "expiredAt",
        "attachedImage",
        "attachedAudio",
        "hasRead",
        "has_message",
      ],
      where: {
        inquiry_location: {
          [Op.like]: `%city-${user.cityId}%`,
        },
        expiredAt: {
          [Op.lt]: new Date().toISOString(),
        },
        createdAt: {
          [Op.gt]: new Date(user.createdAt).toISOString(),
        },
      },

      order: [["createdAt", "DESC"]], // Oldest to newest
    });
    const finalInquiry = await Promise.all(
      deactiveRequests.map(async (request) => {
        const requestObj = request.toJSON(); // Convert Sequelize instance to plain object

        const response = await InquiryResponse.findOne({
          attributes: ["id"],
          where: {
            sellerId: userId,
            requestId: request.id,
          },
        });
        const lowestPrice = await InquiryResponse.findAll({
          attributes: ["price"],
          where: {
            requestId: request.id,
          },
          order: [["price", "ASC"]],
        });

        if (Array.isArray(lowestPrice) && lowestPrice.length > 0) {
          requestObj.lowestPrice = lowestPrice[0].price;
        } else {
          requestObj.lowestPrice = 0;
        }
        requestObj.hasResponse = !!response; // Set hasResponse to true if response exists, otherwise false
        return requestObj;
      })
    );
    if (Array.isArray(finalInquiry) && finalInquiry.length > 0) {
      return res.status(200).json(finalInquiry);
    } else {
      return res.status(200).json([]);
    }
  } catch (e) {
    return res.status(500).json({ message: "خطا در دریافت درخواست های کاربر" });
  }
}

module.exports = {
  addPriceInquiry,
  getUserActiveRequests,
  getUserExpiredRequests,
  getAllActiveRequests,
  getAllExpiredRequests,
  markInquiryAsRead,
  getPriceInquiryByKey,
};
