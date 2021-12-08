const fonogramaData = require("./fonogramas.json");
const FonogramaModel = require("./models/SchemaFonograma");
require("dotenv").config();
const connectDB = require("./db/connect");

const populateDB = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await FonogramaModel.deleteMany();
    await FonogramaModel.create(fonogramaData);
    console.log("Success!!!!");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

populateDB();
