const express = require("express");

const isAuth = require("../middlewares/isAuth.js");

const {
  handleUserSignUp,
  handleUserLogin,
  handleUserLogout,
  handleUserEmailVerification,
  handleResendVerificationEmail,
  handleSendResetPasswordEmail,
  handleSetNewPassword,
} = require("../controllers/auth.js");

const router = express.Router();

router.post("/signup", handleUserSignUp);

router.post("/login", handleUserLogin);

router.post("/logout", isAuth, handleUserLogout);

router.post("/verify-email", handleUserEmailVerification);

router.post("/verify-email/resend", handleResendVerificationEmail);

router.post("/resetPassword", handleSendResetPasswordEmail);

router.post("/setNewPassword", handleSetNewPassword);

module.exports = router;
