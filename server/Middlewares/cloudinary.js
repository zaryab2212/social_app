const cloudinary = require("cloudinary").v2;
const fs = require("fs");

cloudinary.config({
  cloud_name: "dvv4ffhvi",
  api_key: "467479789366527",
  api_secret: "omveynTqndXu9lAWONOuSfthJU8",
});

exports.cloudinaryUri = async (file) => {
  try {
    console.log(file);
    const base64Data = file.buffer.toString("base64");

    // Upload base64 data to Cloudinary
    const res = await cloudinary.uploader.upload(
      `data:${file.mimetype};base64,${base64Data}`,
      {
        resource_type: "auto", // Let Cloudinary determine the resource type
      }
    );

    return res;
  } catch (error) {
    console.log("cloud UPoad Error", error.message);
  }
};
