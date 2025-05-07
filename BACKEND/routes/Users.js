//-----------IMPORTACIONES-----------//
const express = require('express');

//-----------CONFIGURACIÓN DE DEPENDENCIAS-----------//
const routerUsers = express.Router();

//-----------RUTAS PRINCIPALES-----------//
routerUsers.post('/', (req, res) => {
    res.status(501).send('Not implemented.');
})

//-----------EXPORTACIONES-----------//
module.exports = {routerUsers};