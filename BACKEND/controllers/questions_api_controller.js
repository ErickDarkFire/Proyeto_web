//-----------IMPORTACIONES-----------//
const mongoose = require('mongoose');
const Question = require('../models/question.js');
const User = require("../models/user");
const {Mongoose} = require("mongoose");

//-----------FUNCIONES CRUD-----------//
function getNewQuestion(req, res) {
    Question.findOne({topic : req.params.topic}).then((question) => {
        if (question)
            res.status(200).send(question);
        else
            res.status(404).send('Not Found');
    }).catch((err) => {
        res.status(500).send(err);
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