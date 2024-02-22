const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },

    picturePath: {
      type: String,
    },
    userpicturePath: {
      type: String,
    },

    location: String,
    description: String,
    likes: {
      type: [String],
      default: [],
    },
    comments: {
      type: [Object],
      default: [],
    },
  },
  { timestamps: true }
);

exports.Post = mongoose.model("Post", postSchema);
