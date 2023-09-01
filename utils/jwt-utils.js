const jwt = require("jsonwebtoken");

const secretKey = process.env.JWT_SIGN; 

const generateToken = (user_id, username, role) => {
  const payload = {
    user_id,
    username,
    role,
  };
  const options = {
    expiresIn: "1h",
  };
  return jwt.sign(payload, secretKey, options);
};

module.exports = generateToken