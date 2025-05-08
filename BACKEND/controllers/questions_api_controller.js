//-----------IMPORTACIONES-----------//
const mongoose = require('mongoose');
const Question = require('../models/question.js');

//-----------FUNCIONES CRUD-----------//
function getNewQuestion(req, res) {
    res.status(200).json({
        _id : "ewiqnfp23ogpqgkm2pek2134",
        question: "¿Cuál es el nombre completo del creador de Bob Esponja?",
        options: ["Stephen Hillenburg", "Steven Spielberg", "Tom Kenny", "Derek Drymon"],
        rightAnswerIndex: 0,
        topic: "bob_esponja",
        __v: 0
    });
}

//-----------EXPORTACIONES-----------//
module.exports = {getNewQuestion}