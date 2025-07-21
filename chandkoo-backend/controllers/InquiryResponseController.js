const { Op } = require("sequelize");
const {
  InquiryResponse,
  InquiryResponseMessage,
  PriceInquiry,
  User,
  Category,
  Branch,
} = require("../models");

async function AddInquiryResponse(req, res) {
  const userId = req.user.id;
  const { requestId, price, expiredAt } = req.body;
  try {
    const inquiryResponse = await InquiryResponse.create({
      requestId: requestId,
      price: price,
      sellerId: userId,
      expiredAt: expiredAt,
    });
    return res.status(200).json(inquiryResponse);
  } catch (e) {}
  return res.status(500).json({ message: "خطا در ثبت جواب استعلام" });
}
async function AddPriceInquiryResponseMessage(req, res) {
  try {
    const { message, requestId, sellerId, isMine } = req.body;
    const userId = sellerId || req.user.id;
    const imageUrl = req.files["image"] ? req.files["image"][0].path : null;
    const audioUrl = req.files["audio"] ? req.files["audio"][0].path : null;
    try {
      const newInquiryMessage = await InquiryResponseMessage.create({
        message,
        requestId,
        isMine: isMine ? true : false,
        sellerId: userId,
        attachedImage: imageUrl,
        attachedAudio: audioUrl,
      });

      return res.status(200).json({
        message: "پیام افزوده شد",
        inquiryMessage: newInquiryMessage,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "خطا در ثبت پیام", details: error.message });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: "خطا در ثبت پیام", details: error.message });
  }
}
async function getAllActivePriceInquiryResponses(req, res) {
  const { requestId } = req.body;
  const responses = await InquiryResponse.findAll({
    attributes: ["id", "sellerId", "price", "requestId", "expiredAt"],
    where: {
      requestId: requestId,
      expiredAt: {
        [Op.or]: [
          { [Op.is]: null },
          { [Op.eq]: "" },
          { [Op.gt]: new Date().toISOString() },
        ],
      },
    },
  });
  const finalInquiry = await Promise.all(
    responses.map(async (request) => {
      const requestObj = request.toJSON();
      const inquiryObj = await PriceInquiry.findOne({
        attributes: ["id", "title", "categoryId"],
        where: {
          id: requestId,
        },
      });
      if (inquiryObj) {
        const inqObj = inquiryObj.toJSON();
        const category = await Category.findOne({
          attributes: ["id", "title"],
          where: {
            id: inqObj.categoryId,
          },
        });
        requestObj.inquiry = inqObj;
        if (category) {
          requestObj.category = category.toJSON();
        }
      }
      const user = await User.findOne({
        attributes: [
          "id",
          "first_name",
          "mobile",
          "last_name",
          "lat",
          "lng",
          "phone_number",
          "postalCode",
          "address",
          "provinceId",
          "cityId",
        ],
        where: {
          id: requestObj.sellerId,
        },
      });
      if (user) {
        requestObj.seller = { ...user.toJSON() };
        const provinces = require("../config/provinces.json");
        const cities = require("../config/cities.json");
        requestObj.seller.province = provinces.find(
          (el) => el.id == requestObj.seller.provinceId
        );
        requestObj.seller.city = cities.find(
          (el) => el.id == requestObj.seller.cityId
        );
        const branches = await Branch.findAll({
          attributes: [
            "id",
            "name",
            "first_name",
            "last_name",
            "phone_number",
            "address",
            "categoryId",
            "instagram",
            "whatsapp",
            "twitter",
            "linkedin",
            "facebook",
            "youtube",
          ],
          where: { userId: requestObj.seller.id },
        });

        const result = await Promise.all(
          branches.map(async (branch) => {
            const categoryIds = branch.categoryId
              ? branch.categoryId.split(",").map((id) => id.trim())
              : [];

            // Fetch categories in bulk using `findAll` with `where: { id: [ids] }`
            const categories = await Category.findAll({
              attributes: ["id", "title"],
              where: { id: categoryIds },
            });

            // Return the branch data along with associated categories
            return {
              ...branch.get({ plain: true }),
              categories,
            };
          })
        );
        requestObj.seller.branches = result;
      } else {
        requestObj.seller = {};
      }
      const messages = await InquiryResponseMessage.findAll({
        attributes: [
          "id",
          "message",
          "attachedImage",
          "attachedAudio",
          "createdAt",
          "sellerId",
          "isMine",
        ],
        where: {
          requestId: requestId,
          sellerId: request.sellerId,
        },
      });

      if (Array.isArray(messages) && messages.length > 0) {
        const res = await Promise.all(
          messages.map(async (req) => {
            const msg = req.toJSON();
            const user = await User.findOne({
              attributes: ["id", "first_name", "last_name"],
              where: {
                id: msg.sellerId,
              },
            });
            msg.user = user;
            return msg;
          })
        );
        requestObj.messages = [...res];
      } else {
        requestObj.messages = [];
      }
      return requestObj;
    })
  );
  try {
    return res.status(200).json(finalInquiry);
  } catch (e) {
    return res.status(500).json({ message: "خطا در دریافت اطلاعات" });
  }
}
module.exports = {
  getAllActivePriceInquiryResponses,
  AddInquiryResponse,
  AddPriceInquiryResponseMessage,
  getAllActivePriceInquiryResponses,
};
