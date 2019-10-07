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
var mdata = '';
//NODE_TLS_REJECT_UNAUTHORIZED='0';
//router.use(cookieParser());
//app.use(express.session({ secret: 'something', store: store }));
var Nexmo = require('nexmo');
const nexmo = new Nexmo({
	apiKey: 'd22c162a',
	apiSecret: 'Ev5RQke8YMLdosu6',
  });  

router.use(session({ secret: '12thaergctvkfabsmjbygis', cookie: { maxAge: 600000 }}))

router.get('/API/SendSms:ToDo', function(req, res) {

    if (req.params.ToDo)
    {
        let myData = JSON.parse(decodeURI(req.params.ToDo));
        let msg =  myData.eMessage;
        
        while(msg.indexOf('<q2>') >= 0)
        {
            msg = msg.replace('<q2>', "?");
        }

        nexmo.message.sendSms(
            'Nexmo',  myData.eNumber, msg,
                (err, responseData) => {
                if (err) {
                    console.log(err1);
                    return res.status(200).send('Something went wrong');
                } else {
                    console.log(' SMS SENT as well ');		   
                   return res.status(200).send('Message Sent');  
                }
        });

    } else {
        return res.status(200).send('Nothing Sent');  
    }
});

module.exports = router;
