const { Post } = require("../Models/Post");
const { User } = require("../Models/User");
const mongoose = require("mongoose");

exports.createPost = async (req, res) => {
  try {
    const { picturePath, description, userId } = req.body;
    const user = await User.findById(userId);

    const newPost = await Post.create({
      userId: userId,
      firstName: user.firstName,
      lastName: user.lastName,
      picturePath,
      location: user.location,
      userpicturePath: user.picturePath,
      description: description,
    });

    const MyNewPost = await newPost.save();

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

    const isLiked = post?.likes?.includes(userId);

    if (isLiked) {
      post.likes.pull(userId);
    } else {
      post?.likes?.push(userId);
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
exports.AddComment = async (req, res) => {
  try {
    const { pay } = req.body;
    const { comment } = pay;
    const userId = req.user.id;
    const { id } = req.params;
    if (!comment) {
      return res
        .status(400)
        .json({ status: false, message: "comment could not be Empty" });
    }
    console.log(userId);
    const user = await User.findById(userId);
    const postData = await Post.findById(id);
    if (!postData) {
      return res
        .status(400)
        .json({ status: false, message: "Posst not found" });
    }
    if (!user) {
      return res.status(400).json({ status: false, message: "user Not found" });
    }

    postData.comments.push({
      postId: id,
      comment,
      user,
      id: Date.now() * Math.random(10),
    });

    postData.save();

    return res.status(201).json({ postData });

    const post = await Post.findById(id);

    const isLiked = post?.likes?.includes(userId);

    if (isLiked) {
      post.likes.pull(userId);
    } else {
      post?.likes?.push(userId);
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
