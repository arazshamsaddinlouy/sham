const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const { path } = req;

  // Bypass authentication for specific routes
  if (
    path === "/auth/login" ||
    path === "/auth/register" ||
    path === "/crawl" ||
    path === "/user/add" ||
    path === "/category/getAll" ||
    path === "/province/getAll" ||
    path === "/city/getAll" ||
    path === "/user/isRegistered" ||
    path === "/auth/sendOtp" ||
    path === '/category/getAdminAll' ||
    path === '/category/add' ||
    path.startsWith("/uploads") ||
    path.startsWith("/content")
  ) {
    return next();
  }

  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access denied, token missing" });
  }

  jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = decoded;
    next();
  });
};

module.exports = authenticateToken;
