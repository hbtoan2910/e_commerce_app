const mongoose = require("mongoose");

const reviewProductSchema = new mongoose.Schema(
  {
    name: { type: String },
    comment: { type: String },
    star: { type: Number },
  },
  {
    timestamps: true,
  }
);

const repliedCommentProductSchema = new mongoose.Schema({
  content: { type: String },
  isAdmin: Boolean,
  nameUser: { type: String },
  byUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const commentProductSchema = new mongoose.Schema({
  author: { type: String },
  status: String,
  isAdmin: Boolean,
  avatar: { type: String },
  content: { type: String },
  byUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  replies: [repliedCommentProductSchema],
});

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    salePrice: { type: Number, required: true },
    type: { type: String, required: true },
    amount: { type: Number },
    image: { type: String },
    cloudinary_id: { type: String },

    rating: { type: Number },
    numReviews: { type: Number },
    blog: { type: String },
    reviews: [reviewProductSchema],
    comments: [commentProductSchema],

    os: String,
    ram: String,
    battery: String,
    rom: String,
    camera: String,
    special: String,
    design: String,
    screen: String,
  },
  {
    timestamps: true,
  }
);

const ProductModel = mongoose.model("Product", productSchema);

module.exports = ProductModel;
