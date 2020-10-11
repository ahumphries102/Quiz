const mongoose = require('mongoose')
let Schema = mongoose.Schema

const emailSchema = new Schema({
    from: {
        type: String,
        required:[true, 'From is missing']
    },
    quizUrl: {
        type: String,
        required:[true, 'Quiz is missing']
    },
    subject: {
        type: String,
        required:[true, 'Subject is missing']
    },
    to: {
        type: String,
        required:[true, 'to is missing']
    },
    userToken: {
        type: String,
        required:[true, 'token is missing']
    },
})



module.exports = mongoose.model('Email', emailSchema, 'emails')