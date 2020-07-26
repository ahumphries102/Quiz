//const restify = require('restify')
const Quiz = require('./schemas/quizSchema')
const User = require('./schemas/userSchema')
const Router = require('restify-router').Router
const nodeMailer = require('./mail')
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
router.get('/viewquiz/:id', async(req, res, next)=>{
    Quiz.find({quizName:req.params.id},(err,specificQuiz)=>{
        if(specificQuiz.length < 1){
            res.status(400)
            res.send('Your query did match any records')
        }
        else{
            err?res.send(err, 400):res.send(specificQuiz)
        }
       next()
    })
    next()
})
router.post('/createUser', async (req, res, next) => {
    try {
        new User({
            userName: req.body.userName.toLowerCase().trim(),
            password: req.body.password
        }).save(err =>{
            if(err) return res.send(400,'User already exists')
            return res.send('Success')
        })
    } catch (err) {
        console.log(err)
        res.send({
            err: 'That userName already exists. Please try a different userName'
        })
    }
    next()
})

router.post('/sendtoken', async (req, res, next) => {
    User.findOne({
        userName: req.body.userName
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
    Quiz.find({$or:[{userName:req.body.userName}, {quizName:req.body.quizName}]}, (err, quizzes) => {
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

router.post('/sendEmail', (req,res,next)=>{
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