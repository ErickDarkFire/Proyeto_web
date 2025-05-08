//-----------IMPORTACIONES-----------//
const express = require('express');
const {getTopUsers} = require('../controllers/users_api_controller.js');

//-----------CONFIGURACIÓN DE DEPENDENCIAS-----------//
const routerRanks = express.Router();

//-----------RUTAS RANKED-----------//
routerRanks.get('/', getTopUsers);


//-----------EXPORTACIONES-----------//
module.exports = {routerRanks};