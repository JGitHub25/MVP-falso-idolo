const mongoose = require("mongoose");

const SchemaFonograma = new mongoose.Schema(
  {
    artista: {
      type: String,
      required: [true, "Por favor ingrese un artista."],
    },
    cod_proy: {
      type: String,
      required: [true, "Por favor ingrese un código para el proyecto."],
    },
    album: {
      type: String,
      required: [true, "Por favor ingrese un álbum."],
    },
    nombre: {
      type: String,
      required: [true, "Por favor ingrese el nombre del fonograma(canción)."],
    },
    categoria: {
      type: String,
      enum: {
        values: ["Álbum", "EP", "Single"],
        message:
          "{VALUE} no es una opción válida. Por favor escoja: Álbum, EP o Single.",
      },
    },
    sayco: {
      type: Boolean,
      default: false,
    },
    acinpro: {
      type: Boolean,
      default: false,
    },
    imagen: {
      type: String,
      required: [true, "Por favor ingrese una imagen."],
    },
  },
  { timestamps: true }
);

const FonogramaModel = mongoose.model("Fonograma", SchemaFonograma);

module.exports = FonogramaModel;
