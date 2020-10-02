const jwt = require("jsonwebtoken");

function generateToken(id, userType) {
  //TODO change "secret" to ENV  process.env.JWT_KEY
  const token = jwt.sign({ id, userType }, "secret", {
    expiresIn: "1h"
  });
  return token;
}

function validateToken(token) {
  let decoded;
  try {
    decoded = jwt.verify(token, "secret");
  } catch (e) {
    return null;
  }
  return decoded;
}

module.exports = {
  generateToken,
  validateToken
};