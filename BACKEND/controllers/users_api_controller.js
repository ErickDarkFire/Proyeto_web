//-----------IMPORTACIONES-----------//
const mongoose = require('mongoose');
const UserHistory = require('../models/user_history.js');
const User = require('../models/user.js');
const {response} = require("express");

//-----------FUNCIONES CRUD-----------//
function createUser(req, res) {
    try{
        let name = req.body.name,
            email = req.body.email,
            password = req.body.password,
            confirmPassword = req.body["confirm_password"],
            points = req.body.points,
            message = "Hola! Soy un usuario nuevo.";
            favourite_category = "Bob Esponja";
        if (!name || !email || !password || !confirmPassword || points === undefined || points === null || isNaN(points) || !message || !favourite_category)
            res.status(400).send({"Error": "One or more parameters are missing."});
        else if(password !== confirmPassword)
            res.status(400).send({"Error": "Passwords do not match."});
        else{
            User.findOne({
                email: email
            }).then((docs) => {
                if(docs)
                    res.status(409).send("An user with this email already exists");
                else{
                    let newUser = {
                        name: name,
                        email: email,
                        password: password,
                        points: points,
                        message: message,
                        favourite_category: favourite_category
                    }
                    let newUserMongoose = User(newUser);
                    newUserMongoose.save().then((doc) => {
                        const userID = doc._id;
                        let newUserHistory = UserHistory({questions: [], user_id: userID});
                        newUserHistory.save().then((newDoc) => {
                            res.status(201).send(doc)}).catch((err) => {
                            User.findByIdAndDelete(userID);
                            res.status(500).send({"Error": err.message});
                        })
                    })
                }
            }).catch((err) => {res.status(500).send({"Error": err.message})});
        }
    } catch(err){
        res.status(500).send({"Error": err.message});
    }
}

function getUserInfo(req, res) {
    User.findOne({
        _id: req.params.id
    }).then((response) => {
        if(response)
            res.status(200).send(response);
        else
            res.status(404).send({"Error": "User not found."});
    }).catch((err) => {res.status(500).send({"Error": err.message})});
}

function editUserInfo(req, res) {
    try {
        let id = req.params.id;
        let validAttributes = ["name", "email", "password", "points", "message", "favourite_category"];
        let updateData = {};
        for (let attribute in req.body) {
            if (validAttributes.includes(attribute))
                updateData[attribute] = req.body[attribute];
            else
                return res.status(400).send({"Error": `Attribute ${attribute} is not part of the user schema.`});
        }
        if (Object.keys(updateData).length === 0) {
            return res.status(400).send({"Error": "No attributes were provided."});
        }
        User.findByIdAndUpdate(
            id,
            {$set: updateData},
            {new: true, runValidators: true}
        ).then((response) => {
            if (response) {
                res.status(200).send(response);
            } else {
                res.status(404).send({"Error": "User not found."});
            }
        })
    } catch(err) {
        res.status(500).send({"Error": err.message});
    }
}

function deleteUser(req, res) {
    let id = req.params.id;
    User.findByIdAndDelete(id).then((response) => {
        if (response)
            res.status(200).json({message: 'User deleted succesfully', user: response});
        else
            res.status(404).send({"Error": "User not found."});
    }).catch((err) => {res.status(500).send({"Error": err.message})});
}

function getTopUsers(req, res) {
    let top = req.query.top;
    if (!top || isNaN(top) || parseInt(top) <= 0) {
        return res.status(400).send({ "Error": "Please provide a valid positive number for 'top' query parameter." });
    }
    const limit = parseInt(top);
    User.find({})
        .sort({ points: -1 })
        .limit(limit)
        .then((topUsers) => {
            res.status(200).send(topUsers);
        })
        .catch((err) => {
            res.status(500).send({ "Error": "An internal server error occurred while fetching top users." });
        });
}

function getUserHistory(req, res) {
    UserHistory.findOne({
        user_id: req.params.id
    }).then((response) => {
        if(response)
            res.status(200).send(response);
        else
            res.status(404).send({"Error": "History not found."});
    }).catch((err) => {res.status(500).send({"Error": err.message})});
}

function addUserHistory(req, res) {
   let questionID = req.body.question;
   let correct = req.body.correct;
   let updateData = {questions: {question: questionID, correct: correct}};
   UserHistory.findOneAndUpdate({user_id: req.params.id},
                         {$push: updateData},
                         {new: true, runValidators: true})
       .then((response) => {
           if (response) {
               res.status(200).send(response);
           } else {
               res.status(404).send({"Error": "History not found."});
           }
       }).catch((err) => {res.status(500).send({"Error": err.message})});
}

//-----------FUNCIONES AUTENTICACIÓN-----------//
function login(req, res) {
    let data = req.body;
    User.findOne({
        email: data.email,
        password: data.password
    }).then((docs) => {
        if(docs)
            res.status(200).send(docs);
        else
            res.status(404).send({"Error": "User not found."});
    }).catch((err) => {res.status(500).send({"Error": err.message})});
}

//-----------EXPORTACIONES-----------//
module.exports = {createUser, login, getUserInfo, editUserInfo, deleteUser, getUserHistory, addUserHistory, getTopUsers};