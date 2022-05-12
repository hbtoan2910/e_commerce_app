const jwt = require("jsonwebtoken");
const token_secret = process.env.TokenSecret || "toanhuynhdepchai";

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

module.exports = generateToken;