//-----------IMPORTACIONES-----------//
const express = require('express');
const {createUser, getUserInfo, editUserInfo} = require('../controllers/users_api_controller.js');

//-----------CONFIGURACIÓN DE DEPENDENCIAS-----------//
const routerUsers = express.Router();

//-----------RUTAS USERS-----------//
routerUsers.post('/', createUser);
routerUsers.get('/:id', getUserInfo);
routerUsers.patch('/:id', editUserInfo);
routerUsers.delete('/:id', (req, res) => {
    res.status(501).send('Not implemented.');
})
routerUsers.get('/rank', (req, res) => {
    res.status(501).send('Not implemented.');
})

//-----------RUTAS USER HISTORY-----------//
routerUsers.post('/users/:id/history', (req, res) => {
    res.status(501).send('Not implemented.');
})
routerUsers.get('/users/:id/history', (req, res) => {
    res.status(501).send('Not implemented.');
})

//-----------EXPORTACIONES-----------//
module.exports = {routerUsers};