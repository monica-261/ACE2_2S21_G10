const express = require('express');
const router = new express.Router();

const medicion = require('../controllers/medicion');

router.route('/medicion').post(medicion.medicion)

router.route('/tiempoSentadoTotal').get(medicion.tiempoSentadoTotal)
router.route('/tiempoSentadoActual').get(medicion.tiempoSentadoActual)
router.route('/pesoHistorico').get(medicion.pesoHistorico)
router.route('/pesoActualPromedio').get(medicion.pesoActualPromedio)
router.route('/horariosDeUso').get(medicion.horariosDeUso)
router.route('/cantidadLevantadoPorDia').get(medicion.cantidadLevantadoPorDia)
router.route('/distanciaDelRespaldoPromedioActual').get(medicion.distanciaDelRespaldoPromedioActual)
router.route('/distanciaDelRespaldoActual').get(medicion.distanciaDelRespaldoActual)
router.route('/distanciaDelRespaldoPromedioHistorico').get(medicion.distanciaDelRespaldoPromedioHistorico)
router.route('/distanciaDelRespaldoHistorico').get(medicion.distanciaDelRespaldoHistorico)
router.route('/cantidadPosturasIncorrectasPorMinuto').get(medicion.cantidadPosturasIncorrectasPorMinuto)
router.route('/cantidadPosturasIncorrectasPorHora').get(medicion.cantidadPosturasIncorrectasPorHora)
router.route('/cantidadPosturasIncorrectasPorDia').get(medicion.cantidadPosturasIncorrectasPorDia)

module.exports = router