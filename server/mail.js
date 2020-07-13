const nodeMailer = require('nodemailer')



//For email.createTransport
// {
//     service: "hotmail",
//     secure: false, // true for 465, false for other ports
//     auth: {
//       user: 'slice102@hotmail.com', // generated ethereal user
//       pass: 'Cameraball1!', // generated ethereal password
//     },
//   }

//for emailInfo
// {
//     from: 'slice102@hotmail.com', // sender address
//     to: "nenosi9307@mailsecv.com", // list of receivers
//     subject: "Hello ✔", // Subject line
//     text: "Hello world?", // plain text body
//     html: "<b>Hello world?</b>", // html body
//   }

let email = {
    transport: {},
    info: {},
    async sendEmail() {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodeMailer.createTransport(this.transport);

        // send mail with defined transport object
        let info = await transporter.sendMail(this.info);

        transporter.sendMail(info, (err, data) => {
            if (err) {
                console.log(err, 'error')
            } else {
                console.log(data, 'success email sent')
            }
        })
    }
}
// async..await is not allowed in global scope, must use a wrapper

module.exports = email