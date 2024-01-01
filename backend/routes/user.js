const express = require("express");

const {
  handleGetUser,
  handleAddProject,
  handleDeleteProject,
  handleEditProject,
} = require("../controllers/user");
const isAuth = require("../middlewares/isAuth.js");
const decodeJWT = require("../middlewares/decodeJWT.js");

const router = express.Router();

router.get("/", isAuth, handleGetUser);

router.post("/addProject", isAuth, decodeJWT, handleAddProject);

router.delete("/deleteProject", isAuth, decodeJWT, handleDeleteProject);

router.patch("/updateProject", isAuth, decodeJWT, handleEditProject);

module.exports = router;
