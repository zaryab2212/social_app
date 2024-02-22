const mongoose = require("mongoose");
const { User } = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "KDFJKDJFKDJ";

exports.registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    const salt = 10;

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message:
          "User already Exist the try to login with the correct credentials",
      });
    }
    const hashedPassword = await bcrypt.hash(password, salt);
    if (!hashedPassword) {
      return res.status(400).json({
        success: false,
        message: "try try again an error occored - to store the password",
      });
    }
    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
      viewedProfile: Math.floor(Math.random() * 100000),
      impressions: Math.floor(Math.random() * 10000),
      occupation: req.body.accupation,
    });
    await newUser.save();
    res.status(201).json({
      newUser,
      success: true,
      message: "User Registerd Successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
      success: false,
      message: "An error occured to register new user",
    });
  }
};
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email);
    const user = await User.findOne({ email });
    console.log(user);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invailid Email",
      });
    }
    const verfyPassword = await bcrypt.compare(password, user.password);
    console.log(verfyPassword);

    if (!verfyPassword) {
      return res.status(400).json({
        success: false,
        message: "try to login with correct credentials",
      });
    }
    const token = await jwt.sign({ id: user._id }, JWT_SECRET);

    delete user.password;

    res.status(200).json({
      user,
      token,
      success: true,
      message: "User Registerd Successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
      success: false,
      message: "An error occured to register new user",
    });
  }
};
