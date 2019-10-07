var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var pool = require('../config/connect');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var twilio = require('twilio');
var client = new twilio('AC38c360080cfddb271554c355c83f542d', 'b6ee2e5869d7ac3268dbdbbabfb54ab7');
var accStatus = 0;
var nodemailer = require('nodemailer');
var session = require('express-session');
var myData = '';
var formidable = require('formidable');
var multer = require('multer');
var fs = require('fs');
var req1 = '';
var multer = require('multer');

var formidableMiddleware = require('express-formidable');

let transporter = nodemailer.createTransport({
	service: 'gmail',
	secure: false,
	port: 25,
	auth: {
	user: 'ssankabi@gmail.com',
	pass: '@Sli23547'
	},
	tls: {
	rejectUnauthorized: false
	}
});

router.use(formidableMiddleware({encoding: 'utf-8',
uploadDir: './uploads',
multiples: true}));
// req.files to be arrays of files));

router.post('/uploads', function(req, res) {

});

router.post('/API/sendFile:ToDo', function(req, res) {

  if (req.params.ToDo)
    {
   //console.log(.);
   var data1 = JSON.parse(decodeURI(req.params.ToDo));
   let fileName = req.files.file.name;
   let oldpath = req.files.file.path;

   console.log(data1.eMail + " as to Email  88  From one iz -> " +data1.fromEmail);
   console.log(' IM working here ! ** -> ');
   let newPath = ".//saved_uploads//" + fileName; 
  //var newpath = "C://Mine//" +  fname.toString();
   var dir = ".//saved_uploads//";

    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
    
   console.log(newPath);
   fs.rename(oldpath, newPath, function (err) {
     if (err) throw err;
     console.log('File uploaded and moved!');
     //res.end();
   });

   let mailOptions = {
		from: data1.fromEmail,
		to: data1.eMail,
		subject: data1.eSubject,
    text: data1.eMessage,
    attachments: [{
        path: newPath
    }]
	};

	transporter.sendMail(mailOptions, function(error, info) {
		if (error) {

		  console.log(error);
      return res.status(400).send('Email does not exist ');
      
		} else {

    console.log('Email sent: ' + info.response);

      fs.unlink(newPath, function (err) {
        if (err) {
          console.log(err);
          return res.status(200).send('Email successfully sent');
        } else {
        console.log('File deleted 4EVAR n EVAR!');
          return res.status(200).send('Email successfully sent');
        }
      });   
    
    }
  });
  
  } else {
    return res.status(400).send('Please fill in all required fields');
  }

});

module.exports = router;