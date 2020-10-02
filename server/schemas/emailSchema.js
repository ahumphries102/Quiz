const mongoose = require('mongoose')
let Schema = mongoose.Schema

const emailSchema = new Schema({
    from: {
        type: String
    },
    quizUrl: {
        type: String
    },
    subject: {
        type: String
    },
    to: {
        type: String
    },
    userToken: {
        type: Number
    },
})



module.exports = mongoose.model('Email', emailSchema, 'emails')