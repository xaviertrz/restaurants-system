const { Router } = require("express");
const { check } = require("express-validator");
const {
  crearRestaurante,
  borrarRestaurante,
  obtenerRestaurantes,
  filtrarRestaurantes,
  actualizarRestaurante,
} = require("../controllers/restaurantes");
const { validarCampos } = require("../middlewares/validar-campos");
const { existeRestaurantePorId } = require("../helpers/db-validators");

const router = Router();

/**
 * {{url}}/api/restaurantes
 */

//  Obtener todos los restaurantes
router.get("/", obtenerRestaurantes);

// Obtener un restaurante por id, nombre o ciudad
router.get("/:termino", filtrarRestaurantes);

// Crear restaurante
router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("direccion", "La dirección es obligatoria").not().isEmpty(),
    check("ciudad", "La ciudad es obligatoria").not().isEmpty(),
    validarCampos,
  ],
  crearRestaurante
);

// Actualizar restaurante
router.put(
  "/:id",
  [
    check("id", "No es un id de Mongo válido").isMongoId(),
    check("id").custom(existeRestaurantePorId),
    validarCampos,
  ],
  actualizarRestaurante
);

// Borrar restaurante
router.delete(
  "/:id",
  [
    check("id", "No es un id de Mongo válido").isMongoId(),
    check("id").custom(existeRestaurantePorId),
    validarCampos,
  ],
  borrarRestaurante
);

module.exports = router;
