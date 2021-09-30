const express = require('express');
const router = new express.Router();

const medicion = require('../controllers/medicion');

//AUTENTICACION
router.route('/medicion').post(medicion.registrarMedicion)
router.route('/obtenerVelocidadViento').post(medicion.obtenerVelocidadViento)
router.route('/obtenerHumedad').post(medicion.obtenerHumedad)
router.route('/obtenerTemperatura').post(medicion.obtenerTemperatura)
router.route('/obtenerLuz').post(medicion.obtenerLuz)
router.route('/obtenerDireccionViento').post(medicion.obtenerDireccionViento)

module.exports = router