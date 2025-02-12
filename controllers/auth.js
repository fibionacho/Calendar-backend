const express = require("express");
const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");

const crearUsuario = async (req, res = express.response) => {
  const { email, password } = req.body;
  try {
    let usuario = await Usuario.findOne({ email: email });

    if (usuario) {
      return res.status(400).json({
        ok: false,
        msg: "El usuario ya existe con ese email",
      });
    }

    usuario = new Usuario(req.body);

    // Encriptar contraseña

    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    await usuario.save();
    // Generar JWT
    const token = await generarJWT(usuario.id, usuario.name);

    res.status(201).json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

const logUsuario = async (req, res = express.response) => {
  const { email, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ email: email });

    if (!usuario) {
      return res.status(400).json({
        ok: false,
        msg: "Credenciales no válidas",
      });
    }

    // Confirmar los passwords
    const validPassword = bcrypt.compareSync(password, usuario.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Credenciales no válidas",
      });
    }

    // Generar JWT
    const token = await generarJWT(usuario.id, usuario.name);

    res.json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

const renovarUsuario = async (req, res = express.response) => {
  const uid = req.uid;
  const name = req.name;

  // Generar un nuevo JWT y retornarlo en esta petición
  const token = await generarJWT(uid, name);

  res.json({
    ok: true,
    msg: "renew",
    uid: uid,
    name: name,
    token:token
  });
};
module.exports = {
  crearUsuario,
  logUsuario,
  renovarUsuario,
};
