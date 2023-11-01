const express = require("express");
const { verifyToken } = require("../Middlewares/auth");
const {
  getFeedPosts,
  getUserPosts,
  likePosts,
  createPost,
} = require("../Controllers/Post");

const router = express.Router();

router.get("/", getFeedPosts);

router.get("/:userId/posts", getUserPosts);
router.patch("/:id/like", likePosts);

module.exports = router;
