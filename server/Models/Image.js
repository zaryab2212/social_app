const mongoose = require("mongoose");

const imageSchema = mongoose.Schema({
  imagename: String,
  imagePath: String,
  data: String,
  contentType: String,
});

exports.Image = mongoose.model("Image", imageSchema);
