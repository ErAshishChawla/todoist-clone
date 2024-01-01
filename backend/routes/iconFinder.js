const express = require("express");

const getSearchedIcons = require("../controllers/iconFinder");

const router = express.Router();

router.get("/", getSearchedIcons);

module.exports = router;
