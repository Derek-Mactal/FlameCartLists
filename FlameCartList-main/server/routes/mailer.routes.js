const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
    user: process.env.EMAIL,
    pass: process.env.SECRET_PASS
}
});

const contact=(req, res)=>{
    console.log(req.body)
    var mailOptions = {
        from: process.env.EMAIL,
        to: 'dejumactal@gmail.com,dawongregory@gmail.com,0xhqli@gmail.com,AllenAlmario@gmail.com',
        subject: `Flamecart inc contact message from ${req.body.name}`,
        text: `${req.body.message}\n\nReply to ${req.body.name} at ${req.body.email}`
    };
    let sent=true;
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
            sent=false
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    if(sent){
        res.json({sent})
    }
    else{
        res.status(400).json({sent})
    }
}

module.exports = app => {
    app.post('/api/contact', contact);
}