const mongoose = require("mongoose");
require("dotenv").config();

async function connectToMongoDB() {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING, {
      dbName: process.env.DB_NAME,
    });
    return Promise.resolve();
  } catch (err) {
    return Promise.reject(err);
  }
}

module.exports = connectToMongoDB;
