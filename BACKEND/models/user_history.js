//-----------IMPORTACIONES-----------//
const mongoose = require('mongoose');

//-----------MODELO-----------//
let userHistorySchema = mongoose.Schema({
    questions: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Question'
        }],
        required: true
    },
    id: {
        type: String,
        required: true
    },
    correct: {
        type: Boolean,
        required: true
    }
}, {
        collection: 'user_histories'
    }
    );
let UserHistory = mongoose.model('UserHistory', userHistorySchema);

//-----------EXPORTACIONES-----------//
module.exports = UserHistory;