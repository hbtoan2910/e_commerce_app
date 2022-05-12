const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    salePrice: { type: Number, required: true },
    type: { type: String, required: true },
    image: { type: String }, // image type String ???
    amount: { type: Number },
    cloudinary_id: { type: String },

    rating: { type: Number },
    numReviews: { type: Number },
    blog: { type: String },

    reviews: [reviewProduct],
    comments: [commentProduct],

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
