const express = require('express');
const router = new express.Router();

const medicion = require('../controllers/medicion');

//AUTENTICACION
router.route('/medicion').post(medicion.registrarMedicion)

module.exports = router