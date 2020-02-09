var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var pool = require('../config/connect');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var twilio = require('twilio');
// var client = new twilio('AC38c360080cfddb271554c355c83f542d', 'b6ee2e5869d7ac3268dbdbbabfb54ab7');
var accStatus = 0;
var nodemailer = require('nodemailer');
var session = require('express-session');
var emailExistence = require('email-existence');
var Nexmo = require('nexmo');
//NODE_TLS_REJECT_UNAUTHORIZED='0';
//router.use(cookieParser());
//app.use(express.session({ secret: 'something', store: store }));

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
	user: 'progresscontrolsystem@gmail.com',
	pass: '@Sl1235477'
	},
	tls: {
	rejectUnauthorized: false
	}
});

router.get('/API/CreateAccount:ToDo', function(req, res) {
    
    if (req.params.ToDo)
    {	
		//console.log(req.session.views + " ***** ");

		var myData = JSON.parse(req.params.ToDo);

		if (!myData) 
		{
			return res.status(400).send('Please correctly fill in all details');
		}
		if (!myData.name || !myData.surname || !myData.birthdate || !myData.startdate || !myData.idnumber
			|| !myData.position || !myData.email || !myData.telnumber || !myData.gender || !myData.password)
			{
				return res.status(400).send('Please correctly fill in all details');
			}
		
		let insertQ = "INSERT INTO progressAccount(username, usersurname, userbirthdate, startdate, ";
			insertQ += " userposition, useremail, usernumber, usergender, userpassword, useridentity, workid) VALUES ( ";
			insertQ += "'"+ myData.name+"', " + "'" + myData.surname + "', '" + myData.birthdate  + "', '" + myData.startdate;
			insertQ += "', '"+ myData.position +"', " + "'" + myData.email + "', '" + myData.telnumber + "', '" + myData.gender + "', '";
			insertQ += myData.password + "', '" + myData.idnumber + "', '" + myData.workid + "');";
		
		let validationQ = "Select * FROM progressAccount";
			
			pool.query(
				validationQ, (err1, qres1) => {
					if (err1)
					{
						return res.status(400).send('Account already exists for this email');
					} else {

					for (var i = 0; i < qres1.rowCount; i++)
					{
						if (myData.email.trim() == qres1.rows[i].useremail.trim())
						{
							return res.status(400).send('Account already exists for this email');
						}
					}

							//let randomVal = Math.floor((Math.random() * 9) + 1 + 600 + (Math.random() * 200) + 100 + (Math.random() * 300000)+100000);

							var randval = Math.floor((Math.random() * 9) + 1 + 600 + (Math.random() * 200) + 100 + (Math.random() * 300000)+100000);

							let mstr = '\n \n : \n- \n - Thank you for creating an account for PCS \n\n';
							mstr += ' Use this verification code to confirm your account ' + randval;

							let mailOptions = {
								from: 'progresscontrolsystem@gmail.com',
								to: myData.email,
								subject: 'Verification email from Progress Control System',
								text: mstr
							};

						emailExistence.check(myData.email, function(error1, response1){
							if (response1 != false)
							{
								transporter.sendMail(mailOptions, function(error, info){
									if (error) {
									console.log(error);
									return res.status(400).send('Email does not exist ');
									} else {

									console.log('Email sent: ' + info.response);
									
									let mstr = '\n \n : \n- \n - Thank you for creating an account for PCS \n\n';
										mstr += ' Use this verification code to confirm your account ' + randval;
										
										nexmo.message.sendSms(
											'Nexmo', myData.telnumber, mstr,
												(err, responseData) => {
												if (err) {
												console.log(err);
												return res.status(400).send('Number entered is invalid, please re-create account');
												} else {
											
														pool.query(
														insertQ, (err4, qres4) => {
															if (err4)
															{
																return res.status(400).send('Something went wrong, please re-create account');
															} else {
															req.session.views = myData;	
															req.session.conf = randval;
															console.log('My verify is ' + req.session.conf);
															return res.status(200).send({msg: 'Account created successfully' , verify: randval});
															//console.dir(responseData);
															}
														});
																									
												}
										});
								}
							}); 
						} else {
							//console.log('Email not thete')
							return res.status(400).send('Email does not exist ');
						}
					});
				}
			});
			console.log(insertQ);
    } else {
        return res.status(400).send('Nothing entered in fields, please re-enter');
    }
});

router.get('/ConfirmAccount', function(req, res) {
	let mdata = req.session.views;
	console.log(mdata);
	if (!mdata)
	{
		return res.status(400).send({code:'01'});
	} else {
		console.log(' My STORED Session! ' + req.session.conf);
		return res.status(200).send({msg:'00', Data:mdata, verify: req.session.conf});
	}
});

router.get('/API/ActivateAccount:ToDo', function(req, res) {
	
	if (req.params.ToDo) {	
	
		var actData = JSON.parse(req.params.ToDo);		
//		console.log(actData + " BBBB ");
//		return res.status(400).send(' On IT Boss! SUCCCESS ');
		let update = "UPDATE progressAccount SET activeStatus = 'active' WHERE username like '";
			update += actData.name + "%' AND useridentity like '" + actData.idnumber + "%' AND useremail like '";
			update += actData.email + "' AND activeStatus like 'deactive%'";

		console.log(update);

		pool.query(
			update, (err4, qres4) => {
				if (err4) {
				return res.status(400).send('No Data');
				} else {
				//Leave set here ....
				let queryGetID = "SELECT * FROM progressAccount WHERE username like '";
				queryGetID += actData.name + "%' AND useridentity like '" + actData.idnumber + "%' AND useremail like '";
				queryGetID += actData.email + "'";
				pool.query(
					queryGetID, (err5, qres5) => {
					if (err5) {
						console.log(queryGetID);
						throw err5;
					} else {
					let queryLoadleave = "UPDATE progressaccount SET sickleave = 20, annualleave = 12 WHERE useridentity like '"+ actData.idnumber;
					queryLoadleave += "%' AND useremail like '" + actData.email+ "%'";

					 console.log(queryLoadleave + ' Q 4 LEAVE_ ');
						pool.query(
							queryLoadleave, (err15, qres15) => {
							return res.status(200).send('Account activated');	
						});
					 /*
					queryGetID += actData.email + "'";
						return res.status(200).send('Account activated');
						//Leave Stuff was here ..*/
					}
				});
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
				
				console.log(queryGet+'\n');
				//console.log(qres4.rows[qres4.rowCount - 1].useremail + "   " + qres4.rows[qres4.rowCount - 1].userpassword);
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
		from: 'progresscontrolsystem@gmail.com',
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

router.get('/API/resendCode:ToDo', function(req, res) {
	
	if (req.params.ToDo)
	{
		let myData = JSON.parse(req.params.ToDo);	
		console.log('I TRIED');
		resendDATA(myData, req, res);
	} else {
		console.log('I NO  TRIED');
		return res.status(400).send('Verification code could not be sent');
	}

});

function resendDATA(Data, req, res)
{
	let randval = Math.floor((Math.random() * 9) + 1 + 600 + (Math.random() * 200) + 100 + (Math.random() * 300000)+100000);

	let mstr = '\n \n : \n- \n - Thank you for creating an account for PCS \n\n';
			mstr += ' Use this verification code to confirm your account ' + randval;

	let mailOptions = {
		from: 'progresscontrolsystem@gmail.com',
		to: Data.email,
		subject: 'Verification email from Progress Control System',
		text: mstr
	};
	
	transporter.sendMail(mailOptions, function(error, info){
		if (error) {
		console.log(error);
		return res.status(400).send('Email does not exist 1 ');
		} else {
		console.log('Email sent: ' + info.response + ' ***** \n');
		console.log( Data.telnumber + ' 000000 ');
		let mstr = '\n \n : \n- \n - Thank you for creating an account for PCS \n\n';
			mstr += ' Use this verification code to confirm your account ' + randval;

			nexmo.message.sendSms(
				'Nexmo', Data.telnumber, mstr,
					(err, responseData) => {
					if (err) {
						//console.log('FAILURE ');
						return res.status(400).send("Couldn't resend verification code");
					} else {
						console.log(' SMS SENT as well ');		
						accStatus = 1;	
						req.session.views = Data;	
						console.log('My verify is ' + randval);
						return res.status(200).send({msg: 'Verification code sent' , randv: randval});
					//console.dir(responseData);
					}
			});

		}
	}); 
}

module.exports = router;
