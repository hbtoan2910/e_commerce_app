const ProductModel = require("../models/ProductModel");
const cloudinary = require("cloudinary").v2;
const { data } = require("../data");
const { PinComment } = require("../utils/utils.js");

const getAllProduct = async (req, res) => {
  const products = await ProductModel.find({});
  res.send(products);
  console.log("All products retrieved.");
};

const findProductById = async (req, res) => {
  const product = await ProductModel.findById({_id: req.params.id});
    
  if(product){
      res.send(product);
  }else{
      res.send({message: 'Product not found'});
  }
};

const filterProductByType = async (req, res) => {
  const filterProductByType = await ProductModel.find({type: req.params.type}).limit(5);
    res.send(filterProductByType);
}
//need to check logic again !!!
const filterProductByRandomField = async (req, res) => {
  //console.log(req.body);
  const products = await ProductModel.find(req.body);
  if (products) {
      res.send(products);
  } else {
      res.send({message: 'Product not found'});
  }
} 

const addProduct = async (req, res) => {
  cloudinary.config({
    //need to use env file to increase security !!!
    cloud_name: "hbtoan29101985",
    api_key: "644395972175867",
    api_secret: "24gqdfulqxroVYrFRhb0qXFhhug",
  });

  const result = await cloudinary.uploader.upload(req.file.path);

  const product = new ProductModel({
    name: req.body.name,
    price: req.body.price,
    salePrice: req.body.salePrice,
    amount: req.body.amount,
    type: req.body.type,
    image: result.secure_url,
    cloudinary_id: result.public_id,
    rating: 0,

    //Optional data !!!
    os: req.body.os,
    ram: req.body.ram,
    battery: req.body.battery,
    rom: req.body.rom,
    camera: req.body.camera,
    special: req.body.special,
    design: req.body.design,
    screen: req.body.screen,
  });

  const newProduct = await product.save();

  if (newProduct)
    return res
      .status(200)
      .send({ message: "New product is created.", data: newProduct });
  res.send("Error occured when creating new product.");
};

const updateProduct = async (req, res) => {
  //console.log("update: ", req.body);
  const product = await ProductModel.findById(req.body._id);

  await cloudinary.uploader.destroy(product.cloudinary_id);

  let result;
  if (req.file) {
    result = await cloudinary.uploader.upload(req.file.path);
    console.log(result);
  }

  if (product) {
    product.name = req.body.name;
    product.amount = req.body.amount;
    product.price = req.body.price;
    product.salePrice = req.body.salePrice;
    product.type = req.body.type;
    product.image = result?.secure_url || product.image;
    product.rating = 0;
    product.cloulinary_id = result?.public_id || product.cloudinary_id;

    product.os = req.body.os;
    product.ram = req.body.ram;
    product.battery = req.body.battery;
    product.rom = req.body.rom;
    product.camera = req.body.camera;
    product.special = req.body.special;
    product.design = req.body.design;
    product.screen = req.body.screen;

    const updateProduct = await product.save();
    if (updateProduct) {
      res.send("Product is updated successfully.");
    }
  }

  return res.send("Update failed.");
};

const deleteProduct = async (req, res) => {
  const deleteProduct = await ProductModel.findById(req.params.id)

    await cloudinary.uploader.destroy(deleteProduct.cloudinary_id);

    if (deleteProduct) {
        await deleteProduct.remove();
        //console.log('delete')
        res.send({message: 'Product is deleted.'})
    } else {
        //console.log('error occured in deleting product');
        res.send('Error occured in deleting product');
    }
};

const searchProduct = async (req, res) => {
  const name = req.query.name;
  const product = await ProductModel.find({name: {$regex: name, $options: '$i'}});
  
  (product.length > 0) ? res.send(product) : res.send({message: 'Product not found.'});
};

const paginationProduct = async (req, res) => {
  var perPage = 4;
  var page = req.params.page || 1;
  ProductModel
      .find({})
      .skip((perPage * page) - perPage)
      .limit(perPage)
      .exec(function(err, products) {
          ProductModel.countDocuments().exec(function(err, count) {
              if (err) return next(err);
              res.send({
                  products: products,
                  current: page,
                  pages: Math.ceil(count / perPage)
              })
          })
      })
}

const rateProduct = async (req, res) => {
  const product = await ProductModel.findById(req.params.id);
    if (product) {
        const existsUser = product.reviews.find(x => x.name === req.body.name)
        //console.log(existsUser);
        if (existsUser) {
            res.send({message: 'You had reviewed this product.'})
        } else {
            product.reviews.push(req.body);
            const updateProduct = await product.save();
            res.send(updateProduct);
        }
        
    } else {
        res.status(400).send({message: 'Product not found'});
    }
}

const commentProduct = async (req, res) => {
  //console.log(req.body)
    const product = await ProductModel.findById(req.params.id);
    if (product) {
        product.comments.push(req.body);
        const updateCommentProduct = await product.save();
        res.send(updateCommentProduct);
    } else {
        res.status(400).send({message: 'Product not found.'});
    }
}

const repCommentProduct = async (req, res) => {
  const product = await ProductModel.findById(req.params.id);
  if (product) {
      const indexComment = product.comments.findIndex(item => item._id == req.body.idComment);
      product.comments[indexComment].replies.push(req.body);

      await product.save();
      res.send(product);
  } else {
      res.status(400).send({message: 'Product not found.'});
  }
}

const pinCommentProduct = async (req, res) => {
  //console.log(req.body, req.params.id);
  const product = await ProductModel.findById(req.params.id);
  if (product) {
      const indexComment = product.comments.findIndex(item => item._id == req.body.idComment)
      product.comments[indexComment] = req.body;
      PinComment(product.comments, indexComment, 0);

      await product.save();
      res.send(product);
  }else{
      res.status(400).send({message: 'Product not found.'});
  }
}

const blogProduct = async (req, res) => {
  //console.log(req.body.blogContent);
  const product = await ProductModel.findById({_id: req.params.id});
  
  if (product) {
      product.blog = req.body.blogContent;
      await product.save();
      res.send(product);
  } else {
      res.send({message: 'Product not found'});
  }
}
module.exports = {
  getAllProduct,
  findProductById,
  filterProductByType,
  filterProductByRandomField,
  addProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
  paginationProduct,
  rateProduct,
  commentProduct,
  repCommentProduct,
  pinCommentProduct,
  blogProduct
};
