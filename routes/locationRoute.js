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
var everything = '';
//NODE_TLS_REJECT_UNAUTHORIZED='0';
//router.use(cookieParser());
//app.use(express.session({ secret: 'something', store: store }));

router.use(session({ secret: '12thaergctvkfabsmjbygis', cookie: { maxAge: 600000 }}))

router.get('/API/postLocation:ToDo', function(req, res) {
    
    if (req.params.ToDo)
    {
        let myData = JSON.parse(req.params.ToDo);

        //1. check location...
        //2. post location ...
        //1. check location..
        /*   let data = {
            sitename: value,
            userid: myData.rows[0].userid
        }*/

        let queryCheck = "SELECT * FROM postlocation WHERE locationdate > to_timestamp(to_char(now(), 'YYYY-MM-DD 00:00:00'), 'YYYY-MM-DD H:M:S')";
            queryCheck += " AND locationstatus > 0 AND userid = ";
            queryCheck += myData.userid;

            pool.query(
				queryCheck, (err4, qres4) => {
                console.log(qres4);
                if (err4)
                {
                    return res.status(400).send("Something went wrong trying to check location");
                } else {

                    //Not at any location
                    if (qres4.rows.length == 0)
                    {
                        let locationPost = "INSERT INTO postlocation(sitename,";
                        locationPost += " locationmessage, locationstatus, userid, locationdate) VALUES ('";
                        locationPost += myData.sitename + "', 'AT " + myData.sitename + "', '1', '" + myData.userid + "', '";
                        locationPost += "NOW()');";
                      
                        pool.query(
                            locationPost, (err5, qres5) => {
                            if (err5)
                            {
                                return res.status(400).send('Something went wrong trying to post status');
                            } else {
                                return res.status(200).send('Succesfully done');
                            }
                        });

                    } else {
                        //At any location, message
                        res.status(200).send("User must leave present site before checking into current site or to different site ");
                    }
                    
                   // return res.status(200).send("User Already Checked IN");
                }
            });
    
    } else {
        return res.status(400).send('Nothing sent through for location table');
    }
    
});

router.get('/API/leaveLocation:ToDo', function(req, res) {
    
    if (req.params.ToDo)
    {
        var myData = JSON.parse(req.params.ToDo);

        //1. check if user is at site  today...
        //2. check if user is at other sites today...
        //3. Leave if user is at site today ...
        //4. Error message if at other sites..

        let queryCheck = "SELECT * FROM postlocation WHERE locationdate > to_timestamp(to_char(now(), 'YYYY-MM-DD 00:00:00'), 'YYYY-MM-DD H:M:S')";
            queryCheck += " AND locationstatus > 0 AND userid = ";
            queryCheck += myData.userid + " AND sitename = '";
            queryCheck += myData.sitename + "'";

            pool.query(
                queryCheck, (err5, qres5) => {
                if (qres5.rows.length == 0)
                {
                    return res.status(400).send("You can't leave " + myData.sitename + " because you're not at " + myData.sitename);
                } else {
                    let leaveQ = "UPDATE postlocation set locationstatus = 0 WHERE locationdate > to_timestamp(to_char(now(), 'YYYY-MM-DD 00:00:00'), 'YYYY-MM-DD H:M:S') ";
                         leaveQ += " AND locationstatus > 0 AND userid = ";
                         leaveQ += myData.userid + " AND sitename = '";
                         leaveQ += myData.sitename + "'";
                   
                    pool.query(
                        leaveQ, (err6, qres6) => {
                        if (err6)
                        {
                            return res.status(400).send("Could not change present status");  
                        } else {
                            let locationPost = "INSERT INTO postlocation(sitename,";
                            locationPost += " locationmessage, locationstatus, userid, locationdate) VALUES ('";
                            locationPost += myData.sitename + "', 'Left " + myData.sitename + "', '0', '" + myData.userid + "', '";
                            locationPost += "NOW()');";

                            pool.query(
                                locationPost, (err7, qres7) => {
                                if (err7)
                                {
                                    return res.status(400).send("Error, could not leave " +  + myData.sitename);
                                } else {
                                    return res.status(200).send("Left " + myData.sitename);
                                }

                            });
                        }
                    });
                }
            });

    } else {
        return res.status(400).send('Nothing sent through for leaving location table');
    }
    
});

router.get('/API/postDifferent:ToDo', function(req, res) {

    if (req.params.ToDo)
    {

        let myData = JSON.parse(decodeURI(req.params.ToDo));

        let locationPost = "INSERT INTO postlocation(sitename,";
        locationPost += " locationmessage, locationstatus, userid, locationdate) VALUES ('";
        locationPost += myData.sitename + "', '" + myData.message + "', '0', '" + myData.userid + "', '";
        locationPost += "NOW()');";

        pool.query(
            locationPost, (err7, qres7) => {
            if (err7)
            {
                return res.status(400).send("Couldn't insert other reason into location table");
            } else {
                return res.status(200).send("Message sent through");
            }
        });
    
    } else {
        return res.status(400).send("nothing sent through to table");
    }

});

router.get('/API/allData', function(req, res) {

    let getAll = "SELECT  (A.locationdate + '2 hour'::interval) as locationdate, B.username, B.usersurname, A.locationmessage FROM postlocation A Inner JOIN progressaccount B ON A.userid = B.userid ";
    getAll += " WHERE A.locationdate > to_timestamp(to_char(now(), 'YYYY-MM-DD 00:00:00'), 'YYYY-MM-DD H:M:S')";
    pool.query(
        getAll, (err5, qres5) => {
        if (err5)
        {
            return res.status(400).send("Could not get data from postloction");
        } else {
            everything = qres5;
            return res.status(200).send(qres5);
        }
    });
});

global.io.on('connection', function(socket){
    // console.log('a user connected');
     //socket.on('disconnect', function(){
     //  console.log('user disconnected');
     //});
     //Test messages by sending a message every 1 second.
     var i = 0;
     setInterval(function(){
 
        // let hardwareValues = checkHardware();
         //let window1Angle = checkW1Angle();
         global.io.emit('alldata', {
             'alldata': everything
         });
 
         i++;
     }, 1000);
 });

module.exports = router;
