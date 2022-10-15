const mongoose = require("mongoose")

const listTypeProductSchema = new mongoose.Schema(
  {
    name: String,
    img: String,
    cloudinary_id: String,
  },
  {
    timestamps: true,
  }
);
const ListTypeProductModel = mongoose.model("ListTypeproduct", listTypeProductSchema);
module.exports = ListTypeProductModel; 
