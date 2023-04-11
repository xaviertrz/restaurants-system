const Restaurante = require("../models/restaurante");
const Reserva = require("../models/reserva");

const existeRestaurantePorId = async (id) => {
  // Verificar si el restaurante existe y está activo
  const existeRestaurante = await Restaurante.findById(id);
  if (!existeRestaurante || !existeRestaurante.estado) {
    throw new Error(`El restaurante con id ${id} no existe.`);
  }
};

const validarLimiteReservas = async (fecha) => {
  const fechaFormateada = fecha.replace(/\b0/g, "");
  // No más de 20 reservas para el mismo día entre todos los restaurantes
  const limiteReservas = 20;
  const total = await Reserva.countDocuments({ fecha: fechaFormateada });

  if (total >= limiteReservas) {
    throw new Error(
      `No se pueden hacer más de ${limiteReservas} reservas para la fecha ${fechaFormateada}`
    );
  }
};

module.exports = {
  existeRestaurantePorId,
  validarLimiteReservas,
};
