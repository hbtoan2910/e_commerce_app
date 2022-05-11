const UserModel = require("../models/UserModel");

const registerUser = async (req, res) => {
  const user = new UserModel({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    address: req.body.address,
    phone: req.body.phone,
    isAdmin: false,
  });
  const result = await user.save();
  res.send(result);
};

const getAllUser = async (req, res) => {
  const result = await UserModel.find();
  res.send(result);
};

const login = (req, res) => {
    
}

const updateUser = async (req, res) => {
  //Find then Save
  /*     const user = await UserModel.findById(req.params.id);
    user.set({
        name: req.body.name,
        password: req.body.password,
        address: req.body.address,
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
    })
    const result = await user.save();
    res.send(result);
    console.log(result); */

  //Find and update at same time
  const newData = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    address: req.body.address,
    phone: req.body.phone,
    isAdmin: req.body.isAdmin,
  };
  //if only update 1 field, others will remain the same
  const oldData = await UserModel.findByIdAndUpdate(
    { _id: req.params.id },
    newData
  );
  res.send({ oldData, newData });
};

const deleteUser = async (req, res) => {
  const result = await UserModel.findByIdAndDelete({ _id: req.params.id });
  res.send(`This user had been deleted: \n ${result}`);
};

module.exports = {
  registerUser,
  getAllUser,
  updateUser,
  deleteUser,
};
