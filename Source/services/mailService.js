const nodemailer = reqire('nodemailer');

// step 1 
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'auto.system.service.bao@gmail.com',
        pass: '@phuocbao98',
    }
});

// step 2
let mailOptions = {
    from: 'auto.system.service.bao@gmail.com',
    to: 'lamphuocbao98@gmail.com',
    subject: 'Testing mail',
    text: 'IT works'
};

// Step 3
sendMail = () => {
    transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log('Mail sent');
        }
    });
}


// let send = (mailOptions)=>{

// }
module.exports = {
    sendMail: sendMail
}
