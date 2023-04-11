const { Schema, model } = require("mongoose");

// fecha, mesa, restaurante
const ReservaSchema = Schema({
  mesa: {
    type: String,
    required: true,
  },
  fecha: {
    type: String,
    required: [true, "La fecha es obligatoria"],
  },
  restaurante: {
    type: Schema.Types.ObjectId,
    ref: "Restaurante",
    required: [true, "El restaurante es obligatorio"],
  },
});

ReservaSchema.methods.toJSON = function () {
  const { __v, ...data } = this.toObject();
  return data;
};

module.exports = model("Reserva", ReservaSchema);
