const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");

const token_secret = process.env.TokenSecret || "toanhuynhdepchai";

//use jwt to create token, when user sign in properly, token is generated
//when user access specific endpoints which need authorization, they need to add token to header of the requesta
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      address: user.address,
      isAdmin: user.isAdmin,
    },
    token_secret,
    { expiresIn: "30d" }
  );
};

const isAuthenticated = (req, res, next) => {
  //check if request with or without token in request's header
  //400 - Bad request (come from user's side)
  //401 - Unauthorized
  //403 - Forbidden (user's identity is known to the server but not enough access rights)
  //404 - request resource not found by server
  //x-auth-token is a customed field which need user input using Postman before send request
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No token found.");

  const decoded = jwt.verify(token, token_secret);
  req.user = decoded;
  next();
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin == true) {
    next();
  } else {
    res.status(401).send("Permission denied. Admin authorization needed.");
  }
};
//Uploading image section
const storage = multer.diskStorage({
  /* uploading files to cloudinary, not in local computer disk
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  }, */ 
  filename: (res, file, cb) => {
    const fileName = file.originalname;
    cb(null, fileName + path.extname(fileName));
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if ( ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png" ) {
      cb(new Error("File is not supported"), false);
      return;
    }
    cb(null, true);
  }
})

const pinComment = async (arr, fromIndex, toIndex) => {
  var element = arr[fromIndex];
  arr.splice(fromIndex, 1);
  arr.splice(toIndex, 0, element);

  return arr;
};

module.exports = {
  generateToken,
  isAuthenticated,
  isAdmin,
  upload,
  pinComment
};
