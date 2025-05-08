//-----------IMPORTACIONES-----------//
const express = require('express');
const {getNewQuestion} = require('../controllers/questions_api_controller');

//-----------CONFIGURACIÓN DE DEPENDENCIAS-----------//
const routerQuestions = express.Router();

//-----------RUTAS PRINCIPALES-----------//
routerQuestions.get('/:topic', getNewQuestion)

//-----------EXPORTACIONES-----------//
module.exports = {routerQuestions};