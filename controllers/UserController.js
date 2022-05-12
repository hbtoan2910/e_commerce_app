const UserModel = require("../models/UserModel");
const generateToken = require("../config/utils/util");

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

const login = async (req, res) => {
  //if filter (of findOne) is {email: xxx, password: yyy}, it only checks email, not password
  const user = await UserModel.findOne({
    email: req.body.email,
  });
  if (user) {
    if (user.password == req.body.password) {
      res.send({
        id: user._id,
        name: user.name,
        email: user.email,
        password: user.password,
        address: user.address,
        phone: user.phone,
        token: generateToken(user),
      });
    } else {
      res.status(401).send({ message: "Invalid email or password." });
    }
  } else {
    res.status(401).send({ message: "Invalid email or password." });
  }
};

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
  login,
  getAllUser,
  updateUser,
  deleteUser,
};
