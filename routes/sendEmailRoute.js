var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var pool = require('../config/connect');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var twilio = require('twilio');
var client = new twilio('AC821384de2e7df3224a1d0ee0ce60f843', 'bfe1f0b1293d14ddece2b67e3ddf2473');
var accStatus = 0;
var nodemailer = require('nodemailer');
var session = require('express-session');
var mdata = '';
var fs = require('fs')
var path = require('path');
//NODE_TLS_REJECT_UNAUTHORIZED='0';
//router.use(cookieParser());
//app.use(express.session({ secret: 'something', store: store }));

router.use(session({ secret: '12teqwgdshjb237tiurewfgk', cookie: { maxAge: 600000 }}))

let transporter = nodemailer.createTransport({
	service: 'gmail',
	secure: false,
	port: 25,
	auth: {
	user: 'ssankabi@gmail.com',
	pass: '@Sl123547'
	},
	tls: {
	rejectUnauthorized: false
	}
});

router.post('/API/SendEmail:ToDo', function(req, res) {
    
    if (req.params.ToDo)
    {
        var myData = JSON.parse(decodeURI(req.params.ToDo));

        var filename = path.basename(myData.efilename);
        filename = path.resolve('C:\\Users\\', filename);
      //  var newPath = 'C:\\Users\\Stuff.txt';
        var dst = fs.createWriteStream(filename);

        console.log( myData.eMail + 'As EMAIL ');
        //console.log(myData.eAttachment.value + " \n as email attachements");
        let mailOptions = {
            from: 'ssankabi@gmail.com',
            to: myData.eMail,
            subject: myData.eSubject,
            text: myData.eMessage,
            attachments: [
                {
                    filename: myData.efilename,
                    path: myData.epath
                }
            ]
        };
        
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
            console.log(error);
            return res.status(400).send('Email does not exist ');
            } else {
            console.log('Successfully sent man');
            return res.status(200).send('Email successfully sent');
            }
        });
    
    } else {
        return res.status(400).send('Error, Could not send Email, no email address');
    }
});

module.exports = router;