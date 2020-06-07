//const restify = require('restify')
const Quiz = require('./schemas/quizSchema')
const User = require('./schemas/userSchema')
const Router = require('restify-router').Router
const router = new Router()

require('dotenv').config()
const token = process.env.VUE_APP_TOKEN

router.get('/allquizzes', async(req, res, next)=>{
    Quiz.find({},(err,quizzes)=>{
       err?res.send(err):res.send(quizzes)
       next()
    })
    next()
})

router.post('/createUser', async (req, res, next) => {
    try {
        let newUser = new User({
            username: req.body.username.toLowerCase().trim(),
            password: req.body.password
        })

        let request = await newUser.save()
        res.send(request)
    } catch (err) {
        console.log(err)
        res.send({
            err: 'That username already exists. Please try a different username'
        })
    }
    next()
})

router.post('/sendtoken', async (req, res, next) => {
    User.findOne({
        username: req.body.username
    }, (err, users) => {
        if (users) {
            users.comparePassword(req.body.password, users.password, (err, result) => {

                if (result === true) {
                    res.send({
                        msg: 'Success you logged in',
                        token: token
                    })
                } else {
                    res.status(401)
                    res.send({
                        msg: 'Password Incorrect'
                    })
                }
            })
        } else {
            res.status(400)
            res.send({
                err: 'Bad User Name'
            })
        }
    })
    next()
})
router.post('/viewquiz', (req, res, next) => {
    Quiz.find({$or:[{username:req.body.username}, {quizName:req.body.quizName}]}, (err, quizzes) => {
        if (err) throw err
        res.send(quizzes)
    })
    next()
})

router.post('/addquiz', (req, res, next) => {
    let newQuiz = new Quiz(req.body)

    newQuiz.save((err, quiz) => {
        if (err) throw err
        res.send(quiz)
    })

    return next()
})

module.exports = router