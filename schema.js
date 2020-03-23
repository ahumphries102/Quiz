const mongoose = require('mongoose')
let kittySchema = new mongoose.Schema({
    name:String
})

let Kitten = mongoose.model('Kitten', kittySchema)

console.log(Kitten)