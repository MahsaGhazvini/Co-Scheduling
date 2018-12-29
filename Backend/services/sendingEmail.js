'use strict';
const nodemailer = require('nodemailer');
const config = require('../config/config');

function sendEmail (receivers, service) {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // use SSL
        auth: {
            user: config.user,
            pass: config.pass
        }
    });

    let text = "";
    if (service === "create")
        text = 'A new poll has been created, you can vote now.';
    else if (service === "close")
        text = 'Voting finished, you can see final result now.';


    let mailOptions = {
        from: config.user,
        to: receivers,
        subject: 'SEMEJ Team',
        text: text
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
}

module.exports = sendEmail;