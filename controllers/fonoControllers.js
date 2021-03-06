const FonogramaModel = require("../models/SchemaFonograma");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../errors");

//GET all.
const getAllFono = async (req, res) => {
  const fonos = await FonogramaModel.find({}).sort("cod_proy");
  res.status(StatusCodes.OK).json({ count: fonos.length, fonos });
};

//GET some.
const getSomeFono = async (req, res) => {
  const { artista } = req.params;
  const fonos = await FonogramaModel.find({ artista });
  res.status(StatusCodes.OK).json({ count: fonos.length, fonos });
};

//GET one.
const getOneFono = async (req, res) => {
  const { id: fonoId } = req.params;
  const fono = await FonogramaModel.findOne({ _id: fonoId });
  if (!fono) {
    throw new NotFoundError(`No existe un fonograma con id: ${fonoId}`);
  }
  res.status(StatusCodes.OK).json({ fono });
};

//CREATE one.
const createFono = async (req, res) => {
  const fono = await FonogramaModel.create(req.body);
  res.status(StatusCodes.CREATED).json({ fono });
};

//UPDATE one.
const updateFono = async (req, res) => {
  const {
    body: { artista, cod_proy, album, nombre, categoria, sayco, acinpro },
    params: { id: fonoId },
  } = req;

  if (
    artista === "" &&
    cod_proy === "" &&
    album === "" &&
    nombre === "" &&
    categoria === "" &&
    sayco === undefined &&
    acinpro === undefined
  ) {
    throw new BadRequestError("Se debe ingresar al menos un dato a modificar.");
  }

  const fono = await FonogramaModel.findOneAndUpdate(
    { _id: fonoId },
    req.body,
    { new: true, runValidators: true }
  );

  if (!fono) {
    throw new NotFoundError(`No existe un fonograma con id: ${fonoId}`);
  }
  res.status(StatusCodes.OK).json({ fono });
};

//DELETE one.
const deleteFono = async (req, res) => {
  const { id: fonoId } = req.params;
  const fono = await FonogramaModel.findOneAndDelete({ _id: fonoId });
  if (!fono) {
    throw new NotFoundError(`No existe un fonograma con id: ${fonoId}`);
  }
  res.status(StatusCodes.OK).json({ fono });
};

//DELETE all.
const deleteAll = async (req, res) => {
  const { verif_code } = req.body;

  if (verif_code !== "Acepto borrar todos los datos.") {
    n;
    throw new BadRequestError(
      "Se debe ingresar el texto para autorizar la solicitud."
    );
  }

  const deletedCount = await FonogramaModel.deleteMany({});
  res
    .status(StatusCodes.OK)
    .json(`Se borraron ${deletedCount.deletedCount} fonogramas.`);
};

module.exports = {
  getAllFono,
  getSomeFono,
  getOneFono,
  createFono,
  updateFono,
  deleteFono,
  deleteAll,
};
