const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config;

async function decodeJWT(req, res, next) {
  try {
    const { uid } = req.cookies;

    console.log("JWT extraction started");
    const payload = jwt.verify(uid, process.env.JWT_SECRET_KEY);

    if (!payload) {
      console.log("invalid JWT");
      res.clearCookie("uid");
      return res.status(401).json({
        errorMessage: "Unauthorised User",
      });
    }

    console.log("JWT extracted successfully");

    console.log("Extracting userid from JWT");
    const { userId } = payload;

    if (!userId) {
      console.log("invalid userId");
      res.clearCookie("uid");
      return res.status(401).json({
        errorMessage: "Unauthorised User",
      });
    }

    console.log("UserId extracted Successfully");

    const user = await User.findById(userId);

    if (!user) {
      console.log("No user found");
      res.clearCookie("uid");
      return res.status(401).json({
        errorMessage: "Unauthorised User",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("JWT extraction failed");
    console.log(error);
    return res.status(500).json({
      errorMessage: "Internal Server Error",
    });
  }
}

module.exports = decodeJWT;
