const asyncHandler = require("express-async-handler");
const { User } = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

/**
 * @desc   Get Forgot Password view
 * @route  GET /password/forgot-password
 * @method GET
 * @access Public
 */

const getForgotPasswordView = asyncHandler((req, res) => {
  res.render("forgot-password");
});

/**
 * @desc   Send Forgot Password view
 * @route  POST /password/forgot-password
 * @method POST
 * @access Public
 */

const sendForgotPasswordLink = asyncHandler(async (req, res) => {
  // console.log(req.body.email)
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }
  const secret = process.env.JWT_SECRET_KEY + user.password;
  const token = jwt.sign({ id: user._id, email: user.email }, secret, {
    expiresIn: "10m",
  });
  const link = `http://localhost:5000/password/reset-password/${user._id}/${token}`;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: user.email,
    subject: "Reset Password",
    // text: link,
    html: `<div>
    <h4>Click on the link below to reset your password</h4> <br> <h4>${link}</h4>
    </div>
    `,
  };

  transporter.sendMail(mailOptions, function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + success.response);
    }
  });

  res.render("link-send");

  // res.json({ message: "Click on the link", resetPassword: link });
});

/**
 * @desc   Get Reset Password view
 * @route  GET /password/reset-password/:userId/:token
 * @method GET
 * @access Public
 */

const getResetPasswordView = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const secret = process.env.JWT_SECRET_KEY + user.password;

  try {
    jwt.verify(req.params.token, secret);
    res.render("reset-password", { email: user.email });
  } catch (error) {
    console.log(error);
    res.json({ message: "Error" });
  }
});

/**
 * @desc   Reset The Password
 * @route  POST /password/reset-password/:userId/:token
 * @method POST
 * @access Public
 */

const resetPassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const secret = process.env.JWT_SECRET_KEY + user.password;
  try {
    jwt.verify(req.params.token, secret);

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);
    await user.save();
    res.render("success-password");
  } catch (error) {
    console.log(error);
    res.json({ message: "Error" });
  }
});

module.exports = {
  getForgotPasswordView,
  sendForgotPasswordLink,
  getResetPasswordView,
  resetPassword,
};
