const multer = require("multer");
const path = require("path");
const fs = require("fs");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
const uploadPath = "./uploads/";
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Set the filename for the uploaded image
    const ext = path.extname(file.originalname);
    const filename = Date.now() + ext; // For uniqueness
    cb(null, filename);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
  const imageTypes = /jpeg|jpg|png|gif|webp/;
  const audioTypes = /mp3|wav|mpeg|ogg/;

  const ext = path.extname(file.originalname).toLowerCase();
  const mime = file.mimetype;

  if (file.fieldname === "image") {
    if (imageTypes.test(ext) && imageTypes.test(mime)) {
      return cb(null, true);
    } else {
      return cb(new Error("Only image files are allowed."));
    }
  } else if (file.fieldname === "audio") {
    if (audioTypes.test(ext) && audioTypes.test(mime)) {
      return cb(null, true);
    } else {
      return cb(new Error("Only audio files are allowed."));
    }
  } else {
    return cb(new Error("Invalid file field."));
  }
},
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit per file
});

module.exports = upload;
