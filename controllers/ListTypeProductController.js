const cloudinary = require("cloudinary").v2
const { ListTypeProductModel } = require("../models/ListTypeProductModel.js")

const getAllTypeProduct = async (req, res) => {
    console.log('get all type');
    const allType = await ListTypeProductModel.find({});
    console.log(allType);
    res.send(allType);
};

const createNewTypeProduct = async (req, res) => {
    console.log('create type product')
    const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "dev_setups",
      });
    //console.log(result);
    const newType = new ListTypeProductModel({
        name: req.body.name,
        img: result.secure_url,
        cloudinary_id: result.public_id,
    }) 

    await newType.save();
    res.send(newType);
};

const deleteTypeProduct = async (req, res) => {
    const typeProduct = await ListTypeProductModel.findById({_id: req.params.id});

    await cloudinary.uploader.destroy(typeProduct.cloudinary_id);

    if (typeProduct) {
        await typeProduct.remove();
        res.send({msg: 'deleted type product'});
    } else {
        res.send({msg: 'product not found'});
    }

};

module.exports = {
    getAllTypeProduct,
    createNewTypeProduct,
    deleteTypeProduct
}