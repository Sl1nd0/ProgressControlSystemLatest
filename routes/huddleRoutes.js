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

router.use(session({ secret: '12teqwgdsfsersfgk', cookie: { maxAge: 60000 }}))

router.get('/API/CheckPosition:ToDo', function(req, res) {
    
    if (req.params.ToDo)
    {	

        let myData = JSON.parse(req.params.ToDo);

        let queryOne = "SELECT * FROM progressaccount WHERE useremail LIKE '";
            queryOne += myData.rows[0].email + "%' AND userpassword like '";
            queryOne += myData.password + "%'";

        console.log(queryOne);
        pool.query(
            queryOne, (err4, qres4) => {
                if (err4)
                {
                    return res.status(400).send('Error occurred');
                } else {
                    return res.status(200).send({Data2 : qres4.rows[0].workid});
                }
        });
        
    } else {
        return res.status(400).send('No data for validation');
    }
});

router.get('/API/updateHuddles:ToDo', function(req, res) {
    
    if (req.params.ToDo)
    {	
        let myData = JSON.parse(req.params.ToDo);
        let insertQ = '';

        if (myData.huddledate != undefined)
        {
            insertQ = "INSERT INTO huddleupdates(huddledate, accomplishyesterday, accomplishtoday, obstacles, needhelp, userid";
            insertQ += ", workid) VALUES ( ";
            insertQ += "'" + myData.huddledate + "', '" +  myData.yesterday + "', '" + myData.today + "', '" + myData.obstacles + "', '";
            insertQ +=   myData.help + "', '" + myData.id + "', '" + myData.workid +  "')";
        } else {
            insertQ = "INSERT INTO huddleupdates(huddledate, accomplishyesterday, accomplishtoday, obstacles, needhelp, userid";
            insertQ += ", workid) VALUES ( ";
            insertQ += "'Now()', '" +  myData.yesterday + "', '" + myData.today + "', '" + myData.obstacles + "', '";
            insertQ +=   myData.help + "', '" + myData.id + "', '" + myData.workid +  "')"; 
        }

        console.log(insertQ);
        pool.query(
            insertQ, (err4, qres4) => {
                if (err4)
                {
                    return res.status(400).send('Error occurred');
                } else {
                    return res.status(200).send({Code:'11',  msg:'Successfully updated huddles'});
                }
        });
        
    } else {
        return res.status(400).send('No data for inserting');
    }
});


router.get('/API/CheckAll:ToDo', function(req, res) {
    
    if (req.params.ToDo)
    {	

        let myData = JSON.parse(req.params.ToDo);

        let queryOne = "SELECT * FROM huddleupdates A ";
        queryOne += " INNER JOIN progressaccount B ON A.userid = B.userid ";
        queryOne += " where A.workid = '";
        queryOne += myData.workid + "' ORDER BY huddledate ASC; ";

        console.log('Query One ' + queryOne);
        pool.query(
            queryOne, (err4, qres4) => {
                if (err4)
                {
                    return res.status(400).send('Error occurred');
                } else {
                    return res.status(200).send({DataH: qres4});
                }
        });
        
    } else {
        return res.status(400).send('No data for Checking Database');
    }
});
router.get('/API/removeUpdate:ToDo', function(req, res) {
    
    if (req.params.ToDo)
    {	
        let rmData = JSON.parse(req.params.ToDo);

        let queryOne = "DELETE FROM huddleupdates  ";
        queryOne += " where huddleid = '";
        queryOne += rmData.huddleid + "' AND userid = '";
        queryOne += rmData.id + "';";

        console.log(queryOne);
        pool.query(
            queryOne, (err4, qres4) => {
                if (err4)
                {
                    return res.status(400).send('Error occurred, could not remove post');
                } else {
                    return res.status(200).send('huddle post successfully removed');
                }
        });
        
    } else {
        return res.status(400).send('No data sent for removing');
    }
});


module.exports = router;