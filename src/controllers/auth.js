const User = require("../models/user");
const { generateToken } = require("../utils/jwt");

async function loginUser(req, res) {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if ( !existingUser ) {
    return res.status(400).json("Invalid email or password");
  }

  if ( !(await existingUser.validatePassword(password)) ) {
    return res.status(400).json("Invalid email or password");
  }
  const token = generateToken(existingUser._id, existingUser.userType);

  return res.json({ email, token });
}

module.exports = {
  loginUser
};