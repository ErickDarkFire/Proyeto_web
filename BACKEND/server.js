// IMPORTACIONES //
const express = require('express');
const mongoose = require('mongoose');
const chalk = require('chalk');
const routerApi = require('./routes/api.js');
const dye = chalk.default;

// CREDENCIALES //
const mongoConnection = "mongodb+srv://diegogomezm:1QoAVlGjucuDovJ4@triviaverso.jvgmq0l.mongodb.net/";

// CONFIGURACIÓN DE DEPENDENCIAS //
const app = express();
const port = 3000;
const db = mongoose.connection;
db.on(`connecting`, () => {
    console.log(dye.yellow(`Conectando...`));
});
db.on(`connected`, () => {
    console.log(dye.greenBright(`¡Conectado exitosamente!`));
    app.listen(port, () => {
        console.log(dye.underline.blackBright(`Proyecto corriendo en el puerto ${port}!`));
    });
});
dye.level = 2;

// MIDDLEWARE //
app.use(express.static('../FRONTEND'));
app.use(express.json());
app.use(routerApi);

// CONEXIÓN //
mongoose.connect(mongoConnection);



