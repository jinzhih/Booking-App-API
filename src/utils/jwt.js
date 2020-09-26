const jwt = require("jsonwebtoken");

function generateToken(id, userType) {
  //TODO change "secret" to ENV 
  const token = jwt.sign({ id, userType }, process.env.JWT_KEY, {
    expiresIn: "1h"
  });
  return token;
}

function validateToken(token) {
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_KEY);
  } catch (e) {
    return null;
  }
  return decoded;
}

module.exports = {
  generateToken,
  validateToken
};