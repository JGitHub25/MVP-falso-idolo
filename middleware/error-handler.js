const { CustomAPIError } = require("../errors");
const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    //Con este CustomError ya no se necesitaría ver si el error
    //es instanceof CustomAPIError.
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong. Please try again.",
  };

  // if (err instanceof CustomAPIError) {
  //   return res.status(err.statusCode).json({ msg: err.message });
  // }
  if (err.name === "ValidationError") {
    //Validation error.
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
    customError.statusCode = 400;
  }

  if (err.code && err.code === 11000) {
    //Duplication error.
    customError.msg = `The ${Object.keys(
      err.keyValue
    )} provided already exists.`;
    customError.statusCode = 400;
  }

  if (err.name === "CastError") {
    //Cast error.
    customError.msg = `No item with id ${err.value} found.`;
    customError.statusCode = 404;
  }
  return res.status(customError.statusCode).json({ message: customError.msg });
};

module.exports = errorHandlerMiddleware;
