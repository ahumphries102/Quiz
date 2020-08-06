const mongoose = require('mongoose')
let Schema = mongoose.Schema

const quizSchema = new Schema({
    userName: {
        type: String
    },
    quiz: {
        type: Array
    },
    quizName: {
        type: String
    }
})

const scoreSchema = new Schema({
    answers: {
        type: Array,
        required: true
    },
    points: {
        type: Number,
        required: [true, 'Question is too short']
    },
    questions: {
        type: Array,
    },
    quizName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: [true, 'No name was submitted']
    },
})

const quiz = mongoose.model('quiz', quizSchema, 'quizzes')
const score = mongoose.model('score', scoreSchema, 'userScores')

module.exports = {
    quiz: quiz,
    score: score
}