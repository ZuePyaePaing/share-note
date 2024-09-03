const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        isSuccess: false,
        message: "User already exist.",
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashPassword,
    });
    return res.status(201).json({
      isSuccess: true,
      message: "User registered successfully.",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      isSuccess: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({
        isSuccess: false,
        message: "User dost not this email.",
      });
    }
    const token = await jwt.sign(
      { userId: existingUser._id, email: existingUser.email },
      process.env.JWT_KEY,
      { expiresIn: "1d" }
    );
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(400).json({
        isSuccess: false,
        message: "Incorrect password.",
      });
    }
    return res.status(201).json({
      isSuccess: true,
      message: "Login successfully.",
      user: {
        id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
        token,
      },
    });
  } catch (error) {
    return res.status(500).json({
      isSuccess: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
};
