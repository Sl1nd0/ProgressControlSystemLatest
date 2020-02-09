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
var mdata = '';
//NODE_TLS_REJECT_UNAUTHORIZED='0';
//router.use(cookieParser());
//app.use(express.session({ secret: 'something', store: store }));

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

router.get('/API/daysLeft:ToDo', function(req, res) {
    //console.log(req.params.ToDo + ' AZ my data');
    if (req.params.ToDo)
    {	
		let myData1 = JSON.parse(req.params.ToDo);
		
		let leaveQuery = "Select username, useremail, annualleave, sickleave From progressaccount WHERE UPPER(useremail) = '";
		leaveQuery += myData1.useremail.toUpperCase() + "' AND usernumber = '" + myData1.usernumber + "'";
		console.log(leaveQuery);

		pool.query(
            leaveQuery, (err4, qres4) => {
			if (err4)
			{
				//console.log('Leave Query ******** \n\nn' + leaveQuery + 'Leave Query ******** \n\nn');
				return res.status(400).send('Something went wrong');
			} else {
				return res.status(200).send(qres4);
			}	
		});

    } else {
        return res.status(400).send('Please re-enter the correct login credentials');
    }
});

function conv(params) {
    return params.split("&").map(function(item) {
        return item.split("=");
    }).reduce(function(obj, pair) {
        obj[pair[0]] = decodeURIComponent(pair[1]);
        return obj;
    }, {});
};

router.get('/leaveSession', function(req, res) {
	if (!req.session.leaveData)
	{
		return res.status(200).send({leave: '00'});
	} else {
		return res.status(200).send({leave: '01', Data: req.session.leaveData});
	}
});

router.get('/API/removeFromTable:ToDo', function(req, res) {
	
	if (req.params.ToDo)
	{
		var myData = JSON.parse(req.params.ToDo);

		let comaparisonData = "SELECT manageremail FROM employeeleave WHERE leaveid = " + myData.id;

		let queryRemoveLeave = "DELETE FROM employeeleave ";
			queryRemoveLeave += " WHERE leaveid = " + myData.id + " AND UPPER(manageremail) = '";
			queryRemoveLeave += myData.email.toUpperCase() + "'";
			console.log(queryRemoveLeave + " \n AS LEAVE");
			console.log(comaparisonData + ' \n number 2 leave');
			//if 
			pool.query(
				comaparisonData, (err5, qres5) => {
					if (err5)
					{
						return res.status(400).send('Something went wrong, leave could not be removed');
					} else {
					if (myData.email.trim() != qres5.rows[0].manageremail.trim()) {
						return res.status(400).send("Only the person's manager can delete");
						//console.log('Help ME');
					} else {
						pool.query(
							queryRemoveLeave, (err4, qres4) => {
								if (err4)
								{
									return res.status(400).send('Something went wrong, leave could not be removed');
								} else {
									return res.status(200).send('Leave details removed');
								}
						});
					}	
				}
			});
			
	} else {
		return res.status(400).send('Nothing sent through to route');
	}
});

router.get('/API/leaveApply:ToDo', function(req, res) {
	
	if (req.params.ToDo)
	{
		var Data1 = decodeURI(req.params.ToDo);

		let Data2 = JSON.parse(Data1);
		console.log(Data2.leavemessage + ' mmmsad44');

		var myData = Data2;
		req.session.leaveData = myData;

		//SET session

	/*	let requestdata = {
			employeename: $scope.name, //22
			lastname: $scope.lastname, //33
			email: $scope.email, //11
			usernumber: phone, //44
			managername: $scope.managername,   //1
			manageremail: $scope.manageremail, //2

			datestart: $scope.datestart,
			dateend: $scope.dateend,
			leavetype: $scope.leavetype,
			leavemessage: $scope.leavemessage
		}   */

		/*
		employeename: $scope.name, //22
		lastname: $scope.lastname, //33
		email: $scope.email, //11
		usernumber: $scope.usernumber, //44*/
		let employee = false;
		let manager = false;

		let validateEmployee = "SELECT userid, username, usersurname, useremail, usernumber FROM progressaccount WHERE username = '";
			validateEmployee += myData.employeename + "' AND usersurname = '" + myData.lastname + "' AND useremail = '" + myData.email; 
			validateEmployee += "' AND usernumber = '" + myData.usernumber + "';";
			console.log(validateEmployee);
			
			pool.query(
				validateEmployee, (err4, qres4) => {
				if (err4)
				{
					return res.status(400).send('Employee data not valid');
				} else {
					if (qres4.rowCount == 0)
					{
						console.log('An err emp')
						return res.status(400).send('Employee data not valid');
					} else {
						//employee = true;
						/*
						managername: $scope.managername,   //1
						manageremail: $scope.manageremail, //2
						*/

						let validateManager = "SELECT userid, username, usersurname, useremail, usernumber FROM progressaccount WHERE UPPER(username) = '";
						validateManager += myData.managername.toUpperCase() +  "' AND UPPER(useremail) = '" + myData.manageremail.toUpperCase(); 

						validateManager += "';";
						console.log(validateManager);

						pool.query(
							validateManager, (err5, qres5) => {
							if (err5)
							{
								return res.status(400).send('Manager data not valid');
							} else {
								let myEmail = "";
								//link="http://"+req.get('host')+"/#!/approve" + JSON.stringify(myData);
								link="http://"+req.get('host')+"/leaveData" + encodeURI(JSON.stringify(myData));
								
								sendEmail(myData, link, qres4, qres5);
								//updateEmployeeLeave(myData, qres4);

								/*if (result == 1) {
									console.log('Success');

								}*/
								//return res.status(200).send(qres5);
							}
						});
					}
					//return res.status(200).send(qres4);
				}	
			});

			return res.status(200).send('Email sent to manager');

	} else {
		return res.status(400).send('Something went wrong in applying for leave, please try again');
	}
})

function sendEmail(Data, link, employeeVal, managerVal)
{
	var emailTest = 0;
	let mailOptions = {
		from: Data.email,
		to: Data.manageremail,
		subject: 'Leave request from ' + Data.employeename,
		html : "Hello " + Data.managername + ", <br>Please Click on the link to approve or reject leave for " + Data.employeename + " <br><a href="+link+">Click here to navigate to leave page </a>"
	};
	
	transporter.sendMail(mailOptions, function(error, info){
		let Data2 = '';
		if (error) {
		console.log(error);
		return res.status(400).send('Something went wrong when sending an email to your manager');
		} else {
		//emailTest = 1; 
		Data2 = Data;
		Data = undefined;
		updateEmployeeLeave(Data2, employeeVal, managerVal);

		console.log('Email sent: ' + info.response);
		return;
		}
	}); 
}

function updateEmployeeLeave(myData, employeeVal, managerVal)
{

	let queryInsert = "INSERT INTO employeeleave(userid, managerid, manageremail, leavestatus, startdate, enddate, leavenote, leavetype) VALUES ('";
		queryInsert += employeeVal.rows[0].userid + "', '" + managerVal.rows[0].userid + "', '" + myData.manageremail + "', 'Pending Approval', '" +  myData.datestart;
		queryInsert +=  "', '" + myData.dateend +  "', '" + myData.leavemessage +  "', '" + myData.leavetype + "');";
		console.log(queryInsert);

		pool.query(
			queryInsert, (err5, qres5) => {
			
			if (err5) {
			console.log("Leave Error \n\n" + queryInsert);
			} else {
			console.log("Done UPDATING FOR LEAVE");
			}
		});		
	return;
}

module.exports = router;