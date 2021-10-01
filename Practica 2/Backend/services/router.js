const express = require('express');
const router = new express.Router();

const medicion = require('../controllers/medicion');

//AUTENTICACION
router.route('/medicion').post(medicion.registrarMedicion)
router.route('/obtenerVelocidadViento').get(medicion.obtenerVelocidadViento)
router.route('/obtenerHumedad').get(medicion.obtenerHumedad)
router.route('/obtenerTemperatura').get(medicion.obtenerTemperatura)
router.route('/obtenerLuz').get(medicion.obtenerLuz)
router.route('/obtenerDireccionViento').get(medicion.obtenerDireccionViento)

module.exports = router