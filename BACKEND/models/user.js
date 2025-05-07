//-----------IMPORTACIONES-----------//
const mongoose = require('mongoose');

//-----------MODELO-----------//
let userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    points: {
        type: Number,
        required: true
    }
});
let User = mongoose.model('User', userSchema);

//-----------EXPORTACIONES-----------//
module.exports = User;