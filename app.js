//Packages imports.
const express = require("express");
const dotenv = require("dotenv").config();
require("express-async-errors");
const { StatusCodes } = require("http-status-codes");

//Security packages.
const rateLimiter = require("express-rate-limit");
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");

//db
const connectDB = require("./db/connect");

//APP
const app = express();

//Router
const fonoRouter = require("./routes/fonoRoutes");

//JSON
app.use(express.json());

//Security packages.
app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

//TEST ROUTE.
// app.get("/", (req, res) => {
//   res.status(StatusCodes.OK).send("This works.");
// });

//ROUTING
app.use("/api/v1/fonogramas", fonoRouter);

//error and notFound middleware.
const errorHandlerMiddleware = require("./middleware/error-handler");
const notFoundMiddleware = require("./middleware/not-found");

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(
        `***____________APP in |${process.env.NODE_ENV}| stage____________***`
      );
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

//START THE APP.
start();
