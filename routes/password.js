const express = require("express");
const router = express.Router();
const {
  getForgotPasswordView,
  sendForgotPasswordLink,
  getResetPasswordView,
  resetPassword,
} = require("../controllers/passwordController");

// /password/forgot-password
router
  .route("/forgot-password")
  .get(getForgotPasswordView)
  .post(sendForgotPasswordLink);

router
  .route("/reset-password/:userId/:token")
  .get(getResetPasswordView)
  .post(resetPassword);

module.exports = router;
