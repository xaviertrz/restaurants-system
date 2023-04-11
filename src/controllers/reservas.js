const { response } = require("express");
const Restaurante = require("../models/restaurante");
const Reserva = require("../models/reserva");

const obtenerReservas = async (req, res = response) => {
  const [total, reservas] = await Promise.all([
    Reserva.countDocuments(),
    Reserva.find().populate("restaurante", "nombre"),
  ]);

  res.json({
    total,
    reservas,
  });
};

const crearReserva = async (req, res = response) => {
  const { fecha, restaurante } = req.body;
  const fechaFormateada = fecha.replace(/\b0/g, "");
  console.log(fecha, fechaFormateada);

  const [totalReservas, { nombre, mesas }] = await Promise.all([
    Reserva.countDocuments({
      $and: [{ fecha: fechaFormateada }, { restaurante }],
    }),
    Restaurante.findById(restaurante),
  ]);

  const mesa = totalReservas + 1;
  const existeReserva = await Reserva.findOne({
    $and: [{ mesa }, { fecha }, { restaurante }],
  });

  if (totalReservas >= mesas) {
    return res.status(400).json({
      msg: `No hay mesas disponibles en el restaurante ${nombre} para la fecha ${fechaFormateada}`,
    });
  }

  if (existeReserva) {
    return res.status(400).json({
      msg: `Error: La mesa ${mesa} ya está reservada para la fecha ${fecha}.`,
    });
  }

  const reserva = new Reserva({ mesa, fecha: fechaFormateada, restaurante });

  // Guardar DB
  await reserva.save();

  res.status(201).json({
    msg: `Se le reservó la mesa ${mesa} para la fecha indicada.`,
    reserva,
  });
};

module.exports = {
  obtenerReservas,
  crearReserva,
};
