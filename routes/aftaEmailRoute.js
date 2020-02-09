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

var Nexmo = require('nexmo');
const nexmo = new Nexmo({
	apiKey: 'd22c162a',
	apiSecret: 'Ev5RQke8YMLdosu6',
}); 

router.use(session({ secret: '12teqwgds687t97fsersfgk', cookie: { maxAge: 600000 }}))

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

router.get('/leaveData:ToDo', function(req, res) {
    if (req.params.ToDo)
    {
        myData = JSON.parse(decodeURI(req.params.ToDo));
        req.session.leavedata = myData;
        console.log('APproved d leAVE MAN! FOR ' + myData.leavemessage);
    } else {
        console.log('NOTHING MAN!!!');
    }
     res.redirect('/#!/approve'); //II'm redirectiong to the page I want :-D --- SOLUTION OF GOD
});

router.get('/API/getRequest', function(req, res) {

    console.log('Approved for the general !');
    return res.status(200).send({Data: myData});  
});

router.get('/API/approveLeave:ToDo', function(req, res) {
    if (req.params.ToDo)
    {
        /*let requestdata = {
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
        } */
        var updateData = JSON.parse(decodeURI(req.params.ToDo));

        console.log('TEST 4 name ' + updateData.employeename);
        //Approve leave ....
        let leaveGetID = "SELECT userid, sickleave, annualleave FROM progressaccount WHERE useremail = '" + updateData.email + "' AND usernumber = '";
            leaveGetID += updateData.usernumber + "';";
        pool.query(
            leaveGetID, (err4, qres4) => {
            if (err4) {
                return res.status(400).send("Something went wrong, couldn't decline leave");
            } else {

               let leaveSetApproved = "UPDATE employeeleave SET leavestatus = 'Approved' WHERE userid = ";
                leaveSetApproved += qres4.rows[0].userid + " AND startdate = '" + updateData.datestart + "' AND enddate = '";
                leaveSetApproved +=  updateData.dateend + "' AND leavetype = '";
                leaveSetApproved += updateData.leavetype + "';";
                console.log(leaveSetApproved + ' AS APPROVE query ');

                pool.query(
                    leaveSetApproved, (err5, qres5) => {
                    if (err4) {
                        return res.status(400).send("Something went wrong, couldn't decline leave");
                    } else {
                        //Subtract day ....
                                let sickleave = qres4.rows[0].sickleave;
                                let annualleave = qres4.rows[0].annualleave;
                                let days= "SELECT (DATE_PART('day','" + updateData.dateend + "'::date) - DATE_PART('day','" + updateData.datestart + "'::date))+1 as mydays";
                                    days+= " From progressaccount ";
                                    days += " WHERE useremail = '" + updateData.email + "' AND usernumber = '";
                                    days += updateData.usernumber + "';";
                                console.log(days+ ' \nas days query');
                                pool.query(
                                    days, (errd, resd) => {
                                if (errd) {
                                    console.log(errd);
                                    return res.status(400).send("Couldn't get days");
                                } else {
                                    console.log(resd.rows[0].mydays + " AZ Day");
                                if (updateData.leavetype == 'Annual')
                                {
                                    annualleave = annualleave - resd.rows[0].mydays;
                                    
                                    var daySubtract = "UPDATE progressaccount SET annualleave = " + annualleave;
                                        daySubtract += " WHERE useremail = '" + updateData.email + "' AND usernumber = '";
                                        daySubtract += updateData.usernumber + "';";
                                        console.log(daySubtract);
                                    pool.query(
                                        daySubtract, (err6, qres6) => {
                                        if (err6)
                                        {
                                            console.log('Subtracting annual problem');
                                            console.log(err6);
                                            return res.status(400).send("Couldn't subtract annual leave");
                                        } else {
                                            sendData(updateData, 'approved', req, res);
                                            //return res.status(200).send("Leave Approved for " + updateData.employeename);
                                        }
                                    });
                                } else if (updateData.leavetype == 'Sick')
                                {
                                    sickleave = sickleave - resd.rows[0].mydays;

                                      let daySubtract = "UPDATE progressaccount SET sickleave = " + sickleave;
                                        daySubtract += " WHERE useremail = '" + updateData.email + "' AND usernumber = '";
                                        daySubtract += updateData.usernumber + "';";
                                    console.log(daySubtract);
                                    pool.query(
                                        daySubtract, (err6, qres6) => {
                                        if (err6)
                                        {
                                            console.log('Subtracting annual problem');
                                            console.log(err6);
                                            return res.status(400).send("Couldn't subtract sick leave");
                                        } else {
                                            sendData(updateData, 'approved', req, res);
                                            //return res.status(200).send("Leave Approved for " + updateData.employeename);
                                        }    
                                    });
                                }
                                }
                            });
                        }
                }); 
            }
        }); 
        
    } else {
        //IF nothing?
        //console.log('NOTHING MAN!!!');
        return res.status(400).send("No data found to approve leave");
    }
});

router.get('/API/rejectLeave:ToDo', function(req, res) {
    if (req.params.ToDo)
    {
       
        var updateData2 = JSON.parse(decodeURI(req.params.ToDo));

        console.log('TEST DECLINE 4 name ' + updateData2.employeename);
        //Approve leave ....
        let leaveGetID = "SELECT userid FROM progressaccount WHERE useremail = '" + updateData2.email + "' AND usernumber = '";
            leaveGetID += updateData2.usernumber + "';";
        pool.query(
            leaveGetID, (err4, qres4) => {
            if (err4) {
                return res.status(400).send("Something went wrong, couldn't approve leave");
            } else {

                let leaveSetDeclined= "UPDATE employeeleave SET leavestatus = 'Declined' WHERE userid = ";
                leaveSetDeclined += qres4.rows[0].userid + " AND startdate >= '" + updateData2.datestart + "' AND enddate <= '";
                leaveSetDeclined +=  updateData2.dateend + "' AND leavetype = '";
                leaveSetDeclined += updateData2.leavetype + "';";

                console.log(leaveSetDeclined + ' AS DECLINE query ');

                pool.query(
                    leaveSetDeclined, (err5, qres5) => {
                    if (err4) {
                        return res.status(400).send("Something went wrong, couldn't decline leave");
                    } else {
                        sendData(updateData2, 'declined', req, res);
                        //return res.status(200).send("Leave Declined for " + updateData2.employeename);
                    }
                }); 
            }
        }); 
    } else {
        return res.status(400).send("No data found to decline leave");
    }
});


function sendData(Data, status, req, res)
{
    let mstr =  "Hello " + Data.employeename + ",\n\nPlease be advised that your leave has been ";
    mstr += status + " by " +  Data.managername;
    
	let mailOptions = {
		from: 'progresscontrolsystem@gmail.com',
		to: Data.email,
		subject: 'Leave approved by ' + Data.managername,
		text: mstr
	};
	
	transporter.sendMail(mailOptions, function(error, info){
		if (error) {
		console.log(error);
		return res.status(400).send('Email does not exist ');
		} else {
		console.log('Email sent: ' + info.response);
           
        let mstr2 = "\n\n\n\n--- Hello " + Data.employeename + ", \nPlease be advised that your leave has been ";
            mstr2 += status + " by " +  Data.managername;;
            
            nexmo.message.sendSms(
                'Nexmo', Data.usernumber, mstr2,
                    (err, responseData) => {
                    if (err) {
                        return res.status(400).send("Couldn't resend verification code");
                    } else {
                        console.log(' SMS SENT as well ');		
                        //accStatus = 1;	
                        //req.session.views = Data;	
                        //console.log('My verify is ' + randval);
                        //return res.status(200).send({msg: 'Account confirmed successfully' , randv: randval});
                        return res.status(200).send("Leave Approved for " + Data.employeename);  
                    }
            });

		}
	}); 
}

module.exports = router;
