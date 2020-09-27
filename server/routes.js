//const restify = require('restify')
//const quiz = require('./schemas/quizSchema')
const { quiz, score} = require('./schemas/quizSchema')
const User = require('./schemas/userSchema')
const Router = require('restify-router').Router
const nodeMailer = require('./mail')
const router = new Router()
let resMsg = {}
require('dotenv').config()
// const token = process.env.VUE_APP_TOKEN

router.post('/checkmail', (req,res,next)=>{
    resMsg.message = 'No score found'
    score.find({
        whoIsReceiving:req.body.whoIsReceiving
    }, (err, score)=>{
        console.log(score)
        if(err)res.send(400, err)
        if(req.body.userName === score.whoIsReceiving)
        {res.send(score)}
        else{res.send('nuffin')}
    })
    next()
})

router.get('/viewscore', (req,res,next)=>{
    resMsg.message = 'No score found'
    score.find({}, (err, score)=>{
        err ? res.send(400, err) : res.send(score)
    })
    next()
})

router.post('/saveScore', (req, res, next) => {
    resMsg.message = 'Your score has been saved'
    new score(req.body).save((err, userScore) => {
        err ? res.send(400, err) : res.send(resMsg)
    })
    next()
})

router.get('/allquizzes', async (req, res, next) => {
    quiz.find({}, (err, quizzes) => {
        err ? res.send(400, err) : res.send(quizzes)
    })
    next()
})
router.get('/viewquiz/:name', async (req, res, next) => {
    quiz.find({
        quizName: req.query.name
    }, (err, specificQuiz) => {
        // we respond with specificQuiz[0] because mongo sends us back an array and we just need to send
        // an object. So we send the literal value within mongo's array.
        err ? res.send(400, 'Your query did match any records') : res.send(specificQuiz[0])
    })
    next()
})
router.post('/viewquiz', (req, res, next) => {
    quiz.find({
        $or: [{
            userName: req.body.userName
        }, {
            quizName: req.body.quizName
        }]
    }, (err, quizzes) => {
        err ? res.send(400, 'Couldn\'t find your quiz') : res.send(quizzes)
    })
    next()
})
router.post('/createUser', async (req, res, next) => {
    await new User({
        userName: req.body.userName.toLowerCase().trim(),
        password: req.body.password
    }).save((err, result) => {
        if (!result) {
            console.log(err)
            resMsg.error = true
            resMsg.message = 'User already exists'
            return res.send(400, resMsg)
        } else {
            return res.send(resMsg)
        }
    })
    next()
})

router.post('/sendtoken', async (req, res, next) => {
    User.findOne({
        userName: req.body.userName
    }, (err, users) => {
        if (users) {
            users.comparePassword(req.body.password, users.password, (err, result) => {
                console.log(result)
                if (result) {
                    resMsg = {
                        error: false,
                        message: 'Success'
                    }
                    res.send(resMsg)
                } else {
                    resMsg.error = true
                    resMsg.message = 'Username or password is incorrect'
                    res.send(401, resMsg)
                }
            })
        } else {
            resMsg.error = true
            resMsg.message = 'Username or password is incorrect'
            res.send(400, resMsg)
        }
    })
    next()
})


router.post('/addquiz', (req, res, next) => {
    let newQuiz = new quiz(req.body)

    newQuiz.save((err, quiz) => {
        if (err) throw err
        res.send(quiz)
    })
    next()
})

router.post('/sendEmail', (req, res, next) => {
    nodeMailer.transport = {
        service: process.env.EMAIL_PROVIDER,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL, // generated ethereal user
            pass: process.env.EMAIL_PASSWORD, // generated ethereal password
        },
    }
    nodeMailer.info = {
        from: process.env.EMAIL, // sender address
        to: req.body.to, // list of receivers
        subject: req.body.subject, // Subject line
        text: req.body.quizUrl, // plain text body
    }
    nodeMailer.sendEmail().catch(err => console.log(err))
})

module.exports = router