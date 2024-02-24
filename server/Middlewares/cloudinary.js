const cloudinary = require("cloudinary").v2;
const fs = require("fs");

cloudinary.config({
  cloud_name: "dvv4ffhvi",
  api_key: "467479789366527",
  api_secret: "omveynTqndXu9lAWONOuSfthJU8",
});

exports.cloudinaryUri = async (file) => {
  try {
    console.log(file.path);
    const res = await cloudinary.uploader.upload(file.path);
    fs.unlinkSync(file.path); // Delete the temporary file
    return res;
  } catch (error) {
    console.log("cloud UPoad Error", error.message);
  }
};
