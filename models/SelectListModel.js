const mongoose = require("mongoose")


const selectListSchema = new mongoose.Schema(
  {
    name: String,
    property: String,
    options: Array,
  },
  {
    timestamp: true,
  }
);
const SelectListModel = mongoose.model('SelectList', selectListSchema);
module.exports = SelectListModel;