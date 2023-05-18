const jwt = require("jsonwebtoken");
const User = require("../model/UserModel");
require("dotenv").config();

const asyncWrapper = require("../utils/asyncWrapper");

exports.protectRoute = async (req, res, next) => {
  let token;

  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select([
        "_id",
        "name",
        "email",
      ]);
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401);
    next(error);
  }
  if (!token) next(new Error("No Token, Not Authorised"));
};
