//-----------IMPORTACIONES-----------//
const mongoose = require('mongoose');
const UserHistory = require('../models/user_history.js');
const User = require('../models/user.js');

//-----------FUNCIONES CRUD-----------//
function createUser(req, res) {
    try{
        console.table(req.body);
        let name = req.body.name,
            email = req.body.email,
            password = req.body.password,
            confirmPassword = req.body["confirm_password"],
            points = req.body.points;
        if (!name || !email || !password || !confirmPassword || points === undefined || points === null)
            res.status(400).send({"Error": "One or more parameters are missing."});
        else{
            let newUser = {
                name: name,
                email: email,
                password: password,
                points: points
            }
            let newUserMongoose = User(newUser);
            newUserMongoose.save().then((doc) => {res.status(200).send(doc)});
        }
    } catch(err){
        res.status(500).send({"Error": err.message});
    }
};

//-----------EXPORTACIONES-----------//
module.exports = {createUser};