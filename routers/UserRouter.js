const express = require("express");
const { isAuthenticated, isAdmin } = require("../config/utils/util");
const UserRouter = express.Router();
const {
  registerUser,
  getAllUser,
  updateUser,
  deleteUser,
  login,
} = require("../controllers/UserController");

UserRouter.post("/register", isAuthenticated, isAdmin, registerUser);
UserRouter.post("/login", login);
UserRouter.get("/", isAuthenticated, isAdmin, getAllUser);
UserRouter.put("/update/:id", isAuthenticated, isAdmin, updateUser);
UserRouter.delete("/delete/:id", isAuthenticated, isAdmin, deleteUser);

module.exports = UserRouter;
