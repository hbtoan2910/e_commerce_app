const { SelectListModel } = require("../models/SelectListModel.js")
const cloudinary = require("cloudinary").v2
const SelectListRouter = require("../routers/SelectListRouter.js")

 const createOptionByproperty = async (req, res) => {
  const SelectListItem = new SelectListModel({
    name: req.body.name,
    property: req.body.property,
    options: req.body.options,
  });
  console.log(SelectListItem);
  await SelectListItem.save();
  res.send(SelectListItem);
};

 const getAllOptionByproperty = async (req, res) => {
  const SelectList = await SelectListModel.find({});
  if (SelectList) {
    res.send(SelectList);
  } else {
    res.send({ error: "no select list" });
  }
};

 const updateSelectOption = async (req, res) => {
  console.log("update", req.body);
  const UpdateSelect = await SelectListModel.findById({ _id: req.params.id });
  if (UpdateSelect) {
    UpdateSelect.name = req.body.name;
    UpdateSelect.property = req.body.property;
    UpdateSelect.options = req.body.options;
  }

  await UpdateSelect.save();
  res.send(UpdateSelect);
};

 const getSelectOptionById = async (req, res) => {
  const UpdateSelect = await SelectListModel.findById({ _id: req.params.id });
  if (UpdateSelect) {
    res.send(UpdateSelect);
  } else {
    res.send({ message: "no select " });
  }
};

 const deleteSelectOption = async (req, res) => {
  const UpdateSelect = await SelectListModel.findById({ _id: req.params.id });
  await UpdateSelect.remove();

  res.send({ msg: "deleted select" });
};

module.exports = {
    createOptionByproperty,
    getAllOptionByproperty,
    updateSelectOption,
    getSelectOptionById,
    deleteSelectOption
}