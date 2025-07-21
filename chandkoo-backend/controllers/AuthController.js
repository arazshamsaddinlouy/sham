const jwt = require("jsonwebtoken");
const axios = require("axios");
const { User } = require("../models");
const otpCache = new Map();
async function Login(req, res) {
  const mobile = req.body.mobile;
  const u = await User.findOne({
    attributes: ["id"],
    where: { mobile: mobile },
  });

  if (u) {
    const accessToken = jwt.sign(
      {
        id: u.id,
      },
      process.env.SECRET_TOKEN,
      { expiresIn: "15m" }
    );
    const refreshToken = jwt.sign(
      {
        id: u.id,
      },
      process.env.SECRET_TOKEN,
      { expiresIn: "2d" }
    );
    const otpCode = req.body.otpCode;
      const record = otpCache.get(req.body.mobile);
  if (!record) return res.status(400).json({message: "کد منقضی شده است."});

  const { randomFiveDigitNumber, expiresAt } = record;
    if (otpCode == randomFiveDigitNumber) {
      return res
        .status(200)
        .json({ accessToken: accessToken, refreshToken: refreshToken });
    } else {
      return res.status(401).json({ message: "کد وارد شده صحیح نمیباشد" });
    }
  } else {
    return res
      .status(401)
      .json({ message: "کاربری با چنین شماره موبایلی یافت نشد" });
  }
}
const GetUserInfo = async (req, res) => {
  if (!req.user) {
    throw new Error("User not authenticated");
  }
  const u = await User.findOne({
    attributes: ["id", "first_name", "last_name", "mobile", "customerType"],
    where: { id: req.user.id },
  });
  if (u) {
    return res.status(200).json({ user: u });
  } else {
    return res.status(400).json({ message: "به سامانه ورود کنید!" });
  }
};
async function SendOtp(req, res) {
  const apiKey = process.env.SMS_API_KEY; // کلید Sandbox خود را وارد کنید
  const mobile = req.body.mobile; // شماره موبایل گیرنده
  const templateId = 102049; // شناسه قالب احراز هویت (باید قبلاً تعریف شده باشد)
  const randomFiveDigitNumber = Math.floor(10000 + Math.random() * 90000);
    otpCache.set(mobile, {
    randomFiveDigitNumber,
    expiresAt: Date.now() + 5 * 60 * 1000 // 5 minutes
  });
  const requestBody = {
    mobile: mobile,
    templateId: templateId,
    parameters: [
      {
        name: "CODE",
        value: randomFiveDigitNumber, // کد تأیید خود را وارد کنید
      },
    ],
  };
  try {
    const response = await axios.post(
      "https://api.sms.ir/v1/send/verify",
      requestBody,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "text/plain",
          "x-api-key": apiKey,
        },
      }
    );
    return res.status(200).json(response.data);
  } catch (error) {
    if (error.response) {
      // Axios received a response with an error status code
      return res.status(error.response.status).json({
        message: error.message,
        data: error.response.data,
      });
    } else if (error.request) {
      // Request was made but no response was received
      return res.status(500).json({
        message: "No response received from target API",
        error: error.message,
      });
    } else {
      // Something else went wrong setting up the request
      return res.status(500).json({
        message: "Error setting up request",
        error: error.message,
      });
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
     try {
    const record = otpCache.get(mobile);
    if (!record) return res.status(400).json({message: "کد منقضی شده است."});
    const { randomFiveDigitNumber, expiresAt } = record;
    if (otp == randomFiveDigitNumber) {
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
     } catch (e) {
       res.status(500).json({ message: "خطا در ذخیره سازی اطلاعات" });
     }
  } else {
    return res
      .status(400)
      .json({ message: "کاربری با این شماره موبایل قبلا ثبت شده است" });
  }
}

module.exports = { Login, SendOtp, GetUserInfo, addUser };
