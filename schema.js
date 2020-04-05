const mongoose = require('mongoose')

let Schema = mongoose.Schema

const KittySchema = new Schema({
    name:{
        type:String,
        validate: {
            validator: function(v) {
                return /[a-z]$/.test(v);
            },
            message: 'Must be a tring'
        }
    }
})

// kittySchema.methods.speak = function(){
//     let greeting = this.name?"Meow! My name is " + this.name:"pew... I don't has name"
//     return console.log(greeting)
// }

let Kitten = mongoose.model('Kitten', KittySchema)

// let Silence = new Kitten({
//     name:'Silence'
// })
module.exports = Kitten
