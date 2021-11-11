const nodeMailer = require('nodemailer');

require('dotenv').config()
// **** Sending Mail Authentication 
const email = process.env.EMAIL
const password = process.env.EMAIL_PASSWORD
const { google } = require('googleapis')
const { cloudbilling } = require('googleapis/build/src/apis/cloudbilling')
const OAuth2 = google.auth.OAuth2
const clientId = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET
const refreshToken = process.env.REFRESH_TOKEN
const OAuth2Client = new OAuth2(clientId, clientSecret)
OAuth2Client.setCredentials({ refresh_token: refreshToken })


const emailSetup = {
    transport: {},
    info: {},
    async sendEmail() {
        // create reusable transporter object using the default SMTP transport
        const transporter = nodeMailer.createTransport(this.transport);

        // send mail with defined transport object
        const info = await transporter.sendMail(this.info);

        transporter.sendMail(info, (err, data) => {
            if (err) {
                console.log(err, 'error')
            } else {
                console.log(data, 'success email sent')
            }
        })
    }
}

const sendMail = async (req, res) => {
    const accessToken = OAuth2Client.getAccessToken()

    emailSetup.transport = {
        service: process.env.EMAIL_PROVIDER,
        secure: false,
        auth: {
            type: 'OAuth2',
            user: email,
            pass: password,
            clientId,
            clientSecret,
            refreshToken,
            accessToken
        },
    }
    emailSetup.info = {
        from: email, // sender address
        to: req.body.to, // list of receivers
        subject: req.body.subject, // Subject line
        text: `Use your token, ${req.body.userToken}, at https://quizzor.herokuapp.com to take your quiz `, // plain text body
    }
    try {
        await emailSetup.sendEmail()
        const resMsg = {}
        resMsg.error = true
        resMsg.message = 'Username or password is incorrect'
        res.send(200, resMsg)
    }
    catch (err) {
        console.log(err);
        res.send(400, err)
    }
}

// async..await is not allowed in global scope, must use a wrapper

module.exports = sendMail