//-----------IMPORTACIONES-----------//
const express = require('express');
const { getNewQuestion,
        getQuestionByID,
        saveNewQuestion} = require('../controllers/questions_api_controller');

//-----------CONFIGURACIÓN DE DEPENDENCIAS-----------//
const routerQuestions = express.Router();

//-----------RUTAS PRINCIPALES-----------//
routerQuestions.get('/new/:topic', getNewQuestion);
routerQuestions.get('/byID/:id', getQuestionByID);
routerQuestions.post('/', saveNewQuestion);

//-----------EXPORTACIONES-----------//
module.exports = {routerQuestions};