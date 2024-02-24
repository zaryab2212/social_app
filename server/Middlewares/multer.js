const multer = require("multer");

const cloudinary = require("cloudinary").v2;

const storage = multer.memoryStorage();

const upload = multer({ dest: "uploads/" });

module.exports = upload;
