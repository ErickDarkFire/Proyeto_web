//-----------IMPORTACIONES-----------//
const express = require('express');

//-----------CONFIGURACIÓN DE DEPENDENCIAS-----------//
const routerQuestions = express.Router();

//-----------RUTAS PRINCIPALES-----------//
routerQuestions.post('/', (req, res) => {
    res.status(501).send('Not implemented.');
})

//-----------EXPORTACIONES-----------//
module.exports = {routerQuestions};