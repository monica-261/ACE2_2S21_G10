const express = require('express');
const router = new express.Router();

const medicion = require('../controllers/medicion');

//AUTENTICACION
router.route('/registrarInicio').post(medicion.registrarInicio)
router.route('/registrarFin').get(medicion.registrarFin)

module.exports = router