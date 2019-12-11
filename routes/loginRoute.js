var q = require('q');
var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var pool = require('../config/connect');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var twilio = require('twilio');
var client =new twilio('AC38c360080cfddb271554c355c83f542d', 'b6ee2e5869d7ac3268dbdbbabfb54ab7');
var accStatus = 0;
var nodemailer = require('nodemailer');
var session = require('express-session');
//var Gpio = require('onoff').Gpio;
var mdata = '';
var everything = '';
var locationZ = [];

//TEST RECEIVING ....

var base64 = require('base-64');

var request = require('request'),
Username = "sleee",
Password = "Sli00000000",	
url = "https://api.bulksms.com/v1/messages?filter=type%3DRECEIVED",
auth = "Basic " + new Buffer(Username + ":" + Password).toString("base64");

var formData1 = {
  'to': '+27001234567',
  'body': 'Hello World!'
};


//TEST RECEIVING .....
//NODE_TLS_REJECT_UNAUTHORIZED='0';
//router.use(cookieParser());
//app.use(express.session({ secret: 'something', store: store }));
var Nexmo = require('nexmo');
const nexmo = new Nexmo({
	apiKey: 'd22c162a',
	apiSecret: 'Ev5RQke8YMLdosu6',
  });  

router.use(session({ secret: '12teqwgdshjb237tiurewfgk', cookie: { maxAge: 600000 }}))

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

router.get('/API/loginAccount:ToDo', function(req, res) {
    
    if (req.params.ToDo)
    {	

        let myData = JSON.parse(req.params.ToDo);
        let queryOne = "SELECT * FROM progressaccount WHERE useremail = '";
            queryOne += myData.email + "' AND userpassword = '";
            queryOne += myData.password + "'";

        console.log(queryOne);
        pool.query(
            queryOne, (err4, qres4) => {
           // console.log(' MY count ' + qres4.rows.length + ' COUNT ' + qres4.rowCount)
	   
	   if (err4)
	   {
		return res.status(400).send('There is no account for the user');
	   } else {
	    if (!qres4)
	    {

		return res.status(400).send('There is no account for the user');

	    } else if (qres4.rowCount == 0)
	    {
		return res.status(400).send('There is no account for the user');    
	    }

                let accountStatus = qres4.rows[qres4.rowCount - 1].activestatus;
                
                if (accountStatus.trim() == 'active')
                {
					console.log('active');
                    req.session.mydata = qres4;
                    return res.status(200).send({code : '01'});
                } else if (accountStatus.trim()  == 'deactive') {
					console.log('deactiv');
                    req.session.mydata = qres4;
                    return res.status(200).send({code : '00'});
                }
	}
        });
        
    } else {
        return res.status(400).send('Please re-enter the correct login credentials');
    }
});

router.get('/activateData', function(req, res) {
	mdata = req.session.mydata;
	console.log(mdata);
    
    if (!mdata)
	{
		return res.status(400).send('Error loging in to activation screen');
	} else {
		return res.status(200).send({Data:mdata});
	}
});


router.get('/API/logout', function(req, res) {
	req.session.mydata = undefined;
	if (req.session.mydata == undefined)
	{
		return res.status(200).send('Successfully logged out');
	} else {
		return res.status(400).send('Something went wrong logging out');
	}
});

router.get('/getLoggedIn', function(req, res) {
	mdata = req.session.mydata;
	console.log("My DATA MAN !!!!!!!!!!" + mdata);
    
    if (!mdata)
	{	
		console.log('e00');
		return res.status(200).send('Error logging in to activation screen');
	} else {
		console.log('e001');
		return res.status(200).send({Data:mdata, Code:'01'});
	}
});

router.get('/API/GetAll', function(req, res) {
    mdata = req.session.mydata;

    //let queryAll = "SELECT * FROM progressAccount WHERE useremail not like '" + mdata.rows[0].useremail + "%' AND userpassword like '";
	let queryAll = "SELECT * FROM progressAccount ";

        console.log(queryAll);
        pool.query(
            queryAll, (err4, qres4) => {
                if (err4)
                {
                    return res.status(400).send('Error querying user data');
                } else {
					let locations = [];
					everything = qres4;
					let i = 0;
					while (i < qres4.rowCount)
					{
						console.log(i + '  AS my index  ' + qres4.rows[i].userid);
						//locations[i] = getLocation(qres4.rows[i].userid);
						getLocation(qres4.rows[i].userid, i, function(err, data, index) {
							console.log(data);
							returnM(index, err, data);
						});
						i++;
					}

					setTimeout(function() {
						return res.status(200).send({Data1:qres4, locations: locationZ});
					}, 200)  
                }
        });

});

function redeemData()
{
	  let queryAll = "SELECT * FROM progressAccount ";

       // console.log(queryAll);
        pool.query(
            queryAll, (err4, qres4) => {
                if (err4)
                {
                    console.log(err4);
                } else {
					let locations = [];
					everything = qres4;
					let i = 0;
					while (i < qres4.rowCount)
					{
						console.log(i + '  AS my index  ' + qres4.rows[i].userid);
						//locations[i] = getLocation(qres4.rows[i].userid);
						getLocation(qres4.rows[i].userid, i, function(err, data, index) {
							console.log(data);
							returnM(index, err, data);
						});
						i++;
					}
 
                }
        });
	
}

function returnM(index, err, data)
{
	locationZ[index] = data;
	//console.log(locationZ[0]  + ' Inside of retunz');
	return;
}

function getLocation(val, index, next)
{

	let query2 = " SELECT sitename, locationstatus, userid FROM postlocation ";
	query2 += " WHERE userid = ";
	query2 += val;	
	query2 += " ORDER BY locationdate DESC ";
	query2 += " limit(1) ";
	console.log(query2 + '  \n AS MY PROBLEM');
	var deferred = q.defer();

	pool.query(
		query2, (err4, qres4) => {
		if (qres4.rowCount == 0)
		{
			next(null, "UNKNOWN", index); 
		} else {
			if (err4)
			{
				next(null, "UNKNOWN", index); 
			}

			if (qres4.rowCount == 0)
			{
				next(null, "UNKNOWN", index); 
			}

			if (!qres4)
			{
				next(null, "UNKNOWN", index); 
			}
			
			if (qres4.rows[0].locationstatus == 0)
			{
				next(null, "UNKNOWN", index); 
			} else  if (qres4.rows[0].locationstatus == 1) {
				next(null, qres4.rows[0].sitename + " site", index);
			}
			//deferred.resolve("UNKNOWN");
			//	return "UNKNOWN";
		
		}
		
	});
	//return deferred.promise;
}
// Set SMS session
router.get('/API/GetSMSDet:ToDo', function(req, res) {
   
    if (req.params.ToDo)
    {

        let myData = JSON.parse(decodeURI(req.params.ToDo));

        req.session.smsdata = myData;
        
        return res.status(200).send('Set');

    } else {
        return res.status(400).send('Not Set');
    }
});

router.get('/GetSMSSession', function(req, res) {
        
    //req.session.data = myData;
    if(!req.session.smsdata)  
    { 
        return res.status(400).send('Session Died');
    } else {
        return res.status(200).send({Data: req.session.smsdata});
    }
});

// Set EMAIL session
router.get('/API/GetEmailDet:ToDo', function(req, res) {
   
    if (req.params.ToDo)
    {
        let myData = JSON.parse(req.params.ToDo);
        req.session.emaildata = myData;

        return res.status(200).send('Email Set');
    } else {
        return res.status(400).send('Not Set');
    }
});


router.get('/GetEmailSession', function(req, res) {   
    //req.session.data = myData;
    if(!req.session.emaildata)  
    {  
        return res.status(400).send('Session Died');
    } else {   
        return res.status(200).send({Data: req.session.emaildata});  
	}
});

router.get('/API/ActivateAccount:ToDo', function(req, res) {
	
	if (req.params.ToDo) {	
	
		let actData = JSON.parse(req.params.ToDo);		
//		console.log(actData + " BBBB ");
//		return res.status(400).send(' On IT Boss! SUCCCESS ');
		let update = "UPDATE progressAccount SET activeStatus = 'active' WHERE username like '";
			update += actData.name + "%' AND useridentity like '" + actData.idnumber + "%' AND useremail like '";
			update += actData.email + "'";

		console.log(update);

		pool.query(
			update, (err4, qres4) => {
				if (err4) {
				return res.status(400).send('No Data');
				} else {
					return res.status(200).send('Updated');
				}
		});

	} else {
		return res.status(400).send('No Data');
	}
});

router.get('/API/forgotPassword:ToDo', function(req, res) {
	
	if (req.params.ToDo)
	{	
		let myData = JSON.parse(req.params.ToDo);

		let queryGet = "SELECT * FROM progressAccount WHERE useremail like '";
			queryGet += myData.email + "%' AND usernumber like '" + myData.number + "%'"; 

		pool.query(
			queryGet, (err4, qres4) => {
			if (err4) {
				return res.status(400).send('Could not find anything');
			} else {
				console.log(qres4.rows[qres4.rowCount - 1].useremail + "   " + qres4.rows[qres4.rowCount - 1].userpassword);
				sendPassword(qres4);
				return res.status(200).send('Your password has been sent to your email');	
			}
		});

	} else {

	}
});

function sendPassword(Data)
{
	//let randval = Math.floor((Math.random() * 9) + 1 + 600 + (Math.random() * 200) + 100 + (Math.random() * 300000)+100000);

	let mstr = 'Your password  is : ';
		mstr += Data.rows[0].userpassword;

	let mailOptions = {
		from: 'ssankabi@gmail.com',
		to: Data.rows[0].useremail,
		subject: 'Password for PCS',
		text: mstr
	};
	
	transporter.sendMail(mailOptions, function(error, info){
		if (error) {
		console.log(error);
		return res.status(400).send('Email does not exist ');
		} else {
		console.log('Email sent: ' + info.response);
		return;
		}
	}); 
}

function resendDATA(Data)
{
	let randval = Math.floor((Math.random() * 9) + 1 + 600 + (Math.random() * 200) + 100 + (Math.random() * 300000)+100000);

	let mstr = '\n \n : \n- \n - Thank you for creating an account for PCS \n\n';
			mstr += ' Use this verification code to confirm your account ' + randval;

	let mailOptions = {
		from: 'ssankabi@gmail.com',
		to: Data.email,
		subject: 'Verification email from Progress Control System',
		text: mstr
	};
	
	transporter.sendMail(mailOptions, function(error, info){
		if (error) {
		console.log(error);
		return res.status(400).send('Email does not exist ');
		} else {
		console.log('Email sent: ' + info.response);
		
		let mstr = '\n \n : \n- \n - Thank you for creating an account for PCS \n\n';
			mstr += ' Use this verification code to confirm your account ' + randval;

			nexmo.message.sendSms(
				'Nexmo', Data.telnumber, mstr,
					(err, responseData) => {
					if (err) {
						console.log(err1);
						return res.status(200).send('Something went wrong');
					} else {
						console.log(' SMS SENT as well ');		
						accStatus = 1;	
						req.session.views = Data;	
						return res.status(200).send({msg: 'Account created successfully' , randv: randval});
					}
			});

		}
	}); 
}


global.io.on('connection', function(socket){
    // console.log('a user connected');
     //socket.on('disconnect', function(){
     //  console.log('user disconnected');
     //});
	 //Test messages by sending a message every 1 second.
	 //locationZ
	 var i = 0;
	 
     setInterval(function(){
 
        // let hardwareValues = checkHardware();
		 //let window1Angle = checkW1Angle();
		 //console.log(locationZ[1] + ' AS my locations')
		 redeemData();
         global.io.emit('getallusers', {
			 'alldata': everything,
			  'location':  locationZ
         });
 
         i++;
     }, 1000);
 });

module.exports = router;
