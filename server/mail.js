const nodeMailer = require('nodemailer')
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