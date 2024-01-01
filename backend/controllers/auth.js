const User = require("../models/user.js");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuid } = require("uuid");
const { formatISO, add, isAfter, format } = require("date-fns");

const dispatchSignUpConfirmationEmail = require("../utils/dispatchSignUpConfirmationEmail.js");
const dispatchResetPasswordEmail = require("../utils/dispatchResetPasswordEmail.js");
require("dotenv").config();

async function handleUserSignUp(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      console.log("Email and Password are required");
      return res.status(400).json({
        errorMessage: "Email and Password are required",
      });
    }

    const foundUser = await User.findOne({ email: email });

    if (foundUser) {
      console.log("user already exists");
      return res.status(400).json({
        errorMessage: "User Already Exists",
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      parseInt(process.env.HASHING_SALTS)
    );

    const verificationToken = uuid();
    const verificationTokenExpiry = add(formatISO(new Date()), { hours: 24 });

    await User.create({
      email,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpiry,
    });

    res.clearCookie("uid");

    res.status(201).json({
      email,
    });

    dispatchSignUpConfirmationEmail({
      email,
      verificationToken,
    })
      .then(() => {
        console.log("Email has been sent");
      })
      .catch((err) => {
        console.log("Email sending failed");
        console.log(err);
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errorMessage: error.message,
    });
  }
}

async function handleUserLogin(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      console.log("Email and Password are required");
      return res.status(400).json({
        errorMessage: "Email and Password are required",
      });
    }
    const user = await User.findOne({ email: email });
    console.log(email, user);

    if (!user) {
      return res.status(401).json({
        errorMessage: "Invalid Email or Password",
      });
    }

    //Check for Password
    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      console.log("Invalid Email or Password");
      return res.status(400).json({
        errorMessage: "Invalid Email or Password",
      });
    }

    const payload = {
      jti: uuid(),
      userId: user._id,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: "30d",
    });

    res.cookie("uid", token, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return res.status(200).json({
      message: "User Logged In Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errorMessage: error.message,
    });
  }
}

async function handleUserLogout(req, res, next) {
  try {
    const { uid } = req.cookies;

    const payload = jwt.verify(uid, process.env.JWT_SECRET_KEY);

    const user = await User.findById(payload.userId);

    if (!user) {
      res.clearCookie("uid");
      return res.status(400).json({
        errorMessage: "User Doesnt Exists/ Invalid Token",
      });
    }

    res.clearCookie("uid");

    return res.status(200).json({
      message: "User Logged Out",
    });
  } catch (error) {
    console.log("Logout Failed");
    console.log(error);
    return res.status(500).json({
      errorMessage: error.message,
    });
  }
}

async function handleUserEmailVerification(req, res, next) {
  try {
    const { verificationToken } = req.body;

    const requestTime = formatISO(new Date());

    const user = await User.findOne({
      verificationToken: verificationToken,
    });

    if (
      !user ||
      isAfter(requestTime, formatISO(user.verificationTokenExpiry))
    ) {
      return res.status(401).json({
        errorMessage: "Invalid Verification Token",
      });
    }

    user.verificationToken = null;
    user.verificationTokenExpiry = null;
    user.isVerified = true;
    await user.save();

    return res.status(200).json({
      message: "Email Verified Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errorMessage: error.message,
    });
  }
}

async function handleResendVerificationEmail(req, res, next) {
  try {
    const { uid } = req.cookies;

    const payload = jwt.verify(uid, process.env.JWT_SECRET_KEY);

    const user = await User.findById(payload.userId);

    if (!user) {
      res.clearCookie("uid");
      return res.status(401).json({
        errorMessage: "User Doesnt Exists/ Invalid Token",
      });
    }

    if (user && user.isVerified) {
      return res.status(400).json({
        errorMessage: "User is already verified",
      });
    }

    const verificationToken = uuid();
    const verificationTokenExpiry = add(formatISO(new Date()), { hours: 24 });

    user.verificationToken = verificationToken;
    user.verificationTokenExpiry = verificationTokenExpiry;
    await user.save();

    res.clearCookie("uid");

    res.status(200).json({
      email: user.email,
      message: "Verification email sent",
    });

    dispatchSignUpConfirmationEmail({
      email: user.email,
      verificationToken,
    })
      .then(() => {
        console.log("Email has been sent");
      })
      .catch((err) => {
        console.log("Email sending failed");
        console.log(err);
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errorMessage: error.message,
    });
  }
}

async function handleSendResetPasswordEmail(req, res, next) {
  try {
    console.log("Reset Password Email Request Triggered");

    const { email } = req.body;

    console.log("Email is", email);
    if (!email) {
      console.log("Email is empty");
      return res.status(400).json({
        errorMessage: "Email is Required",
      });
    }

    console.log("Finding user associated with", email);

    const user = await User.findOne({ email: email });

    if (!user) {
      console.log("No user associated with", email);
      return res.status(400).json({
        errorMessage: "Invalid Email",
      });
    }

    console.log("User is found!", user);
    console.log("Generating unique token for reset password");

    const resetToken = uuid();
    const resetTokenExpiry = add(formatISO(new Date()), { hours: 1 });

    console.log("Setting values to the user");
    user.resetToken = resetToken;
    user.resetTokenExpiry = resetTokenExpiry;
    await user.save();

    console.log("Values updated!");

    console.log("Clearing JWT COOKIE");
    res.clearCookie("uid");
    res.status(200).json({
      message: "Reset Password email sent Successfully",
    });
    console.log("Success response sent");
    dispatchResetPasswordEmail({
      email,
      resetToken,
    })
      .then(() => {
        console.log("Reset Password Mail Sent Successfully");
      })
      .catch((error) => {
        console.log(
          "Some Error with sendgrid. Reset Password Mail sending failed"
        );
        console.log(error);
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      errorMessage: "Internal Server Error",
    });
  }
}

async function handleSetNewPassword(req, res, next) {
  try {
    console.log("Set New Password request triggered");

    const { newPassword, resetToken } = req.body;

    if (!newPassword) {
      console.log("New Password is empty");
      return res.status(400).json({
        errorMessage: "New Password is Required",
      });
    }

    if (!resetToken) {
      console.log("Empty Reset Token");
      return res.status(400).json({
        errorMessage: "Invalid Reset Token",
      });
    }

    console.log("Finding user associated with current Reset Token");

    const user = await User.findOne({
      resetToken: resetToken,
      resetTokenExpiry: { $gt: formatISO(new Date()) },
    });

    if (!user) {
      console.log("Either Reset Token is expired or user doesn't exist");
      return res.status(400).json({
        errorMessage: "Invalid Reset Token",
      });
    }

    console.log("User is found!", user);

    console.log("Hashing the new password");
    const hashedPassword = await bcrypt.hash(
      newPassword,
      parseInt(process.env.HASHING_SALTS)
    );

    console.log("Setting new password");
    user.resetToken = null;
    user.resetTokenExpiry = null;
    user.password = hashedPassword;
    await user.save();

    console.log("Values updated!");

    console.log("Clearing JWT COOKIE");
    res.clearCookie("uid");
    return res.status(200).json({
      message: "New Password Set Successfully sent Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      errorMessage: "Internal Server Error",
    });
  }
}

module.exports = {
  handleUserSignUp,
  handleUserLogin,
  handleUserLogout,
  handleUserEmailVerification,
  handleResendVerificationEmail,
  handleSendResetPasswordEmail,
  handleSetNewPassword,
};
