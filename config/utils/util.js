const jwt = require("jsonwebtoken");
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

module.exports = {
  generateToken,
  isAuthenticated,
  isAdmin,
};
