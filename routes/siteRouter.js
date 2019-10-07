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

router.use(session({ secret: '12thaergctvkfabsmjbygis', cookie: { maxAge: 600000 }}))

router.get('/API/addSite:ToDo', function(req, res) {

    if (req.params.ToDo)
    {
        let myData = JSON.parse(decodeURI(req.params.ToDo));

        let addSite = "INSERT INTO worksite(sitename, red, green, blue) VALUES ('";
            addSite += myData.sitename + "', '" + myData.red + "','" + myData.green + "','" + myData.blue+ "');";

        pool.query(
            addSite, (err5, qres5) => {
            if (err5)
            {
                return res.status(400).send("Could not get data from postloction");
            } else {
                return res.status(200).send("Successfully Added");
            }
        });

    } else {
        return res.status(400).send('Nothing sent through for adding site');
    }

});

router.get('/API/allSiteData', function(req, res) {

    let getAll = "SELECT * From worksite";
    pool.query(
        getAll, (err5, qres5) => {
            if (err5)
            {
                return res.status(400).send("Something wrong happened");
            } else {
                return res.status(200).send(qres5);
            }
            
        });    
});

module.exports = router;
