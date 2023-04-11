const { Schema, model } = require("mongoose");

const RestauranteSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  descripcion: {
    type: String,
  },
  direccion: {
    type: String,
    required: [true, "La dirección es obligatoria"],
  },
  ciudad: {
    type: String,
    required: [true, "La ciudad es obligatoria"],
  },
  mesas: {
    type: Number,
    default: 15,
  },
  estado: {
    type: Boolean,
    default: true,
  },
  foto: {
    type: String,
  },
});

RestauranteSchema.methods.toJSON = function () {
  const { __v, estado, ...data } = this.toObject();
  return data;
};

module.exports = model("Restaurante", RestauranteSchema);
