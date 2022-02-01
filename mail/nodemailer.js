


const nodeMailer = require('nodemailer');

 
var transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'venkatpcf@gmail.com',
        pass: 'Prabhakar143'
    },
    // tls: {
    //     rejectUnauthorized: false
    // }
});


var mailOptions = {
    to: 'venkatpcf248@gmail.com',
    subject: ' Password generated',
    from: '"THD Project" <thd.project2.0@gmail.com>',
    html: '<h1>Your New Password is :</h1>' + '<b>' + '3215551454' + '</b>'
};

// transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//         console.log("error", error)
//     }
//     else {
//         console.log(info);
//     }
// })


module.exports = transporter;