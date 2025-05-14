//-----------IMPORTACIONES-----------//
const mongoose = require('mongoose');
const openAI = require("openai")
const Question = require('../models/question.js');
const User = require("../models/user");
const {Mongoose} = require("mongoose");
const openAIClient = new openAI({apiKey:"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"});

//-----------FUNCIONES CRUD-----------//
function getNewQuestion(req, res) {
    if(!req.params.topic)
        return res.status(400).send({"Error": "Topic Not Provided"});
    openAIClient.responses.create({
        model: "gpt-4o-mini",
        input: `Para el tema "${req.params.topic}", genera una pregunta de opción múltiple en formato JSON. La pregunta debe ser clara y precisa, con 4 opciones de respuesta. Solo una de las opciones debe ser correcta. La salida debe ser únicamente un objeto JSON con las siguientes propiedades:
                question: una pregunta relacionada con el tema.
                options: un arreglo de 4 posibles respuestas. 
                rightAnswerIndex: el índice (0 a 3) de la respuesta correcta dentro del arreglo. 
                topic: el tema proporcionado. 
                La salida debe tener el siguiente formato exacto:{
                  "question": "Escribe aquí la pregunta",
                  "options": [
                    "Opción A",
                    "Opción B",
                    "Opción C",
                    "Opción D"
                  ],
                  "rightAnswerIndex": índice_de_la_respuesta_correcta,
                  "topic": "${req.params.topic}"
                }
                No proporciones explicaciones, comentarios, encabezados ni ningún texto adicional. Solo devuelve el JSON.`,
    }).then(response => {
        //console.log(response.output_text);
        let newQuestion = JSON.parse(response.output_text);
        let newQuestionMongoose = Question(newQuestion);
        newQuestionMongoose.save().then((newDoc) => {
            res.status(200).send(newDoc);
        }).catch((err) => {
            res.status(500).send({"Error": err.message});
        })
    }).catch((err) => {
        res.status(500).send({"Error": err.message});
    })
}

function getQuestionByID(req, res) {
    Question.findOne({
        _id: req.params.id
    }).then((response) => {
        if(response)
            res.status(200).send(response);
        else
            res.status(404).send({"Error": "Question not found."});
    }).catch((err) => {res.status(500).send({"Error": err.message})});
}

function saveNewQuestion(req, res) {
    let question = req.body.question,
        options = req.body.options,
        rightAnswerIndex = req.body.rightAnswerIndex,
        topic = req.body.topic;
    if (!question || !options || rightAnswerIndex === undefined || isNaN(rightAnswerIndex) || !topic)
        res.status(400).send({"Error": "One or more parameters are missing."});
    else{
        let newQuestion = {
            question : question,
            options : options,
            rightAnswerIndex : rightAnswerIndex,
            topic : topic
        }
        let newQuestionMongoose = Question(newQuestion, options);
        newQuestionMongoose.save().then((doc) => {
            res.status(201).send(doc)
        }).catch((err) => {
            res.status(500).send({"Error": err.message});
        })
    }
}

//-----------EXPORTACIONES-----------//
module.exports = {getNewQuestion, getQuestionByID, saveNewQuestion}