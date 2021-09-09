const express = require('express');
const router = new express.Router();

const autenticacion = require('../controllers/autenticacion');
const medicion = require('../controllers/medicion');

//AUTENTICACION
router.route('/login').post(autenticacion.iniciarSesion)
router.route('/registro').post(autenticacion.registrarUsuario)

//MEDICIONES
router.route('/medicion/nueva').post(medicion.registrarMedicion)
router.route('/medicion/finalizar').post(medicion.finalizarMedicion)

module.exports = router