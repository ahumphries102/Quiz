const mongoose = require('mongoose')
let Schema = mongoose.Schema

const quizSchema = new Schema({
    username:{
        type:String
    },
    quiz:{
        type:Array
    },
    quizName:{
        type:String
    }
})

module.exports = mongoose.model('Quiz', quizSchema, 'quizzes')
