const jwt = require("jsonwebtoken");

exports.signAccessToken = (userId) => {
  return new Promise((resolve, reject) => {
    console.log(process.env.JWT_SECRET);
    jwt.sign(
      { userId },
      process.env.JWT_SECRET,
      { expiresIn: "1h", issuer: "petpapa.com " },
      (err, token) => {
        if (err) return reject(err);
        else resolve(token);
      }
    );
  });
};
