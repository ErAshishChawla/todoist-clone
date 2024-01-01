require("dotenv").config();
const jwt = require("jsonwebtoken");
const { v4: uuid } = require("uuid");

const User = require("../models/user.js");
const Todo = require("../models/todo.js");

async function handleGetUser(req, res, next) {
  try {
    const { uid } = req.cookies;

    const payload = jwt.verify(uid, process.env.JWT_SECRET_KEY);

    const user = await User.findById(payload.userId).select(
      "email isVerified projects"
    );

    if (!user) {
      return res.status(401).json({
        errorMessage: "User Doesnt Exists/ Invalid Token",
      });
    }

    return res.status(200).json({
      user,
      token: uid,
    });
  } catch (error) {
    console.log("Fetching User failed");
    console.log(error);
  }
}

async function handleAddProject(req, res, next) {
  try {
    const { title, icon } = req.body;

    if ((!title, !icon)) {
      return res.status(400).json({
        errorMessage: "Invalid Form Values",
      });
    }

    const user = await User.findByIdAndUpdate(
      {
        _id: req.user._id,
      },
      {
        $push: {
          projects: {
            randomId: uuid(),
            title,
            icon,
          },
        },
      }
    );

    const updatedUser = await User.findById(user._id).select(
      "email isVerified projects"
    );

    return res.status(201).json(updatedUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errorMessage: "Server Error!" });
  }
}

async function handleDeleteProject(req, res, next) {
  try {
    const { projectId } = req.body;

    if (!projectId) {
      console.log("No Project Id");
      return res.status(400).json({
        errorMessage: "Invalid Request",
      });
    }

    const user = await User.findOneAndUpdate(
      { _id: req.user._id },
      { $pull: { projects: { randomId: projectId } } }
    );

    if (!user) {
      console.log("No User Found");
      return res.status(400).json({
        errorMessage: "Invalid Request",
      });
    }

    console.log("Deleting Todos");
    await Todo.deleteMany({ listTypeId: projectId });
    console.log("Todos Deleted");

    const updatedUser = await User.findById(user._id).select(
      "email isVerified projects"
    );

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errorMessage: "Internal Server Error",
    });
  }
}

async function handleEditProject(req, res, next) {
  try {
    const { project } = req.body;

    if (!project) {
      console.log("No project Found");
      return res.status(400).json({
        errorMessage: "Invalid Request",
      });
    }

    const result = await User.findOneAndUpdate(
      { _id: req.user.id, "projects.randomId": project.randomId },
      {
        $set: {
          "projects.$.title": project.title,
          "projects.$.icon": project.icon,
        },
      }
    );

    if (!result) {
      console.log("No value found");
      return res.status(400).json({
        errorMessage: "Invalid Request",
      });
    }

    console.log("Project Updated");

    const updatedUser = await User.findById(req.user.id).select(
      "email isVerified projects"
    );
    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errorMessage: "Internal Server Error",
    });
  }
}

module.exports = {
  handleGetUser,
  handleAddProject,
  handleDeleteProject,
  handleEditProject,
};
