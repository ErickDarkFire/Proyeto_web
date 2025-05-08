//-----------IMPORTACIONES-----------//
const mongoose = require('mongoose');

//-----------MODELO-----------//
let userHistorySchema = mongoose.Schema({
    questions: {
        type: [{
            question: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Question'
            },
            correct: {
                type: Boolean,
            required: true
            }
        }],
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
        collection: 'user_histories'
    }
    );
let UserHistory = mongoose.model('UserHistory', userHistorySchema);

//-----------EXPORTACIONES-----------//
module.exports = UserHistory;