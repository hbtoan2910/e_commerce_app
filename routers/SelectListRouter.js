const express = require("express")
const {
  createOptionByproperty,
  deleteSelectOption,
  getAllOptionByproperty,
  getSelectOptionById,
  updateSelectOption,
} = require("../controllers/SelectListController.js")

const SelectListrouter = express.Router();

SelectListrouter.get("/", getAllOptionByproperty);
SelectListrouter.get("/detail/:id", getSelectOptionById);
SelectListrouter.delete("/delete/:id", deleteSelectOption);
SelectListrouter.post("/create", createOptionByproperty);
SelectListrouter.put("/update/:id", updateSelectOption);
 
module.exports = SelectListrouter;