//-----------IMPORTACIONES-----------//
const express = require('express');
const path = require('path');
const routerApi = express.Router();
const {routerUsers} = require('./Users.js');
const {routerQuestions} = require('./Questions.js');
const {routerRanks} = require('./Ranks.js');
const {routerHistories} = require('./Histories.js');
const {login} = require('../controllers/users_api_controller.js');

//-----------CONFIGURACIÓN DE DEPENDENCIAS-----------//
const app = express();

//-----------RUTAS EXTERNAS-----------//
routerApi.use('/users', routerUsers);
routerApi.use('/questions', routerQuestions);
routerApi.use('/rank', routerRanks);
routerApi.use('/histories', routerHistories);

//-----------RUTAS PRINCIPALES-----------//
routerApi.post('/login', login);
routerApi.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/../../FRONTEND/views/Home.html'));
});
routerApi.get('/home.html', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/../../FRONTEND/views/Home.html'));
})
routerApi.get('/EditProfile.html', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/../../FRONTEND/views/EditProfile.html'));
})
routerApi.get('/leaderboard.html', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/../../FRONTEND/views/leaderboard.html'));
})
routerApi.get('/login.html', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/../../FRONTEND/views/login.html'));
})
routerApi.get('/Multiplayer.html', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/../../FRONTEND/views/Multiplayer.html'));
})
routerApi.get('/Pregunta.html', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/../../FRONTEND/views/Pregunta.html'));
})
routerApi.get('/Profile.html', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/../../FRONTEND/views/Profile.html'));
})
routerApi.get('/Ruleta.html', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/../../FRONTEND/views/Ruleta.html'));
})
routerApi.get('/TerminosYCondiciones.html', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/../../FRONTEND/views/TerminosYCondiciones.html'));
})

//-----------EXPORTACIONES-----------//
module.exports = routerApi