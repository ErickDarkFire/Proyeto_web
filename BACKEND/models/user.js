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
    },
    message: {
        type: String,
        required: true
    },
    favourite_category: {
        type: String,
        enum: [
            "Star Wars", "Marvel", "Dragon Ball", "Naruto", "One Piece", "Death Note",
            "Pokemon", "Inazuma Eleven", "LeagueOfLegends", "Zelda", "Minecraft",
            "Mario", "Halo", "GearsOfWar", "Bob Esponja"
        ],
        required: true
    }
});
let User = mongoose.model('User', userSchema);

//-----------EXPORTACIONES-----------//
module.exports = User;