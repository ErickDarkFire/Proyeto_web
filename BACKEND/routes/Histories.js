//-----------IMPORTACIONES-----------//
const express = require('express');
const {getUserHistory, addUserHistory} = require('../controllers/users_api_controller.js');

//-----------CONFIGURACIÓN DE DEPENDENCIAS-----------//
const routerHistories = express.Router();

//-----------RUTAS USER HISTORY-----------//
routerHistories.post('/:id', addUserHistory);
routerHistories.get('/:id', getUserHistory);

//-----------EXPORTACIONES-----------//
module.exports = {routerHistories};