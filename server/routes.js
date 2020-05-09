//const restify = require('restify')
const Kitten = require('./schemas/quizSchema')
const Quiz = require('./schemas/quizSchema')
const User = require('./schemas/userSchema')
const Router = require('restify-router').Router
const router = new Router()

require('dotenv').config()
const token = process.env.VUE_APP_TOKEN

router.get('/allcats', (req, res, next) => {
    Kitten.find({}, (err, kitties) => {
        let getKittenNames = kitties.map(ele => ele.name)
        if (kitties.length) {
            res.send(getKittenNames);
        } else {
            res.status(400)
            err = 'No Cats Found'
            res.send('No cats found')
        }
    });
    next()
})

router.post('/createUser', async(req, res, next) => {
    try{
        let newUser = new User({
            username:req.body.username.toLowerCase().trim(),
            password:req.body.password
        })
            
        let request = await newUser.save()
        res.send(request)
    }catch(err){
        console.log(err)
        res.send({err:'That username already exists. Please try a different username'})
    }
    next()
})

router.post('/sendtoken', async(req,res,next)=>{
    User.findOne({username:req.body.username}, (err,users)=>{
        if(users){
            users.comparePassword(req.body.password, users.password, (err, result)=>{
                
                if(result === true){
                    res.send({msg:'Success you logged in', token:token})
                }else{
                    res.status(401)
                    res.send({msg:'Password Incorrect'})
                }
            })
        }else{
            res.status(400)
            res.send({err:'Bad User Name'})
        }
    })
    next()
})

router.post('/viewquiz', (req,res,next)=>{
    Quiz.find({ username:req.body.username}, (err, quizzes)=>{
        if(err) throw err
        res.send(quizzes)
    })
    next()
})

router.post('/addquiz', (req,res,next)=>{
    let newQuiz = new Quiz(req.body)
    
    newQuiz.save((err, quiz)=>{
        if(err) throw err
        res.send(quiz)
    })

    return next()
})



router.post('/addcat', (req, res, next) => {
    let newCat = new Kitten(req.body)
    newCat.save((err, kitties)=>{
        if(err) throw err
        res.send(kitties)
    })

    return next()
})

router.patch('/fixcat/:name', (req, res, next) => {
    Kitten.update({
        name: req.params.name
    }, {
        name: req.body.name
    }, (err, result) => {
        if (req.params.name === req.body.name) {
            res.status(400)
            return res.send('Cannot update name to same name')
        } else if (result.n > 0) {
            return res.send(result, `Your kitten's new name is ${req.body.name}`)
        } else {
            res.status(400)
            return res.send(`There was no cat named ${req.params.name} to update`)
        }
    })
    next()
})

router.del('/removecat', (req, res, next) => {
    Kitten.remove({
        name: req.body.name
    }, (err, result) => {
        if(result)
            if (result.n > 0) {
                res.send(`You deleted ${req.body.name}`)
            } else {
                res.status(400)
                res.send(`There is no cat named ${req.body.name}`)
            }
        else{
            res.status(400)
            res.send(err)
        }
    })
    return next()

})

module.exports = router