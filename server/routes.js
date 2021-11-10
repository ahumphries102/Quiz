//const restify = require('restify')
// quiz and score are our databases
const {
    quiz,
    score
} = require('./schemas/quizSchema')
const Email = require('./schemas/emailSchema')
const User = require('./schemas/userSchema')
const Router = require('restify-router').Router
const nodeMailer = require('./mail')
const router = new Router()
let resMsg = {}

require('dotenv').config()
// **** Sending Mail Authentication 
const { google } = require('googleapis')
const { cloudbilling } = require('googleapis/build/src/apis/cloudbilling')
const OAuth2 = google.auth.OAuth2
const clientId = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET
const refreshToken = process.env.REFRESH_TOKEN
console.log(clientId, refreshToken);
const OAuth2Client = new OAuth2(clientId, clientSecret)
OAuth2Client.setCredentials({refresh_token: refreshToken})
// **** End of mail
// const token = process.env.VUE_APP_TOKEN

router.post('/usetoken', (req, res, next) => {
    resMsg.message = ''
    Email.find({
        userToken: req.body.userToken,
    }, (err, email) => {
        if (err) res.send(400, err)
        else if (!email.length) {
            resMsg.message = "No quiz found"
            res.send(400, resMsg.message)
        } else {
            console.log(email[0])
            res.send(email[0])
        }
    })
    next()
})

router.post('/savetokeninfo', (req, res, next) => {
    let resMsg = ''
    let email = new Email(req.body)
    email.save({
        from: req.body.from,
        quizUrl: req.body.quizUrl,
        subject: req.body.subject,
        to: req.body.to,
        read: false,
        userToken: req.body.userToken,
    }, (err, dbEmail) => {
        if (err) {
            res.send(400, err)
        } else {
            res.send(dbEmail)
        }
    })
    next()
})

router.put('/updateScore', (req, res, next) => {
    //_id looks at the id mongo assigns a document, id is that same value, but from the front end.
    // on the front side id is the equivelent to _id
    score.findOneAndUpdate({_id: req.body.id},{reviewed:true}, (err, score) => {
        if (err) {
            res.send(400, err)
        }else {
            res.send(score)
        }
    })
    next()
})
router.del('/deleteScore', (req, res, next)=>{
    score.deleteOne({_id:req.body.id}, (err, score)=>{
        err?res.send(400, err): res.send(score)
    })
    next()
})
router.post('/individualMail', (req,res,next)=>{
    score.find({
        _id:req.body.id
    },(err, score)=>{
        if(err){
            res.send(400, err)
        }else{
            res.send(score[0])
        }
    })
    next()
})
router.post('/checkmail', (req, res, next) => {
    resMsg.message = 'No score found'
    score.find({
        whoSentQuiz: req.body.userName
    }, (err, score) => {
        if (err) {
            res.send(400, err)
        } else if (!score.length) {
            res.send(400, resMsg.message)
        } else {
            res.send(score)
        }
    })
    next()
})

router.get('/viewscore', (req, res, next) => {
    resMsg.message = 'No score found'
    score.find({}, (err, score) => {
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
    const accessToken = OAuth2Client.getAccessToken()

    nodeMailer.transport = {
        service: process.env.EMAIL_PROVIDER,
        secure: false, // true for 465, false for other ports
        auth: {
            type: 'OAuth2',
            user: process.env.EMAIL, // generated ethereal user
            pass: process.env.EMAIL_PASSWORD, // generated ethereal password
            clientId,
            clientSecret,
            refreshToken,
            accessToken
        },
    }
    nodeMailer.info = {
        from: process.env.EMAIL, // sender address
        to: req.body.to, // list of receivers
        subject: req.body.subject, // Subject line
        text: `Use your token, ${req.body.userToken}, at https://quizzor.herokuapp.com to take your quiz `, // plain text body
    }
    nodeMailer.sendEmail().then(data => res.send('whooray')).catch(err => res.send(400, err))

    next()
})

module.exports = router