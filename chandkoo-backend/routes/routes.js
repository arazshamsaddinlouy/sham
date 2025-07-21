const express = require("express");
const multer = require("multer");
const {
  Login,
  SendOtp,
  GetUserInfo,
  addUser,
} = require("../controllers/AuthController");
const { GetAllCategories, AddCategory, GetAllAdminCategories } = require("../controllers/CategoryController");
const { HandleCrawler } = require("../controllers/CrawlerController");
const {
  getAllProvinces,
  getAllProvincesWithCities,
} = require("../controllers/ProvinceController");
const { getAllCities } = require("../controllers/CityController");
const {
  getUserCoordination,
  isUserRegistered,
  getEditUserInfo,
  editUserInfo,
  getUserMobile,
} = require("../controllers/UserController");
const router = express.Router();
const {
  addPriceInquiry,
  getUserActiveRequests,
  getUserExpiredRequests,
  getAllActiveRequests,
  getAllExpiredRequests,
  markInquiryAsRead,
  getPriceInquiryByKey,
} = require("../controllers/PriceInquiryController");
const upload = require("../middleware/fileStorage");
const {
  addBranch,
  getBranches,
  getBranchLatLng,
  editBranch,
  deleteBranch,
} = require("../controllers/BranchController");
const {
  getAllMenus,
  getAllFooters,
  getAllSellers,
  getAllSales,
  getAllTrades,
} = require("../controllers/ContentController");
const {
  AddInquiryResponse,
  AddPriceInquiryResponseMessage,
  getAllActivePriceInquiryResponses,
} = require("../controllers/InquiryResponseController");
// Auth Routes
router.get("/crawl", HandleCrawler);
router.post("/auth/login", Login);
router.get("/auth/getUserInfo", GetUserInfo);
router.post("/user/add", addUser);
router.get("/user/edit", getEditUserInfo);
router.get("/user/edit/mobile", getUserMobile);
router.put("/user/edit", editUserInfo);
router.post("/user/isRegistered", isUserRegistered);
router.get("/user/getLocation", getUserCoordination);
router.post("/branch/add", addBranch);
router.post("/price-inquiry/add", addPriceInquiry);
router.get("/price-inquiry/getActiveRequests", getUserActiveRequests);
router.post("/price-inquiry/getByKey", getPriceInquiryByKey);
router.get("/price-inquiry/getExpiredRequests", getUserExpiredRequests);
router.get("/price-inquiry/getAllActiveRequests", getAllActiveRequests);
router.get("/price-inquiry/getAllExpiredRequests", getAllExpiredRequests);
router.post("/inquiry-response/add", AddInquiryResponse);
router.post(
  "/inquiry-response/getAllActive",
  getAllActivePriceInquiryResponses
);
router.put("/branch/edit", editBranch);
router.delete("/branch/delete", deleteBranch);
router.get("/branch/getAll", getBranches);
router.post("/branch/getLocation", getBranchLatLng);
router.get("/province/getAll", getAllProvinces);
router.get("/province/getAllWithCities", getAllProvincesWithCities);
router.get("/city/getAll", getAllCities);
router.get("/category/getAll", GetAllCategories);
router.post("/category/add", AddCategory);
router.get("/category/getAdminAll", GetAllAdminCategories);
router.post("/auth/sendOtp", SendOtp);
router.get("/content/getAllMenus", getAllMenus);
router.get("/content/getAllFooters", getAllFooters);
router.get("/content/getAllSellers", getAllSellers);
router.get("/content/getAllSales", getAllSales);
router.get("/content/getAllTrades", getAllTrades);
router.post(
  "/inquiry/add",
    (req, res, next) => {
    upload.fields([
      { name: "image", maxCount: 1 },
      { name: "audio", maxCount: 1 },
    ])(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: "Multer Error", details: err.message });
      } else if (err) {
        return res.status(400).json({ error: "File Upload Error", details: err.message });
      }
      next();
    });
  },
  addPriceInquiry
);
router.post("/price-inquiry/read", markInquiryAsRead);
router.post(
  "/inquiry-response/addMessage",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "audio", maxCount: 1 },
  ]),
  AddPriceInquiryResponseMessage
);

module.exports = router;
