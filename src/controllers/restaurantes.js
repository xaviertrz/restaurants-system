const { response } = require("express");
const { ObjectId } = require("mongoose").Types;

const Restaurante = require("../models/restaurante");
const Reserva = require("../models/reserva");

const obtenerRestaurantes = async (req, res = response) => {
  const query = { estado: true };

  const [total, restaurantes] = await Promise.all([
    Restaurante.countDocuments(query),
    Restaurante.find(query),
  ]);

  res.json({
    total,
    restaurantes,
  });
};

const filtrarRestaurantes = async (req, res = response) => {
  const { termino } = req.params;
  const esMongoID = ObjectId.isValid(termino);

  if (esMongoID) {
    const restaurante = await Restaurante.findById(termino);
    return res.json({
      results: restaurante ? [restaurante] : [],
    });
  }

  const regex = new RegExp(termino, "i");
  const restaurantes = await Restaurante.find({
    $or: [{ nombre: regex }, { ciudad: regex }],
    $and: [{ estado: true }],
  });

  res.json({
    results: restaurantes,
  });
};

const crearRestaurante = async (req, res = response) => {
  const { nombre, ...body } = req.body;
  const query = {
    nombre: nombre.toUpperCase(),
    estado: true,
  };

  const restauranteDB = await Restaurante.findOne(query);

  if (restauranteDB) {
    return res.status(400).json({
      msg: `El restaurante "${nombre}" ya existe`,
    });
  }

  // Generar la data a guardar
  const data = {
    nombre: nombre.toUpperCase(),
    ...body,
  };

  const restaurante = new Restaurante(data);

  // Guardar DB
  await restaurante.save();

  res.status(201).json(restaurante);
};

const actualizarRestaurante = async (req, res = response) => {
  const { id } = req.params;
  const { estado, ...data } = req.body;

  if (data.nombre) {
    data.nombre = data.nombre.toUpperCase();
  }

  const restaurante = await Restaurante.findByIdAndUpdate(id, data, {
    new: true,
  });

  res.json(restaurante);
};

const borrarRestaurante = async (req, res = response) => {
  const { id } = req.params;

  const reservasBorradas = await Reserva.find({ restaurante: id });
  reservasBorradas.forEach(async ({ _id }) => {
    await Reserva.findByIdAndDelete(_id);
  });
  
  const restauranteBorrado = await Restaurante.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );

  res.json({
    restauranteBorrado,
    reservasBorradas,
  });
};

module.exports = {
  obtenerRestaurantes,
  filtrarRestaurantes,
  crearRestaurante,
  actualizarRestaurante,
  borrarRestaurante,
};
