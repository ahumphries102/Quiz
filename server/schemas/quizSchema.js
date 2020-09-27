const mongoose = require('mongoose')
let Schema = mongoose.Schema

const quizSchema = new Schema({
    userName: {
        type: String
    },
    quiz: {
        type: Object
    },
    quizName: {
        type: String
    },
    quizCompleted: {
        type: Boolean
    },
    quizLookedAt: {
        type: Boolean
    },
    whoIsReceiving:{
        type: String
    },
    whoIsSending:{
        type: String
    },
    originalCreator:{
        type: String
    }
})

const scoreSchema = new Schema({
    answers: {
        type: Array,
        required: true
    },
    day: {
        type: Number,
        required: [true, 'Day was not submitted']
    },
    month: {
        type: String,
        required: [true, 'Month was not submitted']
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
        required: [true, 'Your quiz must have a name']
    },
    userName: {
        type: String,
        required: [true, 'Your quiz must have your name']
    },
    year: {
        type: Number,
        required: [true, 'Year was not submitted']
    },
})

const quiz = mongoose.model('quiz', quizSchema, 'quizzes')
const score = mongoose.model('score', scoreSchema, 'userScores')

module.exports = {
    quiz: quiz,
    score: score
}