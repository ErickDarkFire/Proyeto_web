//-----------IMPORTACIONES-----------//
const mongoose = require('mongoose');

//-----------MODELO-----------//
let questionSchema = mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    options: {
        type: [String],
        required: true,
        validate: {
            validator: function(arr) {
                return arr.length === 4;
            },
            message: 'Options must have exactly 4 elements.'
        }
    },
    rightAnswerIndex: {
        type: Number,
        required: true,
        min: 0,
        max: 3
    },
    topic: {
        type: String,
        required: true
    }
});
let Question = mongoose.model('Question', questionSchema);

//-----------EXPORTACIONES-----------//
module.exports = Question;