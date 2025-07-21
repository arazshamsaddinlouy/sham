const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const routes = require("./routes/routes");
const authenticateToken = require("./middleware/authenticateToken");
require("dotenv").config();
// Middleware
app.use(express.json({ type: 'application/json', charset: 'utf-8' }));
// Use the routes
app.use(
  cors({
    origin: "http://chandkoo.ir", // Replace with your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
// 🟢 Optionally handle preflight requests for complex CORS scenarios
app.options("*", cors());
app.use(authenticateToken);
app.use(
  "/uploads",
  express.static("uploads", {
    setHeaders: (res, path) => {
      res.setHeader("Content-Disposition", "attachment");
    },
  })
);
app.use("/", routes);
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
