const { User } = require("../models");
const jwt = require("jsonwebtoken");
async function getUserCoordination(req, res) {
  const userId = req.user.id;
  const result = await User.findOne({
    attributes: ["lat", "lng"],
    where: { id: userId },
  });
  if (result) {
    return res.status(200).json({ lat: result.lat, lng: result.lng });
  } else {
    return res.status(401).json({ message: "لطفا وارد سامانه شوید" });
  }
}
async function isUserRegistered(req, res) {
  const mobile = req.body.mobile;
  const u = await User.findOne({
    attributes: ["id"],
    where: { mobile: mobile },
  });
  if (!u) {
    return res.status(401).json({ message: "کاربر ثبت نام نکرده است" });
  } else {
    return res.status(200).json({ message: "کاربر ثبت نام کرده است" });
  }
}
async function editUserMobile(req, res) {
  const userId = req.user.id;
  const mobile = req.body.mobile;
  if (!mobile) {
    res.status(400).json({ message: "نام را انتخاب نمایید" });
  }
  const user = await User.findOne({
    attributes: ["id"],
    where: { id: userId },
  });
  try {
    const isUserExist = await User.findOne({
      attributes: ["id"],
      where: { mobile: mobile },
    });
    if (!isUserExist) {
      await user.update({
        mobile: first_name,
      });
      return res.status(200).json({ message: "کاربر ویرایش شد" });
    } else {
      return res.status(400).json({ message: "کاربر وجود دارد" });
    }
  } catch (e) {}

  return res.status(500).json({ message: "کاربر ویرایش نشد" });
}
async function editUserInfo(req, res) {
  const userId = req.user.id;
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const address = req.body.address;
  const provinceId = req.body.province;
  const telephone = req.body.telephone;
  const cityId = req.body.city;
  const postalCode = req.body.postalCode;
  const lat = req.body.lat;
  const lng = req.body.lng;

  if (!first_name) {
    res.status(400).json({ message: "نام را انتخاب نمایید" });
  }
  if (!last_name) {
    res.status(400).json({ message: "نام خانوادگی را انتخاب نمایید" });
  }
  if (!telephone) {
    res.status(400).json({ message: "تلفن را انتخاب نمایید" });
  }
  if (!address) {
    res.status(400).json({ message: "آدرس را انتخاب نمایید" });
  }
  if (!provinceId && !isNaN(provinceId)) {
    res.status(400).json({ message: "استان را انتخاب نمایید" });
  }
  if (!cityId && !isNaN(cityId)) {
    res.status(400).json({ message: "شهر را انتخاب نمایید" });
  }
  if (!postalCode) {
    res.status(400).json({ message: "کد پستی را انتخاب نمایید" });
  }
  if (!lat) {
    res.status(400).json({ message: "نقشه جغرافیایی را انتخاب نمایید" });
  }
  if (!lng) {
    res.status(400).json({ message: "نقشه جغرافیایی را انتخاب نمایید" });
  }
  const user = await User.findOne({
    attributes: ["id"],
    where: { id: userId },
  });
  try {
    await user.update({
      first_name: first_name,
      last_name: last_name,
      address: address,
      provinceId: Number(provinceId),
      cityId: Number(cityId),
      postalCode: postalCode,
      lat: lat,
      lng: lng,
      phone_number: telephone,
    });
    return res.status(200).json({ message: "کاربر ویرایش شد" });
  } catch (e) {}

  return res.status(500).json({ message: "کاربر ویرایش نشد" });
}
async function getUserMobile(req, res) {
  const userId = req.user.id;
  if (userId) {
    const userInfo = await User.findOne({
      attributes: ["id", "mobile"],
      where: { id: userId },
    });
    if (userInfo) {
      return res.status(200).json(userInfo);
    } else {
      return res.status(401).json({ message: "کاربر مورد نظر یافت نشد" });
    }
  }
}
async function getEditUserInfo(req, res) {
  const userId = req.user.id;
  if (userId) {
    const userInfo = await User.findOne({
      attributes: [
        "id",
        "first_name",
        "last_name",
        "phone_number",
        "address",
        "provinceId",
        "cityId",
        "lat",
        "lng",
        "postalCode",
      ],
      where: { id: userId },
    });
    if (userInfo) {
      return res.status(200).json(userInfo);
    } else {
      return res.status(401).json({ message: "کاربر مورد نظر یافت نشد" });
    }
  }
}
async function addUser(req, res) {
  const customerType = `${req.body.customer_type}`;
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const mobile = req.body.mobile;
  const address = req.body.address;
  const provinceId = req.body.province;
  const telephone = req.body.telephone;
  const cityId = req.body.city;
  const postalCode = req.body.postalCode;
  const lat = req.body.lat;
  const lng = req.body.lng;
  const otp = req.body.otp;
  if (!customerType) {
    res.status(400).json({ message: "نوع مشتری را انتخاب نمایید" });
  }
  if (!first_name) {
    res.status(400).json({ message: "نام را انتخاب نمایید" });
  }
  if (!last_name) {
    res.status(400).json({ message: "نام خانوادگی را انتخاب نمایید" });
  }
  if (!mobile) {
    res.status(400).json({ message: "شماره همراه را انتخاب نمایید" });
  }
  if (!address) {
    res.status(400).json({ message: "آدرس را انتخاب نمایید" });
  }
  if (!provinceId && !isNaN(provinceId)) {
    res.status(400).json({ message: "استان را انتخاب نمایید" });
  }
  if (!cityId && !isNaN(cityId)) {
    res.status(400).json({ message: "شهر را انتخاب نمایید" });
  }
  if (!lat) {
    res.status(400).json({ message: "نقشه جغرافیایی را انتخاب نمایید" });
  }
  if (!lng) {
    res.status(400).json({ message: "نقشه جغرافیایی را انتخاب نمایید" });
  }
  // await User.destroy({
  //   where: {},
  // });
  const u = await User.findOne({
    attributes: ["id"],
    where: { mobile: mobile },
  });
  if (!u) {
    // try {
    if (otp === "11111") {
      const user = await User.create({
        first_name: first_name,
        last_name: last_name,
        customerType: customerType,
        mobile: mobile,
        address: address,
        provinceId: Number(provinceId),
        cityId: Number(cityId),
        postalCode: postalCode,
        lat: lat,
        lng: lng,
        phone_number: telephone,
      }); // Get all categories
      const accessToken = jwt.sign(
        {
          id: user.id,
        },
        process.env.SECRET_TOKEN,
        { expiresIn: "15m" }
      );
      const refreshToken = jwt.sign(
        {
          id: user.id,
        },
        process.env.SECRET_TOKEN,
        { expiresIn: "2d" }
      );
      return res
        .status(200)
        .json({ accessToken: accessToken, refreshToken: refreshToken });
    } else {
      return res.status(401).json({ message: "کد وارد شده صحیح نمیباشد" });
    }
    // } catch (e) {
    //   res.status(500).json({ message: "خطا در ذخیره سازی اطلاعات" });
    // }
  } else {
    return res
      .status(400)
      .json({ message: "کاربری با این شماره موبایل قبلا ثبت شده است" });
  }
}

module.exports = {
  addUser,
  getUserCoordination,
  isUserRegistered,
  getEditUserInfo,
  editUserInfo,
  getUserMobile,
};
