// IMPORTACIONES //
const express = require('express');
const mongoose = require('mongoose');
const chalk = require('chalk');

// CREDENCIALES //
const mongoConnection = "mongodb+srv://diegogomezm:1QoAVlGjucuDovJ4@triviaverso.jvgmq0l.mongodb.net/";


// CONFIGURACIÓN DE DEPENDENCIAS //
const app = express();
const db = mongoose.connection;
db.on(`connecting`, () => {
    console.log(chalk.yellow(`Conectando...`));
    console.log(chalk.yellow(mongoose.connection.readyState));
});
db.on(`connected`, () => {
    console.log(chalk.greenBright(`¡Conectado exitosamente!`));
    console.log(chalk.greenBright(mongoose.connection.readyState));
});

// CONEXIÓN //
mongoose.connect(mongoConnection);




