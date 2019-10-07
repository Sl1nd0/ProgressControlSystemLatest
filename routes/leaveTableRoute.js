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

router.use(session({ secret: '12teqwgddfsshjb237tiurewfgk', cookie: { maxAge: 600000 }}))

router.get('/API/GetAllLeaveData', function(req, res) {

    let getLeaveData = "SELECT A.leaveid,  B.username, A.manageremail, B.usersurname, B.useremail, A.leavetype, A.startdate, A.enddate, A.leavestatus, ";
    getLeaveData += " (SELECT (DATE_PART('day',A.enddate::date) - DATE_PART('day', A.startdate::date))+1) as leavedays ";
    getLeaveData += " FROM employeeleave A ";
    getLeaveData += " Inner JOIN progressaccount B ON A.userid = B.userid ";

    console.log(getLeaveData);
    pool.query(
        getLeaveData, (err5, qres5) => {
        if (err5) 
        {   console.log("Got Data FOR LEAVE");
            return res.status(400).send('Something went wrong while leave data');
        } else {
        console.log("Got Data FOR LEAVE");
            return res.status(200).send(qres5);
        }
    });
});

/*
	let queryInsert = "INSERT INTO employeeleave(userid, managerid, manageremail, leavestatus, startdate, enddate, leavenote, leavetype) VALUES ('";
		queryInsert += employeeVal.rows[0].userid + "', '" + managerVal.rows[0].userid + "', '" + myData.manageremail + "', 'Pending Approval', '" +  myData.datestart;
		queryInsert +=  "', '" + myData.dateend +  "', '" + myData.leavemessage +  "', '" + myData.leavetype + "');";
		console.log(queryInsert);

		pool.query(
			queryInsert, (err5, qres5) => {
			console.log("Done UPDATING FOR LEAVE");
		});		
    */

module.exports = router;