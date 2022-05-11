const express = require("express");
const UserRouter = express.Router();
const {
  registerUser,
  getAllUser,
  updateUser,
  deleteUser,
  login,
} = require("../controllers/UserController");

UserRouter.post("/register", registerUser); //done
UserRouter.post("/login", login);
UserRouter.get("/", getAllUser); //done
UserRouter.put("/update/:id", updateUser); //done
UserRouter.delete("/delete/:id", deleteUser); //done

module.exports = UserRouter;
