const { Post } = require("../Models/Post");
const { User } = require("../Models/User");
const mongoose = require("mongoose");

exports.createPost = async (req, res) => {
  try {
    const { picturePath, description, userId } = req.body;
    console.log(req.body);
    const user = await User.findById(userId);
    console.log(user);

    const newPost = await Post.create({
      userId: userId,
      firstName: user.firstName,
      lastName: user.lastName,
      picturePath,
      location: user.location,
      userpicturePath: user.picturePath,
      description: description,
      likes: {},
      comments: [],
    });
    console.log(newPost);

    const MyNewPost = await newPost.save();

    const post = await Post.find();

    res.status(200).json({
      MyNewPost,
      success: true,
      message: "User is created successfully",
    });
  } catch (err) {
    res.status(404).json({
      error: err.message,
      success: false,
      message: "Unabel to get create new post for the user",
    });
  }
};
exports.getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json({
      post,
      success: true,
      message: "Posts fetched succesfully",
    });
  } catch (err) {
    res.status(404).json({
      error: err.message,
      success: false,
      message: "Unabel to get all posts",
    });
  }
};
exports.getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;

    const post = await Post.find({ userId });
    res.status(200).json({
      post,
      success: true,
      message: "Posts fetched succesfully",
    });
  } catch (err) {
    res.status(404).json({
      error: err.message,
      success: false,
      message: "Unabel to get all posts",
    });
  }
};

exports.likePosts = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    const post = await Post.findById(id);

    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatePost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json({
      updatePost,
      success: true,
      message: "Posts Updated",
    });
  } catch (err) {
    res.status(404).json({
      error: err.message,
      success: false,
      message: "Unabel to get all posts",
    });
  }
};
