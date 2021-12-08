const UserModel = require("../models/User");
const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const authUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("No token with the correct format.");
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { userId: payload.userId, name: payload.name };
    //Otra forma de hacerlo en vez de la de arriba es:
    // const user = UserModel.findById(payload.id).select("-password");
    // req.user = user;
    next();
  } catch (error) {
    throw new UnauthenticatedError("Token verification failed.");
  }
};

module.exports = authUser;
