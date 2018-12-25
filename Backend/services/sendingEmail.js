'use strict';
const nodemailer = require('nodemailer');

function sendEmail (account, receivers, service) {
    nodemailer.createTestAccount((err, account) => {
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: account.user,
                pass: account.pass
            }
        });

        let text = "";
        if (service === "create")
            text = 'A new poll has been created, you can vote now.';
        else if (service === "close")
            text = 'Voting finished, you can see final result now.';


        let mailOptions = {
            from: '"Semej Team" <sahar.rajabi76@gmail.com>',
            to: receivers,
            subject: 'SEMEJ Team',
            text: text,
            html: '<b>{$text}</b>'
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        });
    });
}

module.exports = sendEmail;