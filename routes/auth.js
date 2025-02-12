/**
 * Rutas de Usuarios / Auth
 * host + /api/auth
 */

const { check } = require("express-validator");
const {
  crearUsuario,
  logUsuario,
  renovarUsuario,
} = require("../controllers/auth");
const express = require("express");
const router = express.Router();
const { valdarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

router.post(
  "/",
  [
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password debe tener al menos 6 caracteres").isLength({
      min: 6,
    }),
    valdarCampos,
  ],
  logUsuario
);

router.post(
  "/new",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password debe tener al menos 6 caracteres").isLength({
      min: 6,
    }),
    valdarCampos,
  ],
  crearUsuario
);

router.get("/renew", validarJWT, renovarUsuario);

module.exports = router;
