import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  ValidateCreateUser,
  ValidateLoginUser,
} from "../Requests/ValidateUser.js";
import User from "../models/user.js";

// @desc    Register a new User
// @route   POST /api/signup
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
  const { error } = ValidateCreateUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const { name, email, password } = req.body;
  let user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ message: "Email already exists" });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  user = new User({
    name,
    email,
    password: hashedPassword,
  });
  const result = await user.save();
  const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
    expiresIn: "30d",
  });
  res.status(200).json({
    token,
    id: result._id,
    name: result.name,
    email: result.email,
  });
});

// @desc    Login a new User
// @route   POST /api/login
// @access  Public
export const loginUser = asyncHandler(async (req, res) => {
  const { error } = ValidateLoginUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const { email, password } = req.body;
  let user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "invalid Email and password" });
  }
  const hashedPassword = await bcrypt.compare(password, user.password);
  if (!hashedPassword) {
    return res.status(400).json({ message: "invalid Email and password" });
  }
  const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
    expiresIn: "30d",
  });
  res.status(200).json({
    name: user.name,
    token,
  });
});

// @desc    Logout User
// @route   POST /api/logout
// @access  Private
export const logoutUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "User logged out successfully" });
});
