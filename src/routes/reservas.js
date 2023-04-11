const { Router } = require("express");
const { check } = require("express-validator");
const {
  obtenerReservas,
  crearReserva,
} = require("../controllers/reservas");
const { validarCampos } = require("../middlewares/validar-campos");

const {
  existeRestaurantePorId,
  validarLimiteReservas,
} = require("../helpers/db-validators");
const { validarFecha } = require("../middlewares/validar-fecha");

const router = Router();

/**
 * {{url}}/api/reservas
 */

//  Obtener todas las reservas
router.get("/", obtenerReservas);

// Crear reserva
router.post(
  "/",
  [
    check("fecha", "La fecha es obligatoria").not().isEmpty(),
    check("fecha").custom(validarFecha),
    check("fecha").custom(validarLimiteReservas),
    check("restaurante", "No es un id de Mongo válido").isMongoId(),
    check("restaurante").custom(existeRestaurantePorId),
    validarCampos,
  ],
  crearReserva
);

module.exports = router;
