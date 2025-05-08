//-----------IMPORTACIONES-----------//
const express = require('express');
const { createUser,
        getUserInfo,
        editUserInfo,
        deleteUser,
        getTopUsers} = require('../controllers/users_api_controller.js');

//-----------CONFIGURACIÓN DE DEPENDENCIAS-----------//
const routerUsers = express.Router();

//-----------RUTAS USERS-----------//
routerUsers.post('/', createUser);
routerUsers.get('/:id', getUserInfo);
routerUsers.patch('/:id', editUserInfo);
routerUsers.delete('/:id', deleteUser);

//-----------EXPORTACIONES-----------//
module.exports = {routerUsers};