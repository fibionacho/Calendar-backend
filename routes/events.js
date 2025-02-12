// Event routes
// /api/events
const { Router } = require("express");
const {
  getEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
} = require("../controllers/events");
const { validarJWT } = require("../middlewares/validar-jwt");
const { check } = require("express-validator");
const router = Router();
const { valdarCampos } = require("../middlewares/validar-campos");
const { isDate } = require("../helpers/isDate");
//todas tienen que pasar la validacion del JWT
//Obtener eventos
router.use(validarJWT);

router.get("/", getEventos);

//Crear un nuevo evento

router.post(
  "/",
  [
    check("title", "El titulo es obligatorio").not().isEmpty(),
    check("start", "Fecha de inicio es obligatoria").custom(isDate),
    check("end", "Fecha de finalizacion es obligatoria").custom(isDate),
    valdarCampos,
  ],
  crearEvento
);

//Actualizar evento
router.put("/:id", actualizarEvento);

//Borrar evento
router.delete("/:id", eliminarEvento);

module.exports = router;
