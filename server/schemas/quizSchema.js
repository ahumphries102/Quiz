const mongoose = require('mongoose')
let Schema = mongoose.Schema

const quizSchema = new Schema({
    userName:{
        type:String
    },
    quiz:{
        type:Array
    },
    quizName:{
        type:String
    }
})

const scoreSchema = new Schema({
    userName:{
        type:String
    },
    quiz:{
        type:Array
    },
    quizName:{
        type:String
    }
})

const quiz = mongoose.model('quiz', quizSchema, 'quizzes')
const score = mongoose.model('score', scoreSchema, 'quizzes')

module.exports = {
    quiz: quiz,
    score: score
  }
