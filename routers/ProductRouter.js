const express = require("express");
const ProductRouter = express.Router();
const {
  getAllProduct,
  filterProductByType,
  findProductById,
  addProduct,
  deleteProduct,
  commentProduct,
  updateProduct,
  searchProduct,
  paginationProduct,
  rateProduct,
  repCommentProduct,
  blogProduct,
  pinCommentProduct,
  filterProductByRandomField,
} = require("../controllers/ProductController");
const { isAdmin, isAuthenticated, upload } = require("../config/utils/util");

ProductRouter.get("/:type", filterProductByType);
ProductRouter.post("/filter/random", filterProductByRandomField);
ProductRouter.get("/detail/:id", findProductById);
ProductRouter.get("/", getAllProduct);
ProductRouter.get(`/pagination/:page`, paginationProduct);

ProductRouter.post("/rate/:id", rateProduct);
ProductRouter.post("/comment/:id", commentProduct);
ProductRouter.post("/pin/comment/:id", pinCommentProduct);
ProductRouter.post("/rep/comment/:id", repCommentProduct);

ProductRouter.post(
  "/create",
  isAuthenticated,
  isAdmin,
  upload.single("image"),
  addProduct
);
ProductRouter.put(
  "/update",
  isAuthenticated,
  isAdmin,
  upload.single("image"),
  updateProduct
);
ProductRouter.post(
  "/blog/:id",
  isAuth,
  isAdmin,
  blogProduct
);
ProductRouter.delete(
  "/delete/:id",
  isAuthenticated,
  isAdmin,
  upload.single("image"),
  deleteProduct
);
ProductRouter.get('/search/product', searchProduct)

module.exports = ProductRouter;
